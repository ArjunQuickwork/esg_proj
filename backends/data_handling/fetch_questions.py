from backends.constants.mongo_client import questions_collection, industries_collection


def fetch_questions():
    questions = questions_collection.find({}, {"_id": 0})[0]
    industries = industries_collection.find({}, {"_id": 0})[0]
    environmental = questions['environmental']
    social = questions['social']
    governance = questions['governance']

    questions_list_per_industry = []

    environmental_quantitative = environmental['quantitative']
    environmental_qualitative = environmental['qualitative']

    main_str = "THESE QUESTIONS MUST BE ANSWERED FOR ALL INDUSTRIES.\nEnvironmental Quantitative:\n"

    for i, question in enumerate(environmental_quantitative, start=1):
        main_str += f"{i}. {question}\n"

    main_str += "\nEnvironmental Qualitative\n"

    for i, question in enumerate(environmental_qualitative, start=1):
        main_str += f"{i}. {question}\n"

    main_str += "\nSocial Questions:\n"

    for i, question in enumerate(social, start=1):
        main_str += f"{i}. {question}\n"

    main_str += "\nGovernance Questions:\n"

    for i, question in enumerate(governance, start=1):
        main_str += f"{i}. {question}\n"

    questions_list_per_industry.append(main_str)

    for industry in questions.keys():
        if industry not in ["environmental", "social", "governance"]:
            question_data = questions[industry]
            industry_map = industries[industry]
            qualitative_questions = question_data['qualitative']
            quantitative_questions = question_data['quantitative']

            industry_string = f"For industry {industry_map}, the following Environmental questions must be answered in addition to the general ones above:\nQuantitative questions:\n"

            for i, question in enumerate(quantitative_questions, start=1):
                industry_string += f"{i}. {question}\n"

            industry_string += "\nQualitative questions:\n"

            for i, question in enumerate(qualitative_questions, start=1):
                industry_string += f"{i}. {question}\n"

            questions_list_per_industry.append(industry_string)

    final_questions = "\n".join(questions_list_per_industry)
    print(final_questions)

    return final_questions
