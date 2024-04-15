import { createCommentByVideoId, getCommnetsByVideoId } from "@/data/comment";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { videoId: string } }) {
    const userId = await currentUserId();

    const videoId = params.videoId;

    if (!videoId) {
        return NextResponse.json({ error: "Please provide a videoId" }, { status: 404 });
    }

    const comments = await db.comment.findMany({
        where: { videoId },
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
            like: {
                select: {
                    id: true,
                    ownerId: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const commentsWithTotalLikes = comments.map((comment) => {
        const likes = comment.like.length;

        let isLiked = false;
        comment.like.forEach((like) => {
            if (like.ownerId === userId) {
                return (isLiked = true);
            }
        });

        return {
            ...comment,
            isLiked,
            likes,
        };
    });

    return NextResponse.json(
        {
            success: "All comments fetch successfully",
            data: {
                comments: commentsWithTotalLikes,
            },
        },
        { status: 200 }
    );
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
