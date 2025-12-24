"use client";

import { useState } from "react";

export default function UploadPdf() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:80/api/companies/addData", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            const data = await res.json();
            setMessage(`Uploaded: ${data.filename}`);
        } catch (err) {
            setMessage("Failed to upload file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Upload PDF
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Select a PDF file to upload to the server
                </p>

                {/* Upload box */}
                <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-slate-400">
                    <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <svg
                        className="h-10 w-10 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16v-8m0 0-3 3m3-3 3 3m5 5H4"
                        />
                    </svg>

                    <span className="mt-2 text-sm font-medium text-slate-600">
            Click to upload PDF
          </span>

                    {file && (
                        <span className="mt-1 text-xs text-slate-500">
              {file.name}
            </span>
                    )}
                </label>

                {/* Button */}
                <button
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Upload File"}
                </button>

                {/* Status */}
                {message && (
                    <p className="mt-4 text-center text-sm text-slate-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
