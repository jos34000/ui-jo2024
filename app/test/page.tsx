"use client"

import { apiClient } from "@/lib/utils/apiClient"
import { useState } from "react"
import { eventsCatalog } from "@/lib/constants/events-catalog"

export default function ImportEventsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImport = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await apiClient("/events/bulk", {
        method: "POST",
        body: JSON.stringify(eventsCatalog),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message ||
            `Erreur ${response.status}: ${response.statusText}`,
        )
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Import des événements JO Paris 2024
          </h1>

          <div className="mb-6 rounded-md bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              {"Cette page permet d'importer en masse les "}
              {eventsCatalog.length} événements des Jeux Olympiques de Paris
              2024.
            </p>
            <p className="mt-2 text-sm text-blue-700">
              {
                "⚠️ Vous devez être connecté en tant quadmin pour effectuer cette"
              }
              action.
            </p>
          </div>

          <button
            onClick={handleImport}
            disabled={isLoading}
            className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? "Import en cours..." : "Importer les événements"}
          </button>

          {/* Résultat */}
          {result && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-green-700">
                ✅ Import réussi
              </h2>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Créés</p>
                  <p className="text-2xl font-bold text-green-700">
                    {result.created}
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="text-sm text-gray-600">Ignorés</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {result.skipped}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {eventsCatalog.length}
                  </p>
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Réponse complète :
              </h3>
              <pre className="overflow-auto rounded-lg bg-gray-800 p-4 text-sm text-green-400">
                {JSON.stringify(result, null, 2)}
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

          {/* Aperçu des données */}
          <div className="mt-8">
            <details className="cursor-pointer">
              <summary className="text-lg font-semibold text-gray-700">
                📋 Aperçu des données à importer ({eventsCatalog.length}{" "}
                événements)
              </summary>
              <pre className="mt-4 overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-700">
                {JSON.stringify(eventsCatalog, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
