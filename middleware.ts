// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const path = request.nextUrl.pathname

  // Paths that don't require authentication
  const publicPaths = [
    '/contentiaio/authentication',
    '/',
    '/blog',
    '/contentiaio'
  ]

  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/contentiaio/authentication', request.url))
  }

  try {
    const decoded: any = jwtDecode(token)
    
    // Admin-only routes
    if (path.startsWith('/admin') && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/contentiaio/authentication', request.url))
    }

    // Customer/User routes
    if (path.startsWith('/orders') && !['user', 'admin'].includes(decoded.role)) {
      return NextResponse.redirect(new URL('/contentiaio/authentication', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/contentiaio/authentication', request.url))
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/orders/:path*',
    '/contentiaio/authentication'
  ]
}