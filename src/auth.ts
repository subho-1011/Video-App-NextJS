import { db } from "@/lib/db";

import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log(user);
            return true;
        },
        async session({ session, token }) {
            console.log("Session: ", session);

            if(token.sub && session.user) {
                session.user.id = token.sub;
            }

            if(session.user){
                session.user.name = token.name;
                session.user.email = token.email as string;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await db.user.findUnique({
                where: { id: token.sub },
            });
            if (!existingUser) return token;

            token.name = existingUser.name;
            token.email = existingUser.email;

            console.log(token);
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
