import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { commentId: string } }) {
    const { commentId } = params;

    if (!commentId) {
        return NextResponse.json({ error: "Please provide a commentId" }, { status: 404 });
    }

    const ownerId = await currentUserId();
    if (!ownerId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
    }

    const like = await db.like.create({
        data: {
            ownerId,
            commentId,
        },
    });

    return NextResponse.json(like, { status: 201 });
}
