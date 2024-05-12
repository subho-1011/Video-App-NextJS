"use client";

import { searchAll } from "@/actions/search";
import { AvatarCard } from "@/components/avatar-card";
import { Card } from "@/components/ui/card";
import { ThumbnailCard } from "@/components/video";
import { timeInterval } from "@/lib/utils";
import { TVideo } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [videos, setVideos] = useState<TVideo[]>([]);

    useEffect(() => {
        if (!query) return;

        searchAll(query).then((res) => {
            if (res) setVideos(res);
        });
    }, [query]);

    if (!query || !videos || videos.length === 0) {
        <div>
            <div>Dont macth any thing</div>
            go back to home
        </div>;
    }

    return (
        <div className="space-y-3">
            {videos.map((video) => (
                <SearchVideoCard key={video.id} {...video} />
            ))}
        </div>
    );
};

const SearchVideoCard = (video: TVideo) => {
    return (
        <div className="w-full md:max-w-xl flex">
            <Card className="w-1/2">
                {/* thumbnail */}
                <ThumbnailCard id={video.id} slug={video.slug} thumbnail={video.thumbnail} />
            </Card>
            <div className="w-1/2">
                <div className="flex flex-col justify-between h-full p-3">
                    <h2 className="text-lg font-semibold line-clamp-2">{video.title}</h2>
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex flex-col justify-start space-y-2">
                            <AvatarCard
                                image={video?.owner?.image!}
                                name={video.owner.name!}
                                username={video.owner.username!}
                            />
                            <span className="text-sm text-gray-500">{timeInterval(video.createdAt)} ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
