import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"

export default async function ConditionsUtilisationPage() {
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
          {t("terms.title")}
        </h1>
        <p className="text-muted-foreground">{t("lastUpdated")}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.object.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("terms.object.content1")}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.object.content2")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.definitions.title")}
        </h2>
        <ul className="space-y-3 text-muted-foreground">
          {(
            t.raw("terms.definitions.items") as {
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
          {t("terms.access.title")}
        </h2>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.access.conditions.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("terms.access.conditions.content")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.access.account.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("terms.access.account.content1")}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.access.account.content2")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.purchase.title")}
        </h2>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.purchase.process.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("terms.purchase.process.content")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.purchase.price.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("terms.purchase.price.content")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.purchase.confirmation.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.purchase.confirmation.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.ticketUse.title")}
        </h2>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.ticketUse.nominal.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("terms.ticketUse.nominal.content")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.ticketUse.access.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.ticketUse.access.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.cancellation.title")}
        </h2>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.cancellation.withdrawal.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("terms.cancellation.withdrawal.content")}
        </p>
        <h3 className="text-lg font-medium mb-3">
          {t("terms.cancellation.byOrganizer.title")}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.cancellation.byOrganizer.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.liability.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t("terms.liability.content1")}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.liability.content2")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.ip.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.ip.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.changes.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.changes.content")}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.law.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.law.content")}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold font-mono mb-4">
          {t("terms.contact.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("terms.contact.content")}{" "}
          <a
            href="mailto:contact@infoevent.fr"
            className="text-primary hover:underline"
          >
            contact@infoevent.fr
          </a>
        </p>
      </section>
    </article>
  )
}
