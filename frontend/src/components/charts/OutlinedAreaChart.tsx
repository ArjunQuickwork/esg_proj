"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import type { SeriesPoint } from "../../lib/types";

type Props = {
    data: SeriesPoint[];
    unit?: string;
    title?: string;
};

export function AreaChartSemiFilled({ data, unit, title }: Props) {
    return (
        <div className="h-72 w-full rounded-xl bg-white p-4 shadow-sm">
            {title && (
                <header className="mb-2">
                    <h3 className="font-medium">{title}</h3>
                    {unit && <p className="text-xs text-slate-500">{unit}</p>}
                </header>
            )}

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 24, left: 0, bottom: 10 }}>
                    {/* Gradient */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopOpacity={0.25} />
                            <stop offset="100%" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    {/* X Axis (year-based now) */}
                    <XAxis
                        dataKey="year"
                        tick={{ fontSize: 12, fill: "#71717a" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    {/* Y Axis */}
                    <YAxis
                        tick={{ fontSize: 12, fill: "#a1a1aa" }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                    />

                    {/* Tooltip */}
                    <Tooltip
                        cursor={{ strokeWidth: 1 }}
                        content={({ active, payload, label }) => {
                            if (!active || !payload?.length) return null;

                            return (
                                <div className="rounded-md border bg-white px-3 py-2 shadow text-sm">
                                    <div className="font-medium">{label}</div>
                                    <div className="text-zinc-500">
                                        {payload[0].value}
                                        {unit ? ` ${unit}` : ""}
                                    </div>
                                </div>
                            );
                        }}
                    />

                    {/* Area */}
                    <Area
                        type="monotone"
                        dataKey="value"
                        strokeWidth={2}
                        fill="url(#areaGradient)"
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
