"use server";

import { db } from "@/lib/db";

export const countCommentLikes = async (commentId: string) => {
    try {
        const likes = await db.like.count({
            where: { commentId },
        });

        return likes;
    } catch {
        return null;
    }
};

export const createLike = async (ownerId: string, videoId: string) => {
    try {
        const like = db.like.create({
            data: {
                ownerId,
                videoId,
            },
        });

        return like;
    } catch {
        return null;
    }
};

export const deleteLikeById = async (id: string) => {
    await db.like.delete({ where: { id } });
};

export const deleteLike = async (ownerId: string, videoId: string) => {
    try {
        const like = await db.like.deleteMany({
            where: {
                ownerId,
                videoId,
            },
        });

        return like;
    } catch {
        return null;
    }
};

export const getLikesByVideoId = async (videoId: string) => {
    const likes = await db.like.count({
        where: { videoId },
    });

    return likes;
};

export const toggleVideoLike = async (ownerId: string, videoId: string, like: boolean) => {
    try {
        if (like) {
            return await createLike(ownerId, videoId);
        } else {
            return await deleteLike(ownerId, videoId);
        }
    } catch (error) {
        console.error("Error toggling like :", error);
        throw new Error("Error toggling like");
    }
};

export const isVideoLikedByUser = async (userId: string, videoId: string) => {
    try {
        const isLiked = await db.like.findFirst({
            where: {
                videoId,
                ownerId: userId,
            },
        });

        return isLiked;
    } catch (error) {
        return false;
    }
};

export const getLikesAVideo = async (videoId: string) => {
    try {
        const likes = await db.like.count({
            where: { videoId },
        });

        return likes;
    } catch (error) {
        return -1;
    }
};
