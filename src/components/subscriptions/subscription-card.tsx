import React from "react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User2Icon } from "lucide-react";
import { DashboardButton } from "../dashboard-button";

export const SubscriptionCard = ({
    id,
    username,
    name,
    image,
    subscribers,
    totalLikes,
    totalVideos,
    totalViews,
}: {
    id: string;
    username: string;
    name: string;
    image?: string;
    subscribers: number;
    totalLikes: number;
    totalVideos: number;
    totalViews: number;
}) => {
    return (
        <DashboardButton userId={username}>
            <Card>
                <div className="flex p-4 justify-center items-center gap-3 h-fit py-12">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={image}></AvatarImage>
                        <AvatarFallback>
                            <User2Icon />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                        <h1 className="mx-2">{name}</h1>

                        <Badge className="w-fit">@{username}</Badge>
                    </div>
                </div>
                <div className="bg-secondary flex flex-col rounded-b-md p-4 gap-3">
                    <div className="flex justify-between">
                        <span>Subscribers</span> <Badge>{subscribers}</Badge>
                    </div>
                    <Separator className=" bg-secondary-foreground" />
                    <div className="flex justify-between">
                        <span>Total videos</span> <Badge>{totalVideos}</Badge>
                    </div>
                    <Separator className=" bg-secondary-foreground" />
                    <div className="flex justify-between">
                        <span>Total Likes</span> <Badge>{totalLikes}</Badge>
                    </div>
                    <Separator className=" bg-secondary-foreground" />
                    <div className="flex justify-between">
                        <span>Total Views</span> <Badge>{totalViews}</Badge>
                    </div>
                </div>
            </Card>
        </DashboardButton>
    );
};
