"use server";

import { db } from "@/lib/db";

export const getVideos = async () => {
    try {
        const videos = await db.video.findMany({
            include: { owner: { select: { id: true, username: true, name: true, image: true } } },
        });

        return videos;
    } catch {
        return null;
    }
};

export const getVideoById = async (id: string) => {
    try {
        const video = await db.video.findUnique({ where: { id } });

        return video;
    } catch {
        return null;
    }
};

export const videoUrlById = async (id: string) => {
    return await db.video.findUnique({
        where: { id },
        select: { videoUrl: true },
    });
};
