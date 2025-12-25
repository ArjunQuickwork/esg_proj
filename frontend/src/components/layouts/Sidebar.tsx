import { fetchCompanies } from "../../app/api/companies";
import {SidebarLink} from "./SidebarLink";

export async function Sidebar() {
    const companies = await fetchCompanies();

    return (
        <aside className="w-64 bg-white p-4">
            <h1 className="mb-6 text-xl font-semibold">ESG Dashboard</h1>

            <nav className="space-y-1">
                {companies.map((company) => (
                    <SidebarLink
                        key={company.slug}
                        label={company.name}
                        href={`/${company.slug}`}
                    >
                        {company.name}
                    </SidebarLink>
                ))}
            </nav>
        </aside>
    );
}
