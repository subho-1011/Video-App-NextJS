import { db } from "@/lib/db";
import { getVideoById } from "@/data/video";
import { currentUserId } from "@/lib/auth";

import { PlaylistForm } from "@/lib/schemas";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const ownerId = await currentUserId();
    if (!ownerId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
    }

    const playlists = await db.playlist.findMany({
        where: { ownerId },
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

    const playlistsWithVideos = await Promise.all(
        playlists.map(async (playlist) => {
            const videos = await Promise.all(
                playlist.videosId.map(async (id) => {
                    const video = await getVideoById(id);

                    return video;
                })
            );

            return {
                ...playlist,
                videos,
            };
        })
    );

    return NextResponse.json(
        {
            data: { playlists: playlistsWithVideos },
            success: true,
            message: "Playlist fetch successfully",
        },
        { status: 200 }
    );
}

export async function POST(request: NextRequest) {
    try {
        const ownerId = await currentUserId();
        if (!ownerId) {
            return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
        }

        const resBody = await request.json();

        console.log(resBody);

        const validatedData = PlaylistForm.safeParse(resBody);
        if (!validatedData.success) {
            return NextResponse.json({ error: "Server side validation failed" }, { status: 400 });
        }

        console.log(validatedData.data);

        const { title, description, videoUrls, privacy } = validatedData.data;

        let videosId: string[] = [];

        if (videoUrls && videoUrls.length > 0) {
            for (let url of videoUrls) {
                const regex = /(?:\?|&)v=([^&]+)/;
                const match = url.match(regex);

                if (match) {
                    const videoId = match[1];
                    const video = await getVideoById(videoId);

                    videosId = videosId.filter((id) => id !== videoId);

                    if (video) {
                        videosId.push(videoId);
                    }
                }
            }
        }

        const playlist = await db.playlist.create({
            data: { title, description, videosId, ownerId, privacy },
        });

        return NextResponse.json(
            {
                data: { playlist },
                success: true,
                message: "Playlist add succussfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
