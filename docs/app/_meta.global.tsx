import { MetaRecord } from "nextra";

const API_PUBLIC_DOCS = {
    index: "Overview",
    //fetch_companies: "Fetch companies",
    //fetch_company_data: "Fetch company data",
    fetch_industries: "Fetch industries",
    //fetch_companies_by_industry: "Fetch companies by industry",
    //fetch_questions: "Fetch questions",
};

const API_DOCS = {
    index: "API Overview",
    public: {
        title: "Public API",
        type: "page",
        items: API_PUBLIC_DOCS,
    },
};

const meta = {
    index: {
        type: "page",
        theme: {
            layout: "full",
            toc: false,
            timestamp: false,
        },
    },

    api: {
        title: "API Reference",
        items: API_DOCS,
        type: "page",
    },
};

export default meta;
