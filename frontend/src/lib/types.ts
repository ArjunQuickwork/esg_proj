export type SeriesPoint = {
    year: number;
    value: number;
};

export type CommitmentSeries = {
    id: string;          // report id
    label: string;       // "2021 Sustainability Report"
    series: SeriesPoint[];
};

export type EnvironmentMetric = {
    key: string;
    label: string;
    unit: string;

    actuals: SeriesPoint[];
    currentCommitment?: SeriesPoint[];
    supersededCommitments?: CommitmentSeries[];
};

export type GovernmentSocialMetric = {
    key: string;
    label: string;
    values: StringSeriesPoint[]
}

export type StringSeriesPoint = {
    year: number;
    statement: string;
}

export type CompanyESG = {
    companySlug: string;
    companyName: string;
    environmental: EnvironmentMetric[];
    social: GovernmentSocialMetric[];
    governance: GovernmentSocialMetric[];
};
