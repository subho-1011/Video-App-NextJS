"use client";

import { useRouter } from "next/navigation";
import React from "react";

export const DashboardButton = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/@${userId}`);
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
