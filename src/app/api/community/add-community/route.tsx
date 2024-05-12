import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { bufferFile } from "@/lib/write-buffer-file";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const ownerId = await currentUserId();
    if (!ownerId) {
        return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const resBody = await request.formData();
    const text = resBody.get("text") as string;
    const image = resBody.get("image");

    let imageUrl = null;

    if (image && image !== "undefined") {
        console.log("image: ", image);
        const imageLocalPath = await bufferFile(image as File);
        const imageData = await uploadImageToCloudinary(imageLocalPath, "community/images");

        if (imageData) {
            imageUrl = imageData.secure_url;
        }
    }

    try {
        const addCommunityResponse = await db.community.create({
            data: {
                ownerId,
                text: text.trim(),
                imageUrl,
            },
        });

        if (!addCommunityResponse) {
            return NextResponse.json({ error: "Community create failed" }, { status: 500 });
        }

        const community = await db.community.findUnique({
            where: {
                id: addCommunityResponse.id,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                    },
                },
                likes: true,
                comments: true,
            },
        });

        return NextResponse.json(
            {
                data: community,
                success: true,
                message: "Community added successfully",
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
