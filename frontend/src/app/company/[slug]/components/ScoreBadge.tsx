import { cn } from "@/lib/utils"

export function ScoreBadge({ score }: { score: number }) {
    const label = ["No Mention", "Weak", "Moderate", "Strong"][score]

    return (
        <span
            className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            score === 3 && "bg-emerald-100 text-emerald-800",
        score === 2 && "bg-blue-100 text-blue-800",
        score === 1 && "bg-amber-100 text-amber-800",
        score === 0 && "bg-zinc-100 text-zinc-600"
    )}
>
    {label}
    </span>
)
}
