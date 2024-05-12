"use client";

import { useAppSelector } from "@/lib/utils";

export const useCurrentUser = () => {
    const user = useAppSelector((state) => state.User.user);

    return user;
};

export const useAvatarFallback = () => {
    const name = useAppSelector((state) => state.User.user?.name);

    return name
        ?.split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};

export const createAvatarFallback = (name?: string) => {
    return name
        ?.split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};
