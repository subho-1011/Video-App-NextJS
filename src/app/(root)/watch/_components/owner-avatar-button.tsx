"use client";

import { createAvatarFallback } from "@/hooks/user";

import { DashboardButton } from "@/components/dashboard-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const OwnerAvatarButton = ({ image, name, username }: { image: string; name: string; username: string }) => {
    const afb = createAvatarFallback(name);

    return (
        <DashboardButton userId={username}>
            <Avatar className="h-16 w-16">
                <AvatarImage src={image}></AvatarImage>
                <AvatarFallback>{afb}</AvatarFallback>
            </Avatar>
        </DashboardButton>
    );
};
