"use client"

import { MetricCard } from "./MultiLineGraph";
import type { EnvironmentMetric } from "../../lib/types";

export function MetricGrid({ metrics }: { metrics: EnvironmentMetric[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
                    <MetricCard key={metric.key} metric={metric} />
))}
    </div>
);
}
