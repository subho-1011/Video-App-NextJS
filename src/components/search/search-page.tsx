"use client";

import { TVideo } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SearchVideoCard } from "./search-video-card";
import { searchVideosByQuery } from "@/services/search.services";

export const SearchPage = () => {
    const params = useParams();
    const query = params.query as string;

    if (query) {
        return <SearchVideos query={query} />;
    }

    return <div>Search for something</div>;
};

const SearchVideos = ({ query }: { query: string }) => {
    const [videos, setVideos] = useState<TVideo[]>([]);

    useEffect(() => {
        if (!query) return;
        searchVideosByQuery(query).then((videos) => {
            setVideos(videos);
        });

        return () => {
            setVideos([]);
        };
    }, [query]);

    return (
        <div className="space-y-3">
            {videos.map((video) => (
                <SearchVideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};
