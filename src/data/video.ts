"use server";

import { db } from "@/lib/db";

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
