import { NextResponse } from 'next/server';

export async function middleware(request) {
    try {
        const authToken = await request.cookies.get("userToken")?.value;
        // const isScreenshotRequest = request.headers.get('x-screenshot') === 'true';
        const pathname = request.nextUrl.pathname;

        // Define authentication routes
        const authRoutes = ['/', '/login'];
        const isAuthRoute = authRoutes.includes(pathname);

        // If user is logged in (has auth token) and tries to access auth routes
        if (authToken && isAuthRoute) {
            console.log('Logged in user trying to access auth routes. Redirecting to admin-dashboard');
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }

        // If user is not logged in and tries to access protected routes
        if (!authToken && !isAuthRoute) {
            console.log('Unauthorized user. Redirecting to login');
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware Error:', error);
        return NextResponse.redirect(new URL('/error', request.url));
    }
}

export const config = {
    matcher: [
        '/login',
        '/admin-dashboard/:path*'
    ],
};