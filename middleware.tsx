import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (request.cookies.has("signInWithRedirect")) {
            return NextResponse.redirect(new URL('/signInRedirectResult', request.url))
        }
    } else if (request.nextUrl.pathname.startsWith('/signInRedirectResult')) {
        if (!request.cookies.has("signInWithRedirect")) {
            return NextResponse.redirect(new URL('/redirection', request.url));
        }
    }
    else if (request.nextUrl.pathname.startsWith('/callbackEndpoint')) {
        if (!request.cookies.has("antiCsrfToken")) {
            return NextResponse.redirect(new URL('/redirection', request.url));
        }
    }
}

export const config = {
    matcher: ['/login', '/signInRedirectResult', '/callbackEndpoint']
}