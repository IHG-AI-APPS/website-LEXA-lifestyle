import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // WWW Canonicalization - redirect www to non-www (or vice versa)
  // This handles the "www resolve" issue from the audit
  if (hostname.startsWith('www.')) {
    const nonWwwHost = hostname.replace('www.', '')
    url.host = nonWwwHost
    return NextResponse.redirect(url, 301)
  }
  
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto')
    if (proto === 'http') {
      url.protocol = 'https:'
      return NextResponse.redirect(url, 301)
    }
  }
  
  return NextResponse.next()
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
}
