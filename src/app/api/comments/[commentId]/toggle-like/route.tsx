import { db } from "@/lib/db";

import { currentUserId } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { countCommentLikes, deleteLikeById } from "@/data/like";

export async function POST(request: NextRequest, { params }: { params: { commentId: string } }) {
    const { commentId } = params;

    if (!commentId) {
        return NextResponse.json({ error: "Please provide a commentId" }, { status: 404 });
    }

    const ownerId = await currentUserId();
    if (!ownerId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
    }

    const existingLiked = await db.like.findFirst({ where: { ownerId, commentId } });
    if (existingLiked) {
        await deleteLikeById(existingLiked.id);
        const likes = await countCommentLikes(commentId);

        return NextResponse.json(
            {
                data: { isLiked: false, commentId },
                success: "Successfully deleted like",
            },
            { status: 200 }
        );
    }

    await db.like.create({ data: { ownerId, commentId } });
    const likes = await countCommentLikes(commentId);

    return NextResponse.json(
        {
            data: { isLiked: true, commentId },
            success: "Comment liked successfully",
        },
        { status: 201 }
    );
}
