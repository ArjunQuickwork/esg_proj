"use client";

type Statement = {
    year: number;
    statement: string;
};

type Props = {
    criterion: string;
    values: Statement[];
};

export function GovernmentalSocialTable({ criterion, values }: Props) {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <header className="mb-3">
                <h3 className="font-medium text-sm">{criterion}</h3>
            </header>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                    <tr className="border-b text-left text-xs text-slate-500">
                        <th className="pb-2 pr-2 font-medium">Year</th>
                        <th className="pb-2 font-medium">Statement</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y">
                    {values.map((row) => (
                        <tr key={row.year}>
                            <td className="py-2 pr-2 align-top text-slate-600">
                                {row.year}
                            </td>
                            <td className="py-2 text-slate-700">
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
