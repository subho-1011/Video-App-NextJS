"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const AuthCardBackButton = ({
    label,
    href,
}: {
    label: string;
    href: string;
}) => {
    return (
        <Button variant="link" size="sm" asChild className="w-full font-normal">
            <Link href={href}>{label}</Link>
        </Button>
    );
};
