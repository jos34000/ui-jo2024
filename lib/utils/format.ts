export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount)

export const formatPhase = (phase: string) =>
  phase.replace(/_/g, " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
