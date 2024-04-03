"use client";

import Image from "next/image";

import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Dot, User2Icon } from "lucide-react";

import { createAvatarFallback } from "@/hooks/user";
import { IVideoCard } from "@/lib/types";

import { VideoClickButton } from "../video-click-button";
import { DashboardButton } from "../dashboard-button";

export const VideoCard = ({ id, title, thumbnail, views, likes, duration, owner }: IVideoCard) => {
    const avatarFallback = createAvatarFallback(owner.name);

    return (
        <Card className="space-y-3 border-0">
            <Card className="m-0 p-0">
                <VideoClickButton videoId={id}>
                    <AspectRatio ratio={16 / 9} className="w-full relative">
                        <Image
                            src={thumbnail}
                            alt="thumbnail"
                            width={400}
                            height={400}
                            // loading="lazy"
                            priority
                            className="h-full w-full flex rounded-lg object-cover"
                        />
                        <p className="flex rounded-lg right-3 bottom-3 px-1.5 bg-black/70 absolute">{duration}</p>
                    </AspectRatio>
                </VideoClickButton>
            </Card>
            <CardFooter className="flex items-start gap-4 px-3">
                <div className="flex items-end justify-end h-full">
                    <DashboardButton userId={owner.id}>
                        <Avatar className="h-10 w-10 ring-1 ring-slate-600">
                            <AvatarImage src={owner.image}></AvatarImage>
                            <AvatarFallback>{avatarFallback ? avatarFallback : <User2Icon />}</AvatarFallback>
                        </Avatar>
                    </DashboardButton>
                </div>
                <div className="flex flex-col">
                    <h1 className="lg:text-lg line-clamp-2 md:mb-2">
                        <VideoClickButton videoId={id}>{title}</VideoClickButton>
                    </h1>
                    <h1 className="text-muted-foreground">
                        <DashboardButton userId={owner.id}>@{owner.username}</DashboardButton>
                    </h1>
                    <p className="text-muted-foreground inline-flex">
                        <span>
                            <span>{likes} </span>likes
                        </span>
                        <Dot />
                        <span>
                            <span>{views} </span>views
                        </span>
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
};
