import { NextRequest, NextResponse } from "next/server"
import { decodeJwt } from "jose"

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value
  if (!token) return NextResponse.json({ roles: [] })
  try {
    const payload = decodeJwt(token)
    return NextResponse.json({ roles: (payload.roles as string[]) ?? [] })
  } catch {
    return NextResponse.json({ roles: [] })
  }
}
