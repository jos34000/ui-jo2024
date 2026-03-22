import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "fr"
  const resolvedLocale = ["fr", "en", "de", "es"].includes(locale) ? locale : "fr"

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  }
})
