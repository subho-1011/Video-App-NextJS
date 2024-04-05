import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const videos = await db.video.findMany({
            where: { isPublished: true },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                thumbnail: true,
                duration: true,
                views: true,
                createdAt: true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        image: true,
                    },
                },
            },
        });
        if (!videos || videos.length === 0) {
            return NextResponse.json({ error: "No videos found" }, { status: 404 });
        }

        const res = await Promise.all(
            videos.map(async (video) => {
                const likes = await db.like.count({
                    where: { videoId: video.id },
                });

                return { ...video, likes };
            })
        );

        return NextResponse.json({ data: res, success: "Videos successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
