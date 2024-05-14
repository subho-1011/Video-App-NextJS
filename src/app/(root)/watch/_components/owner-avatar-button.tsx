"use client";

import { DashboardButton } from "@/components/dashboard-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2Icon } from "lucide-react";

export const OwnerAvatarButton = ({
    image,
    name,
    username,
}: {
    image: string;
    name: string;
    username: string;
}) => {
    return (
        <DashboardButton username={username}>
            <Avatar className="h-16 w-16">
                <AvatarImage src={image}></AvatarImage>
                <AvatarFallback>
                    <User2Icon />
                </AvatarFallback>
            </Avatar>
        </DashboardButton>
    );
};
