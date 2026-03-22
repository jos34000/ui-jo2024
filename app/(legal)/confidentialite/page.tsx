import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"

export default async function ConfidentialitePage() {
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
          {t("privacy.title")}
        </h1>
        <p className="text-muted-foreground">{t("lastUpdated")}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.intro.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.intro.content1")}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {t("privacy.intro.content2")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.controller.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.controller.intro")}
        </p>
        <div className="not-prose bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">ESN InfoEvent</p>
          <p>Société par actions simplifiée (SAS)</p>
          <p>42 Avenue de la République, 75011 Paris, France</p>
          <p>SIRET : 123 456 789 00015</p>
          <p className="mt-2">
            <span className="font-medium text-foreground">DPO : </span>
            <a
              href="mailto:dpo@infoevent.fr"
              className="text-primary hover:underline"
            >
              dpo@infoevent.fr
            </a>
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.collected.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.collected.intro")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("privacy.collected.identity.title")}
        </h3>
        <ul className="space-y-2 text-muted-foreground mb-4">
          {(t.raw("privacy.collected.identity.items") as string[]).map(
            (item, i) => (
              <li key={i}>{item}</li>
            ),
          )}
        </ul>
        <h3 className="text-lg font-medium mb-3">
          {t("privacy.collected.transaction.title")}
        </h3>
        <ul className="space-y-2 text-muted-foreground mb-4">
          {(t.raw("privacy.collected.transaction.items") as string[]).map(
            (item, i) => (
              <li key={i}>{item}</li>
            ),
          )}
        </ul>
        <h3 className="text-lg font-medium mb-3">
          {t("privacy.collected.technical.title")}
        </h3>
        <ul className="space-y-2 text-muted-foreground">
          {(t.raw("privacy.collected.technical.items") as string[]).map(
            (item, i) => (
              <li key={i}>{item}</li>
            ),
          )}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.purpose.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.purpose.intro")}
        </p>
        <ul className="space-y-2 text-muted-foreground">
          {(t.raw("privacy.purpose.items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.legalBasis.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.legalBasis.intro")}
        </p>
        <ul className="space-y-3 text-muted-foreground">
          {(
            t.raw("privacy.legalBasis.items") as {
              term: string
              definition: string
            }[]
          ).map((item, i) => (
            <li key={i}>
              <strong className="text-foreground">{item.term} : </strong>
              {item.definition}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.retention.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.retention.intro")}
        </p>
        <ul className="space-y-2 text-muted-foreground">
          {(t.raw("privacy.retention.items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.recipients.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.recipients.intro")}
        </p>
        <ul className="space-y-2 text-muted-foreground">
          {(t.raw("privacy.recipients.items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.transfers.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("privacy.transfers.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.rights.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.rights.intro")}
        </p>
        <ul className="space-y-3 text-muted-foreground mb-4">
          {(
            t.raw("privacy.rights.items") as {
              term: string
              definition: string
            }[]
          ).map((item, i) => (
            <li key={i}>
              <strong className="text-foreground">{item.term} : </strong>
              {item.definition}
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          {t("privacy.rights.contact")}{" "}
          <a
            href="mailto:dpo@infoevent.fr"
            className="text-primary hover:underline"
          >
            dpo@infoevent.fr
          </a>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.security.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("privacy.security.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.cookiesLink.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("privacy.cookiesLink.content")}{" "}
          <Link href="/cookies" className="text-primary hover:underline">
            {t("privacy.cookiesLink.linkLabel")}
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("privacy.contact.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("privacy.contact.content")}{" "}
          <a
            href="mailto:dpo@infoevent.fr"
            className="text-primary hover:underline"
          >
            dpo@infoevent.fr
          </a>
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {t("privacy.contact.cnil")}{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            www.cnil.fr
          </a>
        </p>
      </section>
    </article>
  )
}
