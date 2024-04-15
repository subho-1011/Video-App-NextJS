"use client";

import { createAvatarFallback } from "@/hooks/user";

import { DashboardButton } from "@/components/dashboard-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const OwnerAvatarButton = ({ avatar, name, username }: { avatar: string; name: string; username: string }) => {
    const afb = createAvatarFallback(name);

    return (
        <DashboardButton userId={username}>
            <Avatar className="h-16 w-16">
                <AvatarImage src={avatar}></AvatarImage>
                <AvatarFallback>{afb}</AvatarFallback>
            </Avatar>
        </DashboardButton>
    );
};
