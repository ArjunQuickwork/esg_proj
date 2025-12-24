#!/usr/bin/env python3
"""
Convert a PDF into an LLM-ready context using Docling.

What it outputs:
  out/
    - llm_context.txt   (the final thing you paste into ChatGPT)
    - cleaned.md        (cleaned markdown for readability)
    - chunks.txt        (optional chunked context for large PDFs)
    - chunks.json

Usage:
  python pdf_to_llm_context.py input.pdf --outdir out --max-chars 12000
"""

import argparse
import json
import os
import re
from typing import List

from docling.document_converter import DocumentConverter


# ---------------------------
# Cleaning / chunking helpers
# ---------------------------

def basic_clean(md: str) -> str:
    """Light cleanup for common PDF->MD artifacts."""
    md = md.replace("\r\n", "\n").replace("\r", "\n")

    # Remove standalone page numbers like "12" or "- 12 -"
    md = re.sub(r"(?m)^\s*-?\s*\d+\s*-?\s*$", "", md)

    # Remove "Page X of Y" style footer/header
    md = re.sub(r"(?mi)^\s*page\s*\d+(\s*of\s*\d+)?\s*$", "", md)

    # Collapse very large gaps
    md = re.sub(r"\n{3,}", "\n\n", md)

    # Trim trailing whitespaces
    md = "\n".join(line.rstrip() for line in md.splitlines())
    return md.strip()


def split_into_chunks(text: str, max_chars: int) -> List[str]:
    """
    Split into chunks under max_chars, respecting headings/paragraphs when possible.
    """
    # Split on top-level headings
    blocks = re.split(r"\n(?=# )", text)
    chunks = []
    cur = ""

    def flush():
        nonlocal cur
        if cur.strip():
            chunks.append(cur.strip())
        cur = ""

    for block in blocks:
        block = block.strip()
        if not block:
            continue

        if len(block) > max_chars:
            # sub-split by paragraph
            paras = block.split("\n\n")
            for p in paras:
                p = p.strip()
                if not p:
                    continue
                if len(cur) + len(p) + 2 <= max_chars:
                    cur = (cur + "\n\n" + p).strip()
                else:
                    flush()
                    cur = p
            continue

        if len(cur) + len(block) + 2 <= max_chars:
            cur = (cur + "\n\n" + block).strip()
        else:
            flush()
            cur = block

    flush()
    return chunks


# ---------------------------
# Docling extraction helpers
# ---------------------------

def extract_tables_markdown(doc) -> str:
    """
    Extract detected tables as markdown blocks.
    Docling tables support export_to_markdown() in examples. :contentReference[oaicite:1]{index=1}
    """
    tables = getattr(doc, "tables", [])
    if not tables:
        return ""

    out = []
    for i, t in enumerate(tables, start=1):
        if hasattr(t, "export_to_markdown"):
            md = t.export_to_markdown()
        else:
            # fallback: try to stringify
            md = str(t)
        out.append(f"### Table {i}\n{md}")
    return "\n\n".join(out).strip()


def extract_metadata(doc) -> str:
    """
    Pull doc-level metadata if available.
    """
    meta = getattr(doc, "metadata", None)
    if not meta:
        return ""
    try:
        # metadata is typically pydantic-ish; stringify safely
        return json.dumps(meta.model_dump(), indent=2, ensure_ascii=False)
    except Exception:
        return str(meta)


def build_llm_context(cleaned_md: str, tables_md: str, metadata_str: str) -> str:
    """
    Create one big context payload for LLMs.
    """
    parts = []

    if metadata_str:
        parts.append(
            "## METADATA (extracted by Docling)\n"
            "```json\n" + metadata_str + "\n```"
        )

    parts.append(
        "## MAIN DOCUMENT TEXT (cleaned markdown)\n"
        "<<<\n" + cleaned_md + "\n>>>"
    )

    if tables_md:
        parts.append(
            "## EXTRACTED TABLES (markdown)\n"
            "<<<\n" + tables_md + "\n>>>"
        )

    return "\n\n".join(parts).strip()


# ---------------------------
# Main pipeline
# ---------------------------

def pdf_to_context(pdf_path: str, outdir: str, max_chars: int):
    os.makedirs(outdir, exist_ok=True)

    converter = DocumentConverter()
    result = converter.convert(pdf_path)
    doc = result.document  # DoclingDocument :contentReference[oaicite:2]{index=2}

    # Export markdown from Docling
    raw_md = doc.export_to_markdown()
    cleaned_md = basic_clean(raw_md)

    # Extract tables separately (LLMs love explicit tables)
    tables_md = extract_tables_markdown(doc)

    # Metadata, if present
    metadata_str = extract_metadata(doc)

    # Build final context
    llm_context = build_llm_context(cleaned_md, tables_md, metadata_str)

    # Write outputs
    cleaned_md_path = os.path.join(outdir, "cleaned.md")
    with open(cleaned_md_path, "w", encoding="utf-8") as f:
        f.write(cleaned_md)

    llm_context_path = os.path.join(outdir, "llm_context.txt")
    with open(llm_context_path, "w", encoding="utf-8") as f:
        f.write(llm_context)

    # Chunk if large
    chunks = split_into_chunks(llm_context, max_chars=max_chars)

    chunks_txt_path = os.path.join(outdir, "chunks.txt")
    with open(chunks_txt_path, "w", encoding="utf-8") as f:
        for i, c in enumerate(chunks, start=1):
            f.write(f"\n\n===== CHUNK {i}/{len(chunks)} (chars={len(c)}) =====\n\n")
            f.write(c)
            f.write("\n")

    chunks_json_path = os.path.join(outdir, "chunks.json")
    payload = [{"chunk_id": i+1, "text": c, "char_len": len(c)} for i, c in enumerate(chunks)]
    with open(chunks_json_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    print("Done. Outputs:")
    print(" -", llm_context_path, "(paste this into ChatGPT with your prompt)")
    print(" -", cleaned_md_path)
    print(" -", chunks_txt_path)
    print(" -", chunks_json_path)
    print("Total chunks:", len(chunks))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf", help="Path to input PDF")
    ap.add_argument("--outdir", default="out", help="Output directory")
    ap.add_argument("--max-chars", type=int, default=12000,
                    help="Max chars per chunk for LLM pasting")
    args = ap.parse_args()

    pdf_to_context(args.pdf, args.outdir, args.max_chars)


if __name__ == "__main__":
    main()

