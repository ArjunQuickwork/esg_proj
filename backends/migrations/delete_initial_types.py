# Delete industries and questions
from backends.constants.mongo_client import industries_collection, questions_collection

industries_collection.delete_many({})
questions_collection.delete_many({})