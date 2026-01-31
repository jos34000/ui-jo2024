import Link from "next/link";

const footerNavigation = {
  billetterie: [
    { name: "Tous les événements", href: "#" },
    { name: "Calendrier", href: "#" },
    { name: "Revente officielle", href: "#" },
    { name: "Pack famille", href: "#" },
  ],
  sports: [
    { name: "Athlétisme", href: "#" },
    { name: "Natation", href: "#" },
    { name: "Basketball", href: "#" },
    { name: "Football", href: "#" },
  ],
  infos: [
    { name: "À propos", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Accessibilité", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Conditions générales", href: "#" },
    { name: "Politique de confidentialité", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <OlympicRings className="h-8 w-auto" />
              <span className="font-bold text-xl font-mono">Paris 2024</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Billetterie officielle des Jeux Olympiques et Paralympiques de
              Paris 2024.
            </p>
            <div className="flex gap-1 pt-2">
              <div className="w-4 h-4 rounded-full bg-[#0081C8]" />
              <div className="w-4 h-4 rounded-full bg-foreground" />
              <div className="w-4 h-4 rounded-full bg-[#EE334E]" />
              <div className="w-4 h-4 rounded-full bg-[#FCB131]" />
              <div className="w-4 h-4 rounded-full bg-[#00A651]" />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Billetterie</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.billetterie.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Sports populaires</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.sports.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Informations</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.infos.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Légal</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">
            &copy; 2024 Comité d'Organisation des Jeux Olympiques et
            Paralympiques de Paris 2024. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

function OlympicRings({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 100 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15"
        cy="15"
        r="12"
        stroke="#0081C8"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="35"
        cy="15"
        r="12"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        className="text-foreground"
      />
      <circle
        cx="55"
        cy="15"
        r="12"
        stroke="#EE334E"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="25"
        cy="25"
        r="12"
        stroke="#FCB131"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="45"
        cy="25"
        r="12"
        stroke="#00A651"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
