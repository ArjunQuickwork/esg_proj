import json
from backends.constants.mongo_client import questions_collection, industries_collection

def main() -> None:
    with open("./consistent_question_types.json", 'r') as f:
        questions = json.load(f)
    with open("./company_initial_types.json", 'r') as f:
        industries = json.load(f)

    questions_collection.insert_one(questions)
    industries_collection.insert_one(industries)


if __name__ == "__main__":
    main()