import { db } from "@/lib/db";
import { uploadImageToCloudinary, uploadVideoToCloudinary } from "@/lib/cloudinary";

import { currentUserId } from "@/lib/auth";
import { bufferFile } from "@/lib/write-buffer-file";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const resBody = await request.formData();
    if (!resBody.get("title")) {
        return NextResponse.json({ error: "Title is required" }, { status: 404 });
    }
    if (!resBody.get("description")) {
        return NextResponse.json({ error: "Description is required" }, { status: 404 });
    }
    if (!resBody.get("thumbnail")) {
        return NextResponse.json({ error: "Thumbnail is required" }, { status: 404 });
    }
    if (!resBody.get("video")) {
        return NextResponse.json({ error: "Video is required" }, { status: 404 });
    }

    const title = resBody.get("title");
    const description = resBody.get("description");
    const thumbnail = resBody.get("thumbnail");
    const video = resBody.get("video");
    const isPublished = resBody.get("isPublished");

    try {
        const owner = await currentUserId();
        if (owner === undefined) {
            return NextResponse.json({ error: " owner is required" }, { status: 404 });
        }

        const thumbnailLocalPath = await bufferFile(thumbnail as File);
        const thumbnailData = await uploadImageToCloudinary(thumbnailLocalPath, "video-app/thumbnails");
        if (!thumbnailData) {
            return NextResponse.json({ error: "Thumbnail upload failed" }, { status: 404 });
        }

        const videoLocalPath = await bufferFile(video as File);
        const videoData = await uploadVideoToCloudinary(videoLocalPath, "video-app/videos");
        if (!videoData) {
            return NextResponse.json({ error: "Video upload failed" }, { status: 404 });
        }

        const addVideoResponse = await db.video.create({
            data: {
                title: title as string,
                description: description as string,
                thumbnail: thumbnailData.secure_url as string,
                videoUrl: videoData.secure_url as string,
                owner,
                isPublished: isPublished ? !!isPublished : true,
            },
        });
        if (!addVideoResponse) {
            return NextResponse.json({ error: "Video create failed" }, { status: 404 });
        }

        return NextResponse.json({ data: addVideoResponse, success: "Video add succussfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
