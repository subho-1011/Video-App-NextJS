"use client";

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();
    const user = session.data?.user;

    return user;
};

export const useAvatarFallback = () => {
    const session = useSession();

    const name = session.data?.user?.name;

    return name
        ?.split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};
