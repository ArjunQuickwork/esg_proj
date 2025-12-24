import { EsgSections } from "../../components/reportSections";
import type { CompanyESG } from "../../lib/types";

// mock for now — replace with fetch
const data: CompanyESG = {
    companySlug: "apple",
    companyName: "Apple",
    environmental: [],
    social: [],
    governance: [],
};

type CompanyPageProps = {
    params: {
        'company-slug': string;
    }
}

export default function CompanyPage({params}: CompanyPageProps) {

    // Fetch the details belonging to the company
    const company_data: CompanyESG = fetch(`/api/fetchDataByCompany/${params['company-slug']}`)

    return (
        <div className="p-6">
            <EsgSections data={company_data} />
        </div>
    );
}
