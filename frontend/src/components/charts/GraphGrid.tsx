"use client";

import { MetricCard } from "./MultiLineGraph";
import type { EnvironmentalMetrics } from "../../lib/types";
import {sortSeriesByYear} from "@/lib/utils";

type Props = {
    metrics: EnvironmentalMetrics;
};

export function MetricGrid({ metrics }: Props) {
    console.log(metrics);
    if (!metrics || Object.keys(metrics).length === 0) {
        return (
            <div className="text-sm text-slate-500">
                No environmental metrics available
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(metrics).map(([name, metric]) => (
                <MetricCard
                    key={name}
                    name={name}
                    current={sortSeriesByYear(metric.current.data)}
                    unit={metric.unit}
                    future={metric.future.data}
                />
            ))}
        </div>
    );
}
