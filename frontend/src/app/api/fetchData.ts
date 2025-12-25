import {CompanyESG} from "@/lib/types";

export async function fetchData(company_slug: string): Promise<CompanyESG> {
    const response = await fetch(`http://localhost:80/api/fetchCompany?company_slug=${company_slug}`, {});
    return (await response.json())[0] as CompanyESG;
}