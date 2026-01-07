import { NextResponse } from 'next/server';

export async function middleware(request) {
    try {
        const authToken = await request.cookies.get("userToken")?.value;
        const pathname = request.nextUrl.pathname;

        // Define public routes (routes that don't require authentication)
        const publicRoutes = [
            '/',
            '/login',
            '/contact',
            '/about',
            '/gallery',
            '/career',
            '/services/maintenance',
            '/services/manufacturing',
            '/services/engineering'
        ];
        
        const isPublicRoute = publicRoutes.includes(pathname);
        // console.log("pathname:", pathname, "isPublicRoute:", isPublicRoute);

        // If user is logged in and tries to access public routes
        if (authToken && isPublicRoute) {
            console.log('Logged in user trying to access public routes. Redirecting to admin-dashboard');
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }

        // If user is not logged in and tries to access protected routes
        if (!authToken && !isPublicRoute) {
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
        '/',
        '/login',
        '/contact',
        '/about',
        '/gallery',
        '/career',
        '/services/:path*',
        '/admin-dashboard/:path*'
    ],
};