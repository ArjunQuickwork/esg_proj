export type SocialGovernanceRow = {
    question: string
    year: number
    rating: number
}

export function normalizeSGScores(
    items: {
        criterion: string
        history: { year: number; rating: number }[]
    }[]
): SocialGovernanceRow[] {
    return items.flatMap(item =>
        item.history.map(h => ({
            question: item.criterion,
            year: h.year,
            rating: h.rating
        }))
    )
}
