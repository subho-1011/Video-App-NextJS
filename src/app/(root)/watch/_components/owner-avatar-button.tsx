"use client";

import { createAvatarFallback } from "@/hooks/user";

import { DashboardButton } from "@/components/dashboard-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const OwnerAvatarButton = ({ avatar, name, ownerId }: { avatar: string; name: string; ownerId: string }) => {
    const afb = createAvatarFallback(name);

    return (
        <DashboardButton userId={ownerId}>
            <Avatar className="h-16 w-16">
                <AvatarImage src={avatar}></AvatarImage>
                <AvatarFallback>{afb}</AvatarFallback>
            </Avatar>
        </DashboardButton>
    );
};
