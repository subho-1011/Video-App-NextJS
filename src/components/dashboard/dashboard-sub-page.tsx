"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DashboardAbout,
    DashboardCommunity,
    DashboardHome,
    DashboardPlaylist,
    DashboardVideos,
} from "@/components/dashboard";

export const DashboardSubPages = () => {
    const [page, setPage] = useState<React.ReactNode>(<DashboardHome />);

    const items = ["home", "videos", "playlist", "community", "about"];

    const onClick = (item: string) => {
        switch (item) {
            case "home":
                setPage(<DashboardHome />);
                break;
            case "videos":
                setPage(<DashboardVideos />);
                break;
            case "playlist":
                setPage(<DashboardPlaylist />);
                break;
            case "community":
                setPage(<DashboardCommunity />);
                break;
            case "about":
                setPage(<DashboardAbout />);
                break;
            default:
                setPage(<DashboardHome />);
                break;
        }
    };

    return (
        <div>
            <div className="flex border-b-2 px-4 gap-x-4">
                {items.map((item) => (
                    <Button
                        key={item}
                        variant="ghost2"
                        onClick={() => onClick(item)}
                    >
                        {item}
                    </Button>
                ))}
            </div>
            <section className="py-4 px-4">{page}</section>
        </div>
    );
};
