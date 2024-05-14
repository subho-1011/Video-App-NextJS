"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const DashboardButton = ({
    children,
    username,
}: {
    children: React.ReactNode;
    username: string;
}) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/@${username}`);
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
