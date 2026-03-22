export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount)
