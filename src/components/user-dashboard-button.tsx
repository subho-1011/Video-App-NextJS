"use client";

import { User2Icon } from "lucide-react";
import { DashboardButton } from "./dashboard-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createAvatarFallback } from "@/hooks/user";

export const UserDashboardButton = ({
    name,
    username,
    image,
}: {
    name: string;
    username: string;
    image: string;
}) => {
    const avatarFallback = createAvatarFallback(name);

    return (
        <DashboardButton username={username}>
            <Avatar className="h-10 w-10 ring-1 ring-slate-600">
                <AvatarImage src={image}></AvatarImage>
                <AvatarFallback>
                    {avatarFallback ? avatarFallback : <User2Icon />}
                </AvatarFallback>
            </Avatar>
        </DashboardButton>
    );
};
