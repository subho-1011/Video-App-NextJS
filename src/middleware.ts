import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import { authRoutes, privateRoutes } from "./route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPrivateRoute =
        privateRoutes.includes(nextUrl.pathname) ||
        nextUrl.pathname.startsWith("/profile");

    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    if (isPrivateRoute && !isLoggedIn) {
        let callbackUrl = nextUrl.pathname;

        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return NextResponse.redirect(
            new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
    }
});

// export function middleware(request: NextRequest) {
//     const { nextUrl } = request;
//     console.log(nextUrl);

//     const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//     return NextResponse.next();
// }

const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
