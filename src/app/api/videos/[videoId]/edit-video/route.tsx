import { db } from "@/lib/db";

import { currentUserId } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";
import { slugTransform } from "@/lib/utils";

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
    const resBody = await request.formData();
    const videoId = params.videoId;

    if (["title", "description"].some((field) => !resBody.get(field))) {
        return NextResponse.json({ error: "Please fill all the fields" }, { status: 404 });
    }

    const title = resBody.get("title");
    const description = resBody.get("description");

    try {
        const ownerId = await currentUserId();
        if (ownerId === undefined) {
            return NextResponse.json({ error: " owner is required" }, { status: 404 });
        }

        const editVideoResponse = await db.video.update({
            where: { id: videoId },
            data: {
                title: title as string,
                slug: slugTransform(title as string),
                description: description as string,
            },
        });

        if (!editVideoResponse) {
            return NextResponse.json({ error: "Video edit failed" }, { status: 404 });
        }

        return NextResponse.json({ data: editVideoResponse, success: "Video edit succussfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
