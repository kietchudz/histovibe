import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
    '/lesson(.*)',
    '/profile(.*)',
    '/dashboard(.*)',
]);

// Routes that should be public
const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/onboarding(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const currentPath = req.nextUrl.pathname;

    // If user is not logged in and trying to access protected route
    if (!userId && isProtectedRoute(req)) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
    }

    // If user is logged in, fetch fresh user data from Clerk API
    if (userId) {
        try {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            const publicMetadata = user.publicMetadata as { grade?: number; isOnboarded?: boolean } | undefined;
            const isOnboarded = publicMetadata?.isOnboarded;

            // If not onboarded and not on onboarding page, redirect to onboarding
            if (!isOnboarded && !currentPath.startsWith('/onboarding') && !currentPath.startsWith('/sign')) {
                return NextResponse.redirect(new URL('/onboarding', req.url));
            }

            // If already onboarded and trying to access onboarding, redirect to home
            if (isOnboarded && currentPath.startsWith('/onboarding')) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        } catch (error) {
            console.error('Error fetching user in middleware:', error);
            // On error, allow the request to proceed
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
