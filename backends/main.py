import shutil
from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from backends.constants.mongo_client import data_collection, industries_collection, questions_collection
import json
from backends.data_handling.insert_schema_into_mongo import insert_json_into_mongo
from backends.data_handling.json_schema_gpt import extract_data
from backends.data_handling.pdf_to_llm_context import pdf_to_context


# Instantiate an instance of the FastAPI client
web_server = FastAPI()
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
import sys, os
print("CWD:", os.getcwd())
print("sys.path:", sys.path)

@web_server.get("/api/fetchIndustries")
async def fetchIndustries():
    # Fetch the industries and slugs and send them over
    result = industries_collection.find({}, {"_id": 0})
    json_dump = list(result)
    return json_dump

@web_server.get("/api/fetchCompaniesByIndustry")
async def fetchCompaniesByIndustry(industry: str):
    result = data_collection.find({"industry": industry}, {"_id": 0, "industry": 1})
    json_dump = list(result)
    return json_dump

@web_server.get("/api/fetchQuestions")
async def fetchQuestions(industry: str):
    result_all = questions_collection.find({"industry": "main"}, {"_id": 0})
    result_industry_specific = questions_collection.find({"industry": industry}, {"_id": 0})
    json_dump_main = list(result_all)
    json_dump_industry_specific = list(result_industry_specific)
    return json_dump_main + json_dump_industry_specific


@web_server.get("/api/companies")
async def companies():
    # Fetch company names and slugs and send them over
    result = data_collection.find({}, {"_id": 0, "name": 1, "slug": 1})
    json_dump = list(result)
    return json_dump

@web_server.get("/api/fetchCompany")
async def fetchCompany(company_slug: str):
    # Fetch data belonging to a particular company and send
    result = data_collection.find({"slug": company_slug}, {"_id": 0})
    json_dump = list(result)
    return json_dump


@web_server.post("/api/companies/addData")
async def add_data(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # The file has been saved to a directory. Now, start the pipeline
    try:
        pdf_to_context(file_path, "./out", 12000)
        data = extract_data("./out/llm_context.txt")
        dict_json = json.loads(data.json())
        print(type(dict_json))
        insert_json_into_mongo(dict_json)
    except Exception as e:
        print(e)
        return {
            "error": str(e)
        }
    return {
        "insertion": "Successful"
    }
