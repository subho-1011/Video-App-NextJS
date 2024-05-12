"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { DetailsComponent } from "@/app/(root)/watch/_components/video-details-components";

export default function VideoDetails() {
    const searchParams = useSearchParams();
    const videoId = searchParams.get("v");

    if (!videoId) {
        return null;
    }

    return <DetailsComponent videoId={videoId} />;
}
