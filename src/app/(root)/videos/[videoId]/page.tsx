"use client";

import EditVideoForm from "@/components/edit-video-form";
import { useSearchParams } from "next/navigation";

const VideoEditPage = ({ params }: { params: { videoId: string } }) => {
    const searchParams = useSearchParams();
    if (searchParams.get("edit") === "true") {
        // return <EditVideoForm />;
        return <EditVideoForm videoId={params.videoId} />;
    }

    return (
        <div>
            <h1>Video Page</h1>
            <div>Video Id: {params.videoId}</div>
        </div>
    );
};

export default VideoEditPage;
