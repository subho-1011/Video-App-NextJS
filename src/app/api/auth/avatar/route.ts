import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import { bufferFile } from "@/lib/write-buffer-file";
import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function PATCH(request: NextRequest) {
    const userId = await currentUserId();
    if (!userId) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const avatar = formData.get("avatar");
    if (!avatar) {
        return NextResponse.json(
            { error: "Avatar not found" },
            { status: 404 }
        );
    }

    const avatarLocalPath = await bufferFile(avatar as File);
    const avatarData = await uploadImageToCloudinary(
        avatarLocalPath,
        "video-app/avatars"
    );

    if (!avatarData) {
        return NextResponse.json(
            { error: "Avatar upload failed" },
            { status: 404 }
        );
    }

    const user = await db.user.update({
        where: { id: userId },
        data: {
            image: avatarData.secure_url as string,
        },
    });

    if (!user) {
        return NextResponse.json(
            { error: "Avatar update failed" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { data: user, success: "Avatar updated" },
        { status: 200 }
    );
}
