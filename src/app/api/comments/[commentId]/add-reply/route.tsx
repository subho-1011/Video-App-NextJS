import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { commentId: string } }) {
    const { commentId } = params;

    const resBody = await request.json();
    const { text } = resBody;

    if (!text) {
        return NextResponse.json(
            {
                error: "Text is required",
            },
            { status: 400 }
        );
    }

    const ownerId = await currentUserId();
    if (!ownerId) {
        return NextResponse.json(
            {
                error: "You must be logged in to add a reply",
            },
            { status: 401 }
        );
    }

    const response = await db.comment.create({
        data: {
            text,
            commentId,
            ownerId,
        },
    });

    const comment = await db.comment.findUnique({
        where: { id: response.id },
        select: {
            id: true,
            text: true,
            createdAt: true,
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

    if (!comment) {
        return NextResponse.json(
            {
                error: "Failed to add comment",
            },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            data: {
                reply: {
                    ...comment,
                    likes: 0,
                    isLiked: false,
                    replys: [],
                },
                commentId: commentId,
            },
            message: "Reply added successfully",
        },
        { status: 201 }
    );
}
