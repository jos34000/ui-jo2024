import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value

  const publicPaths = ["/", "/auth", "/login", "/register"]
  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname.startsWith(path),
  )

  if (isPublicPath) {
    return NextResponse.next()
  }

  if (!accessToken) {
    const authUrl = new URL("/auth", request.url)
    authUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(authUrl)
  }

  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]))
    const expirationTime = payload.exp * 1000

    if (Date.now() >= expirationTime) {
      const authUrl = new URL("/auth", request.url)
      authUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(authUrl)
    }
  } catch {
    const authUrl = new URL("/auth", request.url)
    return NextResponse.redirect(authUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Protéger toutes les routes sauf :
     * - /auth (page de connexion/inscription)
     * - /api (routes API)
     * - /_next/static (fichiers statiques)
     * - /_next/image (images optimisées)
     * - /favicon.ico, /images/*, etc.
     */
    "/((?!auth|api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
}
