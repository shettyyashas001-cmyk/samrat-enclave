import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import crypto from 'crypto'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    if (authValue) {
      try {
        const [user, pwd] = atob(authValue).split(':')
        const validUser = 'admin'
        const validPass = process.env.ADMIN_PASSWORD || 'samrat123'

        // Constant-time string comparison manually implemented for Edge Runtime compatibility
        // (as crypto.timingSafeEqual requires Node.js Buffer APIs not always available in Edge)
        const secureCompare = (a: string, b: string) => {
          if (a.length !== b.length) return false;
          let mismatch = 0;
          for (let i = 0; i < a.length; i++) {
            mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
          }
          return mismatch === 0;
        }

        if (secureCompare(user, validUser) && secureCompare(pwd, validPass)) {
          return NextResponse.next()
        }
      } catch (e) {
        console.error('Error decoding basic auth string')
      }
    }
  }

  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
    },
  })
}

// Match all routes that start with /admin or /api/admin
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
