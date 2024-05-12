import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";

export default function WatchLayout({
    children,
    videoplayer,
    videodetails,
    playlist,
    sidevideos,
    comments,
}: {
    children: React.ReactNode;
    videoplayer: React.ReactNode;
    videodetails: React.ReactNode;
    comments: React.ReactNode;
    playlist?: React.ReactNode;
    sidevideos: React.ReactNode;
}) {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-stretch w-full gap-6">
                <div className="flex flex-col w-full lg:min-w-[70%] lg:max-w-[75%] space-y-6">
                    {/* <AspectRatio ratio={16 / 9}>{videoplayer}</AspectRatio> */}
                    {/* {videodetails} */}
                    {children}
                    {comments}
                </div>
                <div className="space-y-6">
                    {playlist}
                    {sidevideos}
                </div>
            </div>
        </>
    );
}
