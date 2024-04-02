import { auth } from "@/auth";

export const currentUserId = async () => {
    const session = await auth();

    return session?.user?.id;
};
