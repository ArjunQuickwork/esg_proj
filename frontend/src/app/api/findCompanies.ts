
type Company = {
    company_name: string;
    company_slug: string
}

export async function fetchCompanies(): Promise<Company[]> {
    const res = await fetch(`http://localhost:80/api/companies`, {
        cache: "no-store", // always fresh sidebar
    });

    if (!res.ok) {
        throw new Error("Failed to fetch companies");
    }

    return res.json();
}
