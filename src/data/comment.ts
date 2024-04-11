"use server";

import { db } from "@/lib/db";
import { Comment } from "@prisma/client";

export const getCommnetsByVideoId = async (videoId: string, take?: number): Promise<Comment[] | null> => {
    try {
        return await db.comment.findMany({
            where: { videoId },
            take,
        });
    } catch {
        return null;
    }
};

export const createCommentByVideoId = async (
    ownerId: string,
    videoId: string,
    text: string
): Promise<Comment | null> => {
    try {
        return await db.comment.create({
            data: { ownerId, videoId, text },
        });
    } catch {
        return null;
    }
};

export const updateCommentById = async (id: string, text: string): Promise<Comment | null> => {
    try {
        return await db.comment.update({
            where: { id },
            data: { text, updatedAt: new Date(Date.now()) },
        });
    } catch {
        return null;
    }
};

export const deleteCommentById = async (id: string): Promise<Comment | null> => {
    try {
        return await db.comment.delete({ where: { id } });
    } catch {
        return null;
    }
};

export const findCommentById = async (id: string): Promise<Comment | null> => {
    try {
        return await db.comment.findUnique({ where: { id } });
    } catch {
        return null;
    }
};
