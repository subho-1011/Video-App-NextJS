import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createCommentByVideoId, getCommnetsByVideoId } from "@/data/comment";

export async function GET(request: NextRequest, { params }: { params: { videoId: string } }) {
    const userId = await currentUserId();

    const { videoId } = params;
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    const comments = await db.comment.findMany({
        where: { videoId },
        select: {
            id: true,
            text: true,
            createdAt: true,
            owner: {
                select: { id: true, name: true, image: true, username: true },
            },
            likes: {
                select: { id: true, ownerId: true },
            },
            replys: {
                select: {
                    id: true,
                    text: true,
                    createdAt: true,
                    owner: {
                        select: { id: true, name: true, image: true, username: true },
                    },
                    likes: {
                        select: { id: true, ownerId: true },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
        // take: limit ? Number(limit) : 10,
        // skip: offset ? Number(offset) : 0,
    });

    const commentsWithLikes = comments.map((comment) => {
        const isLiked = comment.likes.some((like) => like.ownerId === userId);

        return {
            ...comment,
            likes: comment.likes.length,
            isLiked,
            replys: comment.replys.map((reply) => {
                const isLiked = reply.likes.some((like) => like.ownerId === userId);

                return {
                    ...reply,
                    likes: reply.likes.length,
                    isLiked,
                };
            }),
        };
    });

    return NextResponse.json({
        data: commentsWithLikes,
    });
}

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
    const ownerId = await currentUserId();
    if (!ownerId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
    }

    const videoId = params.videoId;
    if (!videoId) {
        return NextResponse.json({ error: "Please provide a videoId" }, { status: 404 });
    }

    const resBody = await request.json();
    const { text } = resBody;
    if (!text) {
        return NextResponse.json({ error: "Comment required for add comment" }, { status: 404 });
    }

    const res = await createCommentByVideoId(ownerId, videoId, text);
    const comment = await db.comment.findUnique({
        where: { id: res?.id },
        select: {
            id: true,
            videoId: true,
            ownerId: true,
            text: true,
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

    if (!comment) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    return NextResponse.json({ success: "Comment add successfully", data: { comment } }, { status: 200 });
}
