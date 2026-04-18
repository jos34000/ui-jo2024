export function getRedirectByRoles(roles: string[]): string {
  if (roles.includes("ROLE_ADMIN")) return "/admin"
  if (roles.includes("ROLE_STAFF")) return "/staff"
  return "/"
}

export async function fetchRolesAndRedirect(): Promise<void> {
  const res = await fetch("/api/session")
  const { roles } = await res.json()
  window.location.href = getRedirectByRoles(roles)
}
