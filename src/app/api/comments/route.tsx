"use server";

import { currentUserId } from "@/lib/auth";
import { deleteCommentById, findCommentById, getCommnetsByVideoId, updateCommentById } from "@/data/comment";

import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@prisma/client";
import { db } from "@/lib/db";

async function validateComment(request: NextRequest): Promise<{ comment?: Comment; error?: string }> {
    const { searchParams } = request.nextUrl;

    const commentId = searchParams.get("commentId");
    if (!commentId) return { error: "Comment ID not found" };

    const comment = await findCommentById(commentId);
    if (!comment) return { error: "Comment not found" };

    const userId = await currentUserId();
    if (!userId) return { error: "You are not logged in" };

    if (comment.ownerId !== userId) return { error: "You are not the owner of this comment" };

    return { comment };
}

export async function DELETE(request: NextRequest) {
    try {
        const res = await validateComment(request);

        if (res.error) {
            return NextResponse.json({ error: res.error }, { status: 404 });
        }

        const { comment } = res;
        if (!comment) {
            return NextResponse.json({ error: "Comment not found" }, { status: 404 });
        }

        await deleteCommentById(comment.id);

        const comments = await getCommnetsByVideoId(comment.videoId!);

        return NextResponse.json({ comments, success: "Comment has been deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }
}

export async function PATCH(request: NextRequest) {
    const resBody = await request.formData();

    const text = resBody.get("text") as string;
    if (!text) {
        return NextResponse.json({ error: "Please provide a comment" }, { status: 404 });
    }

    const res = await validateComment(request);
    if (res.error) {
        return NextResponse.json({ error: res.error }, { status: 404 });
    }
    const { comment } = res;
    if (!comment) {
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const updatedComment = await updateCommentById(comment.id, text);
    const commentWithOwner = await db.comment.findUnique({
        where: { id: updatedComment?.id },
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

    return NextResponse.json(
        {
            data: {
                comment: commentWithOwner,
            },
            success: "Comment has been updated successfully",
        },
        { status: 200 }
    );
}
