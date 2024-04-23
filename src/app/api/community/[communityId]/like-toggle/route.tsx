import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { communityId: string } }) {
    const ownerId = await currentUserId();
    const communityId = params.communityId;

    if (!ownerId) {
        return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }
    if (!communityId) {
        return NextResponse.json({ error: "Community not found" }, { status: 404 });
    }

    try {
        const like = await db.like.findFirst({
            where: {
                ownerId,
                communityId,
            },
        });

        if (like) {
            const liked = await db.like.delete({
                where: {
                    id: like.id,
                },
            });

            return NextResponse.json(
                {
                    data: liked,
                    success: true,
                    message: "Unlike community post",
                },
                { status: 200 }
            );
        }

        const liked = await db.like.create({
            data: {
                ownerId,
                communityId,
            },
        });

        revalidatePath("/community");
        return NextResponse.json(
            {
                data: liked,
                success: true,
                message: "Like community post",
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
