"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function SidebarLink({
                                href,
                                label,
                                children,
                                className,
                            }: {
    href: string;
    label: string;
    children: React.ReactNode;
    className?: string;
}) {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link
            href={href}
    className={`block rounded px-3 py-2 ${
        active ? "bg-slate-200 font-medium" : "hover:bg-slate-100"
    }`}
>
    {children}
    </Link>
);
}
