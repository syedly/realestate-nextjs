import { clerkMiddleware } from "@clerk/nextjs/server";

// Make all routes public so pages like /dashboard and /saved
// always render, without checking if the user is signed in.
export default clerkMiddleware();

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
