import type { CompanyESG } from "@/lib/types";
import { MetricGrid } from "./charts/GraphGrid";
import {TableGrid} from "./tables/TableGrid";

export function EsgSections({ data }: { data: CompanyESG }) {
    return (
        <div className="space-y-8">
        <section>
            <h2 className="mb-3 text-lg font-semibold">Environmental</h2>
            <MetricGrid metrics={data.environmental} />
        </section>

        <section>
        <h2 className="mb-3 text-lg font-semibold">Social</h2>
            <TableGrid metrics={data.social} />
        </section>

        <section>
        <h2 className="mb-3 text-lg font-semibold">Governance</h2>
            <TableGrid metrics={data.governance} />
        </section>
    </div>
);
}
