"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/actions/auth";

export const LogoutButton = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();

    const onClick = async () => {
        logout();
    };
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
