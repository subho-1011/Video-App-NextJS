"use client";
import { VideoCardPlayer } from "@/app/(root)/watch/_components/video-player-card";
import { useAppSelector } from "@/lib/utils";
import ReactPlayer from "react-player";

export default function Page() {
    // return <VideoCardPlayer />;
    const videoUrl = useAppSelector((state) => state.VideoData.video?.videoUrl);
    return (
        <>
            <div className="w-full h-full shadow-md border">
                <ReactPlayer url={videoUrl} height="100%" width="100%" playing controls />
            </div>
        </>
    );
}
