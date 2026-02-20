import { Sport, sports } from "@/lib/constants/sports-catalog"

export const getSportBySlug = (slug: string): Sport | undefined => {
  return sports.find(s => s.slug === slug)
}
