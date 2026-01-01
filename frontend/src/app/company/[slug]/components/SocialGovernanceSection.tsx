"use client"

import { SocialSection } from "./SocialSection"
import { GovernanceSection } from "./GovernanceSection"

export function SocialGovernanceSection({
                                            social,
                                            governance,
                                        }: {
    social: any[]
    governance: any[]
}) {
    return (
        <section className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SocialSection social={social} />
    <GovernanceSection governance={governance} />
    </div>
    </section>
)
}
