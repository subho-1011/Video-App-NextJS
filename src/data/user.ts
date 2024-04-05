import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string | undefined) => {
    try {
        if (id === undefined) return null;

        return await db.user.findUnique({ where: { id } });
    } catch {
        return null;
    }
};
