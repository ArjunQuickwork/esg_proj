"use client"

import {GovernmentSocialMetric} from "../../lib/types";
import {GovernmentalSocialTable} from "./TwoRowTable";

export function TableGrid({ metrics }: { metrics: GovernmentSocialMetric[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
                    <GovernmentalSocialTable key={metric.key} metric={metric} />
))}
    </div>
);
}
