"use client"

import type { TooltipProps } from "recharts";

type SeriesPoint = {
    year: number;
    value: number;
};

type RuntimeTooltipPayload = {
    name?: string;
    value?: number;
    payload?: unknown;
};

type MetricTooltipProps = TooltipProps<number, string> & {
    payload?: RuntimeTooltipPayload[];
};

function isSeriesPoint(p: unknown): p is SeriesPoint {
    return (
        typeof p === "object" &&
        p !== null &&
        "year" in p &&
        "value" in p
    );
}

export function MetricTooltip({
                                  active,
                                  payload,
                              }: MetricTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;

    const rawPoint = payload[0]?.payload;
    const year = isSeriesPoint(rawPoint) ? rawPoint.year : undefined;

    const priority = (name: string) => {
        if (name.startsWith("Actuals")) return 0;
        if (name.startsWith("Current")) return 1;
        return 2;
    };

    const sorted = [...payload].sort(
        (a, b) => priority(a.name ?? "") - priority(b.name ?? "")
    );

    return (
        <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
            {year !== undefined && (
                <p className="mb-1 text-xs font-medium text-slate-600">
                    Year {year}
                </p>
            )}

            <div className="space-y-1">
                {sorted.map((entry, idx) => {
                    const name = entry.name ?? "";
                    const value = entry.value;

                    let tone = "text-slate-800";
                    if (name.startsWith("Actuals")) tone = "text-slate-900";
                    if (name.startsWith("Current")) tone = "text-blue-600";
                    if (name.startsWith("Superseded")) tone = "text-slate-400";

                    return (
                        <div
                            key={idx}
                            className={`flex items-center justify-between gap-4 text-xs ${tone}`}
                        >
                            <span className="truncate">{name}</span>
                            <span className="font-medium">{value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
