"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { SeriesPoint } from "../../lib/types";
import { MetricTooltip } from "./ClientTooltip";

type Props = {
    name: string;
    unit: string;
    current: SeriesPoint[];
    future: SeriesPoint[][];
};

export function MetricCard({ name, unit, current, future }: Props) {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <header className="mb-2">
                <h3 className="font-medium">{name}</h3>
                <p className="text-xs text-slate-500">{unit}</p>
            </header>

            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart>
                        <XAxis dataKey="year" type="number"
                               domain={["dataMin", "dataMax"]}
                               tickFormatter={(y) => y.toString()}/>
                        <YAxis />
                        <Tooltip content={<MetricTooltip />} />

                        {/* Actuals / current values */}
                        <Line
                            data={current}
                            dataKey="value"
                            name="Actual"
                            strokeWidth={2}
                            dot={false}
                        />

                        {/* Future commitments (each series is one projection) */}
                        {future.map((series, index) => (
                            <Line
                                key={index}
                                data={series}
                                dataKey="value"
                                name={`Target ${index + 1}`}
                                strokeDasharray={index === 0 ? undefined : "4 4"}
                                strokeWidth={index === 0 ? 2 : 1.5}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Inline legend */}
            <div className="mt-2 flex gap-3 text-xs text-slate-500">
                <span>— Actual</span>
                <span className="text-blue-600">— Target</span>
                <span className="opacity-70">⋯ Revised Target</span>
            </div>
        </div>
    );
}
