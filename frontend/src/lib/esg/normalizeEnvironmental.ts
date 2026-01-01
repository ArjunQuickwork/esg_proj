import {EnvironmentalSeries, EnvironmentQualitativeData, Point} from "../types"

export function normalizeEnvironmentalQuantitativeMetric(
    name: string,
    metric: any
): EnvironmentalSeries {
    const points: Point[] = []

    // CURRENT (array)
    if (Array.isArray(metric.current)) {
        metric.current.forEach((d: any) => {
            if (!d?.year || d.year === 0) return
            points.push({
                year: d.year,
                value: d.value,
                type: "current",
            })
        })
    }

    // FUTURE (array)
    if (Array.isArray(metric.future)) {
        metric.future.forEach((d: any) => {
            if (!d?.year || d.year === 0) return
            points.push({
                year: d.year,
                value: d.value,
                type: "future",
            })
        })
    }

    return {
        name,
        unit: metric.unit,
        data: points.sort((a, b) => a.year - b.year),
    }
}


export function normalizeEnvironmentalQualitativeMetric(
    name: string,
    metric: any
): EnvironmentQualitativeData[] {
    const data: EnvironmentQualitativeData[] = []

    if (Array.isArray(metric.history)) {
        metric.history.forEach((d: any) => {
            if (!d?.year || d.year === 0) return
            data.push({
                year: d.year,
                comment: d.comment,
                criterion: name
            })
        })
    }

    return data
}