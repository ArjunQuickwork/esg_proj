"use client";

import type { GovernmentSocialMetrics } from "../../lib/types";
import { GovernmentalSocialTable } from "./TwoRowTable";
type Props = {
    metrics: GovernmentSocialMetrics;
};

export function TableGrid({ metrics }: Props) {
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
            {Object.entries(metrics).map(([criterion, values]) => (
                <GovernmentalSocialTable
                    key={criterion}
                    criterion={criterion}
                    values={values}
                />
            ))}
        </div>
    );
}

