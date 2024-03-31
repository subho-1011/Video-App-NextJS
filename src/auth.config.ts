import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/user";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                if (credentials) {
                    const { email, password } = credentials;

                    if (!email && !password) {
                        return null;
                    }

                    const user = await getUserByEmail(email as string);
                    if (!user || !user.password) return null;

                    const passwordMatch = !!(await bcrypt.compare(
                        password as string,
                        user.password
                    ));

                    if (passwordMatch) return user;
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
