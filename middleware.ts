import { type NextRequest, NextResponse } from "next/server"

const PROTECTED_PATHS = ["/checkout", "/confirmation", "/billets", "/admin"]
const AUTH_REDIRECT_PATHS = ["/auth"]

export default function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl
  const authenticated = req.cookies.has("access_token")

  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))
  const isAuthPage = AUTH_REDIRECT_PATHS.some(p => pathname.startsWith(p))

  if (isProtected && !authenticated) {
    const loginUrl = new URL("/auth", req.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthPage && authenticated) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
