import { fetchCompanies } from "../../app/api/findCompanies";
import {SidebarLink} from "./SidebarLink";

export async function Sidebar() {
    // const companies = await fetchCompanies();
    const companies = [{id: "apple", name: "Apple"}, {id: "banana", name: "Banana"}];

    return (
        <aside className="w-64 bg-white p-4">
            <h1 className="mb-6 text-xl font-semibold">ESG Dashboard</h1>

            <nav className="space-y-1">
                {companies.map((company) => (
                    <SidebarLink
                        label={company.id}
                        href={`/${company.id}`}
                        key={company.id}
                    >
                        {company.name}
                    </SidebarLink>
                ))}
            </nav>
        </aside>
    );
}
