from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(verbose=True)

client = MongoClient(os.getenv("MONGODB_INSTANCE_URL"))
database = client[os.getenv("MONGODB_DATABASE")]
data_collection = database[os.getenv("MONGODB_COLLECTION_NAME")]
industries_collection = database[os.getenv("MONGODB_TYPE_COLLECTION_NAME")]
questions_collection = database[os.getenv("MONGODB_QUESTION_COLLECTION_NAME")]