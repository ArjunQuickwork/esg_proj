"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { EnvironmentMetric } from "../../lib/types";
import { MetricTooltip } from "./ClientTooltip";

export function MetricCard({ metric }: { metric: EnvironmentMetric }) {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <header className="mb-2">
                <h3 className="font-medium">{metric.label}</h3>
                <p className="text-xs text-slate-500">{metric.unit}</p>
            </header>

            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={<MetricTooltip />} />

                        {/* Actuals */}
                        <Line
                            data={metric.actuals}
                            dataKey="value"
                            name="Actuals"
                            strokeWidth={2}
                            dot={false}
                        />

                        {/* Current commitments */}
                        {metric.currentCommitment && (
                            <Line
                                data={metric.currentCommitment}
                                dataKey="value"
                                name="Current Commitment"
                                strokeWidth={2}
                                dot={false}
                            />
                        )}

                        {/* Superseded commitments */}
                        {metric.supersededCommitments?.map((commitment) => (
                            <Line
                                key={commitment.id}
                                data={commitment.series}
                                dataKey="value"
                                name={`Superseded – ${commitment.label}`}
                                strokeDasharray="4 4"
                                strokeWidth={1.5}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Inline legend */}
            <div className="mt-2 flex gap-3 text-xs text-slate-500">
                <span>— Actuals</span>
                <span className="text-blue-600">— Current Target</span>
                <span className="opacity-70">⋯ Revised Target</span>
            </div>
        </div>
    );
}
