import React from "react";
import Image from "next/image";

import { Separator } from "../ui/separator";
import { ArrowRightSquareIcon, Dot } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { timeInterval, useAppSelector } from "@/lib/utils";
import { TVideo } from "@/types";
import { VideoClickButton } from "../video-click-button";

const DashboardHome = () => {
    return (
        <div>
            <RecentVideos />
            {/* <Separator className="my-4 h-1" /> */}
        </div>
    );
};

const RecentVideos = () => {
    const { videos } = useAppSelector((state) => state.Dashboard);

    return (
        <div className="mb-2">
            <h3 className="mb-2 text-xl flex items-center">
                Resent Videos
                <span className="ml-3">
                    <ArrowRightSquareIcon />
                </span>
            </h3>
            <div className="grid grid-cols-5 gap-2">
                {videos &&
                    videos.map((video) => (
                        <VideoCard key={video.id} {...video} />
                    ))}
            </div>
        </div>
    );
};

const LastMonthVideos = () => {
    return (
        <div>
            <div>Last month videos</div>
            <div className="grid grid-cols-5 gap-1"></div>
        </div>
    );
};

const VideoCard = (video: TVideo) => {
    return (
        <VideoClickButton videoId={video.id} slug={video.slug}>
            <div className="space-y-1">
                <div className=" min-h-32">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={video.thumbnail}
                            alt="thumbnail"
                            width={240}
                            height={240}
                            loading="lazy"
                            className="h-full w-full flex rounded-lg object-cover"
                        />
                    </AspectRatio>
                </div>
                <h2 className=" text-md line-clamp-2">{video.title}</h2>
                <div className="space-y-1 text-sm text-muted-foreground">
                    <div>@{video.owner.username}</div>
                    <div className=" inline-flex">
                        <span>{video.views} views</span>
                        <Dot />
                        <span>
                            {timeInterval(video.createdAt.toString())} ago
                        </span>
                    </div>
                </div>
            </div>
        </VideoClickButton>
    );
};

export default DashboardHome;
