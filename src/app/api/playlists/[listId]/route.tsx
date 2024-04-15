import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { listId: string } }) {
    const listId = params.listId;
    if (!listId) {
        return NextResponse.json({ error: "Please provide a listId" }, { status: 404 });
    }

    const ownerId = await currentUserId();

    const playlist = await db.playlist.findFirst({
        where: {
            AND: {
                id: listId,
                OR: [{ ownerId }, { privacy: "public" }],
            },
        },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                },
            },
        },
    });
    if (!playlist) {
        return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    const videos = await Promise.all(
        playlist.videosId.map(async (id) => {
            const video = await db.video.findUnique({
                where: { id },
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            image: true,
                        },
                    },
                },
            });

            return video;
        })
    );

    return NextResponse.json(
        {
            data: {
                playlist: { ...playlist, videos },
            },
            success: true,
            message: "Playlis get successfully",
        },
        { status: 200 }
    );
}
