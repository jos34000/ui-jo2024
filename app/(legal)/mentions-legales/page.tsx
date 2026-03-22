import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"

export default async function MentionsLegalesPage() {
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
          {t("mentions.title")}
        </h1>
        <p className="text-muted-foreground">{t("lastUpdated")}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.editor.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("mentions.editor.intro")}
        </p>
        <div className="not-prose bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">
            {t("mentions.editor.companyName")}
          </p>
          <p>{t("mentions.editor.companyType")}</p>
          <p>{t("mentions.editor.address")}</p>
          <p>{t("mentions.editor.siret")}</p>
          <p>{t("mentions.editor.tva")}</p>
          <p className="mt-2">
            <span className="font-medium text-foreground">
              {t("mentions.editor.directorLabel")} :{" "}
            </span>
            {t("mentions.editor.directorName")}
          </p>
          <p>
            <span className="font-medium text-foreground">
              {t("mentions.editor.emailLabel")} :{" "}
            </span>
            <a
              href="mailto:contact@infoevent.fr"
              className="text-primary hover:underline"
            >
              contact@infoevent.fr
            </a>
          </p>
          <p>
            <span className="font-medium text-foreground">
              {t("mentions.editor.phoneLabel")} :{" "}
            </span>
            +33 (0)1 XX XX XX XX
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.hosting.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("mentions.hosting.intro")}
        </p>
        <div className="not-prose bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Cloudflare, Inc.</p>
          <p>101 Townsend St</p>
          <p>San Francisco, CA 94107, USA</p>
          <p>
            <a
              href="https://www.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.cloudflare.com
            </a>
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.contact.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("mentions.contact.intro")}
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">
              {t("mentions.editor.emailLabel")} :{" "}
            </span>
            <a
              href="mailto:contact@infoevent.fr"
              className="text-primary hover:underline"
            >
              contact@infoevent.fr
            </a>
          </li>
          <li>
            <span className="font-medium text-foreground">
              {t("mentions.editor.phoneLabel")} :{" "}
            </span>
            +33 (0)1 XX XX XX XX
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.ip.title")}
        </h2>
        <h3 className="text-lg font-medium mb-3">
          {t("mentions.ip.copyright.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("mentions.ip.copyright.content")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("mentions.ip.brands.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("mentions.ip.brands.content")}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {t("mentions.ip.olympic")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.liability.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("mentions.liability.intro")}
        </p>
        <ul className="space-y-2 text-muted-foreground">
          {(t.raw("mentions.liability.items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.links.title")}
        </h2>
        <h3 className="text-lg font-medium mb-3">
          {t("mentions.links.outgoing.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("mentions.links.outgoing.content")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("mentions.links.incoming.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t("mentions.links.incoming.content")}{" "}
          <a
            href="mailto:contact@infoevent.fr"
            className="text-primary hover:underline"
          >
            contact@infoevent.fr
          </a>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.dataLink.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("mentions.dataLink.content")}{" "}
          <Link
            href="/confidentialite"
            className="text-primary hover:underline"
          >
            {t("mentions.dataLink.linkLabel")}
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.cookiesLink.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("mentions.cookiesLink.content")}{" "}
          <Link href="/cookies" className="text-primary hover:underline">
            {t("mentions.cookiesLink.linkLabel")}
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.law.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("mentions.law.content")}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("mentions.credits.title")}
        </h2>
        <h3 className="text-lg font-medium mb-3">
          {t("mentions.credits.dev.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("mentions.credits.dev.content")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("mentions.credits.photos.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t("mentions.credits.photos.content")}
        </p>
      </section>
    </article>
  )
}
