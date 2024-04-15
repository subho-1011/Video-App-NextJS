import React from "react";
import Image from "next/image";

import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { ArrowRightSquareIcon, Dot } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { getAllVideos } from "@/services/video.services";
import { timeInterval } from "@/lib/utils";

const DashboardHome = () => {
    return (
        <div>
            <RecentVideos />
            <Separator className="my-4 h-1" />
            <LastMonthVideos />
        </div>
    );
};

type RecentVideo = {
    id: string;
    thumbnail: string;
    title: string;
    owner: {
        id: string;
        username: string;
    };
    views: number;
    createdAt: Date;
};

const RecentVideos = () => {
    const [recentVideos, setRecentVideos] = React.useState<RecentVideo[]>([]);

    React.useEffect(() => {
        getAllVideos().then((res) => {
            console.log(res);

            if (res.data) {
                setRecentVideos(res.data);
            }
        });
    }, []);

    console.log(recentVideos);

    return (
        <div className="mb-2">
            <h3 className="mb-2 text-xl flex items-center">
                Resent Videos
                <span className="ml-3">
                    <ArrowRightSquareIcon />
                </span>
            </h3>
            <div className="grid grid-cols-5 gap-2">
                {recentVideos && recentVideos.map((video) => <VideoCard key={video.id} {...video} />)}
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

const VideoCard = (video: RecentVideo) => {
    return (
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
                    <span>{timeInterval(video.createdAt.toString())} ago</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
