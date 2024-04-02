/**
 * An array of routes that are accessible to the public
 * These routes do not need to be authenticated
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are accessible to the private
 * These routes need to be authenticated
 * @type {string[]}
 */

export const privateRoutes = ["/profile", "/videos/add-video"];

/**
 * An array of routes that are user for authenticated
 * These routes will be redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
