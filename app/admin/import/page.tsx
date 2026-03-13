"use client"

import { apiClient } from "@/lib/utils/apiClient"
import { useState } from "react"
import { eventsSeed } from "@/lib/constants/events-catalog"
import { offersCatalog } from "@/lib/constants/offers-catalog"
import { Button } from "@/components/ui/button"
import { sportsSeed } from "@/lib/constants/sports-catalog"
import Link from "next/link"

export default function ImportEventsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [eventResult, setEventResult] = useState<any>(null)
  const [offerResult, setOfferResult] = useState<any>(null)
  const [sportResult, setSportResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImportEvents = async () => {
    setIsLoading(true)
    setError(null)
    setEventResult(null)

    try {
      const response = await apiClient("/events/bulk", {
        method: "POST",
        body: JSON.stringify(eventsSeed),
      })

      if (!response.ok) {
        console.log(response)
      }

      const data = await response.json()
      setEventResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImportOfferTypes = async () => {
    setIsLoading(true)
    setError(null)
    setOfferResult(null)

    try {
      const response = await apiClient("/offer/bulk", {
        method: "POST",
        body: JSON.stringify(offersCatalog),
      })

      if (!response.ok) {
        setError("Erreur")
        console.log(response)
      }

      const data = await response.json()
      setOfferResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImportSports = async () => {
    setIsLoading(true)
    setError(null)
    setOfferResult(null)

    try {
      const response = await apiClient("/sport/bulk", {
        method: "POST",
        body: JSON.stringify(sportsSeed),
      })

      if (!response.ok) {
        setError("Erreur")
        console.log(response)
      }

      const data = await response.json()
      setSportResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <Button>
          <Link href="/">Home</Link>
        </Button>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Import des données des JO Paris 2024
          </h1>

          <div className="mb-6 rounded-md bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              {"Cette page permet d'importer en masse les "}
              {eventsSeed.length} événements des Jeux Olympiques de Paris 2024.
            </p>
            <p className="mt-2 text-sm text-blue-700">
              {
                "⚠️ Vous devez être connecté en tant quadmin pour effectuer cette"
              }
              action.
            </p>
          </div>
          <div className="space-x-2">
            <Button
              onClick={handleImportEvents}
              disabled={isLoading}
              className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isLoading ? "Import en cours..." : "Importer les événements"}
            </Button>
            <Button
              onClick={handleImportOfferTypes}
              disabled={isLoading}
              className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isLoading ? "Import en cours..." : "Importer les offres"}
            </Button>
            <Button
              onClick={handleImportSports}
              disabled={isLoading}
              className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isLoading ? "Import en cours..." : "Importer les sports"}
            </Button>
          </div>

          {/* Résultat */}
          {eventResult && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-green-700">
                ✅ Import réussi
              </h2>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Créés</p>
                  <p className="text-2xl font-bold text-green-700">
                    {eventResult.created}
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="text-sm text-gray-600">Ignorés</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {eventResult.skipped}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {eventsSeed.length}
                  </p>
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Réponse complète :
              </h3>
              <pre className="overflow-auto rounded-lg bg-gray-800 p-4 text-sm text-green-400">
                {JSON.stringify(eventResult, null, 2)}
              </pre>
            </div>
          )}
          {offerResult && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-green-700">
                ✅ Import réussi
              </h2>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Créés</p>
                  <p className="text-2xl font-bold text-green-700">
                    {offerResult.created}
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="text-sm text-gray-600">Ignorés</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {offerResult.skipped}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {offersCatalog.length}
                  </p>
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Réponse complète :
              </h3>
              <pre className="overflow-auto rounded-lg bg-gray-800 p-4 text-sm text-green-400">
                {JSON.stringify(offerResult, null, 2)}
              </pre>
            </div>
          )}
          {sportResult && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-green-700">
                ✅ Import réussi
              </h2>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Créés</p>
                  <p className="text-2xl font-bold text-green-700">
                    {sportResult.created}
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="text-sm text-gray-600">Ignorés</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {sportResult.skipped}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {sportsSeed.length}
                  </p>
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Réponse complète :
              </h3>
              <pre className="overflow-auto rounded-lg bg-gray-800 p-4 text-sm text-green-400">
                {JSON.stringify(sportResult, null, 2)}
              </pre>
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-red-700">
                ❌ Erreur
              </h2>
              <pre className="overflow-auto rounded-lg bg-red-50 p-4 text-sm text-red-800">
                {error}
              </pre>
            </div>
          )}

          <div className="mt-8">
            <details className="cursor-pointer">
              <summary className="text-lg font-semibold text-gray-700">
                📋 Aperçu des données à importer ({eventsSeed.length}{" "}
                événements)
              </summary>
              <pre className="mt-4 overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-700">
                {JSON.stringify(eventsSeed, null, 2)}
              </pre>
            </details>
          </div>
          <div className="mt-8">
            <details className="cursor-pointer">
              <summary className="text-lg font-semibold text-gray-700">
                📋 Aperçu des données à importer ({offersCatalog.length} offer
                types)
              </summary>
              <pre className="mt-4 overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-700">
                {JSON.stringify(offersCatalog, null, 2)}
              </pre>
            </details>
          </div>
          <div className="mt-8">
            <details className="cursor-pointer">
              <summary className="text-lg font-semibold text-gray-700">
                📋 Aperçu des données à importer ({sportsSeed.length} sports)
              </summary>
              <pre className="mt-4 overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-700">
                {JSON.stringify(sportsSeed, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
