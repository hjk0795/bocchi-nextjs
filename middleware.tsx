import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/login')) {
        const isSignInWithRedirect = request.cookies.get('signInWithRedirect')?.value;

        if (isSignInWithRedirect === "true") {
            return NextResponse.redirect(new URL('/signInRedirectResult', request.url))
        }
    }
}

export const config = {
    matcher: '/login',
}