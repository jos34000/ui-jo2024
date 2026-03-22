import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CookieSettingsButton } from "@/components/CookieBanner"
import { getTranslations } from "next-intl/server"

export default async function CookiesPage() {
  const t = await getTranslations("legal")

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <Button variant="ghost" size="sm" className="mb-8 -ml-2" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backHome")}
        </Link>
      </Button>

      <header className="not-prose mb-12">
        <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">
          {t("badge")}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
          {t("cookies.title")}
        </h1>
        <p className="text-muted-foreground">{t("lastUpdated")}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("cookies.whatIs.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("cookies.whatIs.content1")}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {t("cookies.whatIs.content2")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("cookies.types.title")}
        </h2>

        <h3 className="text-lg font-medium mb-3">
          {t("cookies.types.necessary.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("cookies.types.necessary.content")}
        </p>
        <div className="not-prose bg-muted/50 rounded-lg p-4 text-sm mb-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-medium text-foreground">
                  {t("cookies.table.name")}
                </th>
                <th className="text-left py-2 font-medium text-foreground">
                  {t("cookies.table.purpose")}
                </th>
                <th className="text-left py-2 font-medium text-foreground">
                  {t("cookies.table.duration")}
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">jo2024-auth</td>
                <td className="py-2 pr-4">{t("cookies.table.rows.auth")}</td>
                <td className="py-2">{t("cookies.table.rows.authDuration")}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">jo2024-cart</td>
                <td className="py-2 pr-4">{t("cookies.table.rows.cart")}</td>
                <td className="py-2">{t("cookies.table.rows.cartDuration")}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">jo2024-cookies</td>
                <td className="py-2 pr-4">{t("cookies.table.rows.consent")}</td>
                <td className="py-2">
                  {t("cookies.table.rows.consentDuration")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">
          {t("cookies.types.analytics.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("cookies.types.analytics.content")}
        </p>
        <div className="not-prose bg-muted/50 rounded-lg p-4 text-sm mb-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-medium text-foreground">
                  {t("cookies.table.name")}
                </th>
                <th className="text-left py-2 font-medium text-foreground">
                  {t("cookies.table.purpose")}
                </th>
                <th className="text-left py-2 font-medium text-foreground">
                  {t("cookies.table.duration")}
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">_cf_bm</td>
                <td className="py-2 pr-4">{t("cookies.table.rows.cfbm")}</td>
                <td className="py-2">30 min</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">_cflb</td>
                <td className="py-2 pr-4">{t("cookies.table.rows.cflb")}</td>
                <td className="py-2">{t("cookies.table.rows.cflbDuration")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">
          {t("cookies.types.marketing.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("cookies.types.marketing.content")}
        </p>

        <h3 className="text-lg font-medium mb-3">
          {t("cookies.types.preferences.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t("cookies.types.preferences.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("cookies.management.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("cookies.management.intro")}
        </p>
        <div className="not-prose mb-6">
          <CookieSettingsButton />
        </div>

        <h3 className="text-lg font-medium mb-3">
          {t("cookies.management.browser.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("cookies.management.browser.content")}
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("cookies.refusal.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("cookies.refusal.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("cookies.thirdParty.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("cookies.thirdParty.content")}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("cookies.contact.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("cookies.contact.content")}{" "}
          <a
            href="mailto:dpo@infoevent.fr"
            className="text-primary hover:underline"
          >
            dpo@infoevent.fr
          </a>
        </p>
      </section>
    </article>
  )
}
