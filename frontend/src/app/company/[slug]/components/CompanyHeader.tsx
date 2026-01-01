import { Badge } from "@/components/ui/badge"

export function CompanyHeader({
                                  name,
                                  industry,
                                  country,
                              }: {
    name: string
    industry: string
    country: string
}) {
    return (
        <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
            {name}
            </h1>

            <div className="flex gap-2 flex-wrap">
    <Badge variant="secondary">{industry}</Badge>
        <Badge variant="outline">{country}</Badge>
        </div>
        </header>
)
}
