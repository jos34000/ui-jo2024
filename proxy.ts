import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { decodeJwt } from "jose"

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value
  const { pathname } = request.nextUrl

  const isPublicPath =
    pathname === "/" ||
    pathname === "/403" ||
    ["/auth", "/login", "/register", "/events"].some(path =>
      pathname.startsWith(path),
    )

  if (pathname.startsWith("/auth") && accessToken) {
    try {
      const payload = decodeJwt(accessToken)
      const expirationTime = (payload.exp ?? 0) * 1000
      if (Date.now() < expirationTime) {
        const roles = (payload.roles as string[]) ?? []
        const redirectPath = roles.includes("ROLE_ADMIN")
          ? "/admin"
          : roles.includes("ROLE_STAFF")
            ? "/staff"
            : "/"
        return NextResponse.redirect(new URL(redirectPath, request.url))
      }
    } catch {}
  }

  if (isPublicPath) {
    return NextResponse.next()
  }

  if (!accessToken) {
    const authUrl = new URL("/auth", request.url)
    authUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(authUrl)
  }

  try {
    const payload = decodeJwt(accessToken)
    const expirationTime = (payload.exp ?? 0) * 1000

    if (Date.now() >= expirationTime) {
      const authUrl = new URL("/auth", request.url)
      authUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(authUrl)
    }

    // Protect /admin — requires ROLE_ADMIN
    if (pathname.startsWith("/admin")) {
      const roles = (payload.roles as string[]) ?? []
      if (!roles.includes("ROLE_ADMIN")) {
        return NextResponse.redirect(new URL("/403", request.url))
      }
    }

    // Protect /staff — requires ROLE_STAFF
    if (pathname.startsWith("/staff")) {
      const roles = (payload.roles as string[]) ?? []
      if (!roles.includes("ROLE_STAFF")) {
        return NextResponse.redirect(new URL("/403", request.url))
      }
    }
  } catch {
    const authUrl = new URL("/auth", request.url)
    return NextResponse.redirect(authUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!auth|api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
}
