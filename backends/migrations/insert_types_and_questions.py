import json
from backends.constants.mongo_client import questions_collection, industries_collection

def main() -> None:
    questions = json.loads("./migrations/consistent_question_types.json")
    industries = json.loads("./migrations/company_initial_types.json")

    questions_collection.insert_one(questions)
    industries_collection.insert_one(industries)


if __name__ == "__main__":
    main()