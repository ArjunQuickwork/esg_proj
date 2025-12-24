"use client";

import {GovernmentSocialMetric} from "../../lib/types";

export function GovernmentalSocialTable({metric}: {
    metric: GovernmentSocialMetric
}) {
    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Metric
    </h3>
    <p className="text-xs text-zinc-500">
        Performance
    </p>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
    <table className="w-full border-collapse">
    <thead>
        <tr className="text-xs uppercase tracking-wide text-zinc-500">
    <th className="px-4 py-3 text-left font-medium">Date</th>
        <th className="px-4 py-3 text-right font-medium">Value</th>
        </tr>
        </thead>

        <tbody>
        {metric.values.map((row, _) => (
                <tr
                    key={row.year}
            className="group border-t border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
            >
            <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
                {new Date(row.year).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                </td>

                <td className="px-4 py-3 text-right text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                {row.statement}
                </td>
                </tr>
))}
    </tbody>
    </table>
    </div>
    </div>
);
}
