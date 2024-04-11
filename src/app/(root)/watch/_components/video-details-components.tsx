"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IFullVideoDetails } from "@/lib/types";

import { VideoShareButton } from "@/app/(root)/watch/_components/video-share-button";
import { VideoLikeButton } from "@/app/(root)/watch/_components/video-like-button";
import { VideoSubscriberButton } from "@/app/(root)/watch/_components/video-subscription-button";
import { OwnerAvatarButton } from "@/app/(root)/watch/_components/owner-avatar-button";

import { Card } from "@/components/ui/card";
import { DashboardButton } from "@/components/dashboard-button";

import { Dot } from "lucide-react";

import { timeInterval } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/user";
import { toggleLikedButton, videoData } from "@/services/video.services";
import { toggleSubscription } from "@/services/subscriptions.services";

export const DetailsComponent = ({ videoId }: { videoId: string }) => {
    const router = useRouter();
    const user = useCurrentUser();

    const [video, setVideo] = useState<IFullVideoDetails>();

    useEffect(() => {
        videoData(videoId).then((res) => {
            setVideo(res.data);
        });
    }, [videoId]);

    if (!video) {
        return null;
    }

    const onToggleLikeButton = async () => {
        if (!user) {
            router.push("/auth/login");
            return;
        }

        const res = await toggleLikedButton(videoId);

        if (!res) {
            return;
        }
        setVideo({ ...video, isLiked: res.isLiked, likes: res.likes });
    };

    const onToggleSubscriptionButton = async () => {
        if (!user) {
            router.push("/auth/login");
            return;
        }

        const res = await toggleSubscription(video.owner.id);

        if (!res) {
            return;
        }
        setVideo({ ...video, isSubscribed: res.isSubscribed, subscribers: res.subscribers });
    };

    const isOwner = video.owner.id === user?.id ? true : false;
    console.log(`isOwner: ${isOwner}`);

    return (
        <div className="flex flex-col space-y-3 px-2">
            <VideoTitle title={video.title} />
            <ButtonsContainer
                id={video.id}
                name={video.owner.name}
                isOwner={isOwner}
                avatar={video.owner.image}
                username={video.owner.username}
                isLiked={video.isLiked}
                likes={video.likes}
                isSubscribed={video.isSubscribed}
                subscribers={video.subscribers}
                onToggleLikeButton={onToggleLikeButton}
                onToggleSubscriptionButton={onToggleSubscriptionButton}
            />
            <VideoDescriptions
                title={video.title}
                descriptions={video.description}
                views={video.views}
                createAt={video.createdAt}
            />
        </div>
    );
};

const VideoTitle = ({ title }: { title: string }) => {
    return (
        <div className="flex items-center">
            <h1 className="text-lg font-medium">{title}</h1>
        </div>
    );
};

const ButtonsContainer = ({
    id,
    name,
    isOwner,
    avatar,
    username,
    isLiked,
    likes,
    isSubscribed,
    subscribers,
    onToggleLikeButton,
    onToggleSubscriptionButton,
}: {
    id: string;
    name: string;
    isOwner: boolean;
    avatar: string;
    username: string;
    isLiked: boolean;
    likes: number;
    isSubscribed: boolean;
    subscribers: number;
    onToggleLikeButton: () => void;
    onToggleSubscriptionButton: () => void;
}) => {
    return (
        <div className="flex flex-col-reverse md:flex-row gap-x-2 gap-y-4 justify-between">
            <div className="flex gap-x-4 items-center">
                <OwnerAvatarButton username={username} name={name} avatar={avatar} />
                <DashboardButton userId={username}>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-normal">{name}</h1>
                        <p className="text-muted-foreground text-sm">{subscribers} subscribers</p>
                    </div>
                </DashboardButton>
                <VideoSubscriberButton
                    isSubscribed={isSubscribed}
                    onToggleSubscriptionButton={onToggleSubscriptionButton}
                />
            </div>
            <div className="flex gap-x-10 items-center justify-end">
                <VideoLikeButton
                    isLiked={isLiked}
                    likes={likes}
                    onToggleLikeButton={onToggleLikeButton}
                    isOwner={isOwner}
                />
                <VideoShareButton />
            </div>
        </div>
    );
};

const VideoDescriptions = ({
    title,
    descriptions,
    views,
    createAt,
}: {
    title?: string;
    descriptions?: string;
    views?: number;
    createAt: Date;
}) => {
    const interval = timeInterval(createAt?.toString());

    return (
        <Card className="flex flex-col space-y-2 bg-secondary p-4">
            <h1 className="text-lg text-secondary-foreground">{title}</h1>
            <p className="flex text-muted-foreground">
                <span className="text-secondary-foreground">{views} views</span>
                <Dot />
                <span className="text-secondary-foreground">{interval}</span>
            </p>
            <p className="text-muted-foreground">{descriptions}</p>
        </Card>
    );
};
