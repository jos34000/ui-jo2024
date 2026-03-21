"use client"

import { useMessages } from "next-intl"

export const useTranslateSport = () => {
  const messages = useMessages()
  return (name: string): string => {
    const map = (messages as Record<string, unknown>).sportNames as Record<string, string> | undefined
    return map?.[name] ?? name
  }
}

export const useTranslatePhase = () => {
  const messages = useMessages()
  return (phase: string): string => {
    const map = (messages as Record<string, unknown>).phases as Record<string, string> | undefined
    return map?.[phase] ?? phase
  }
}

export const useTranslateOffer = () => {
  const messages = useMessages()
  return (name: string): string => {
    const map = (messages as Record<string, unknown>).offerNames as Record<string, string> | undefined
    return map?.[name] ?? name
  }
}

export const useTranslateOfferDescription = () => {
  const messages = useMessages()
  return (offerName: string): string => {
    const map = (messages as Record<string, unknown>).offerDescriptions as Record<string, string> | undefined
    return map?.[offerName] ?? offerName
  }
}

export const useTranslateOfferFeature = () => {
  const messages = useMessages()
  return (feature: string): string => {
    const map = (messages as Record<string, unknown>).offerFeatures as Record<string, string> | undefined
    return map?.[feature] ?? feature
  }
}
