"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {EnvironmentMetric} from "../../lib/types";

export function AreaChartSemiFilled({data}: EnvironmentMetric) {
    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 24, left: 0, bottom: 10 }}>
                    {/* Gradient */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(234 179 8)" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="rgb(234 179 8)" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    {/* X Axis */}
                    <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                            new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })
                        }
                        tick={{ fontSize: 12, fill: "#71717a" }}
                        axisLine={false}
                        tickLine={false}
                        interval={5}
                    />

                    {/* Y Axis */}
                    <YAxis
                        tick={{ fontSize: 12, fill: "#a1a1aa" }}
                        axisLine={false}
                        tickLine={false}
                        width={32}
                    />

                    {/* Tooltip */}
                    <Tooltip
                        cursor={{ stroke: "#d4d4d8", strokeWidth: 1 }}
                        content={({ active, payload, label }) => {
                            if (!active || !payload?.length) return null;

                            return (
                                <div className="rounded-md border bg-white px-3 py-2 shadow text-sm dark:bg-zinc-900">
                                    <div className="font-medium">
                                        {new Date(label).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                        })}
                                    </div>
                                    <div className="text-zinc-500">{payload[0].value}</div>
                                </div>
                            );
                        }}
                    />

                    {/* Area */}
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="rgb(234 179 8)"
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
