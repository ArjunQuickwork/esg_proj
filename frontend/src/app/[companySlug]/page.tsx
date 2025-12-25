import { EsgSections } from "../../components/reportSections";
import type { CompanyESG } from "../../lib/types";
import {fetchData} from "@/app/api/fetchData";

type CompanyPageProps = {
    params: {
        companySlug: string;
    }
}

export default async function CompanyPage({params}: CompanyPageProps) {
    const {companySlug} = await params;

    // Fetch the details belonging to the company
    const company_data: CompanyESG = await fetchData(companySlug);

    return (
        <div className="p-6">
            <EsgSections data={company_data} />
        </div>
    );
}
