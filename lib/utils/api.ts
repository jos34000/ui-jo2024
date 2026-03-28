import { resolveBackendErrorKey } from "@/lib/utils/apiErrors"

const API_BASE = "/api"
const PUBLIC_ENDPOINTS = ["/auth/", "/2fa/send", "/2fa/verify"]

let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null
let onRefreshFailure: (() => void) | null = null

export function configureApi(opts: { onRefreshFailure: () => void }): void {
  onRefreshFailure = opts.onRefreshFailure
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly i18nKey: string | undefined,
    public readonly rawMessage: string,
  ) {
    super(rawMessage)
    this.name = "ApiError"
  }
}

export interface ApiOptions {
  method?: string
  body?: unknown
  headers?: HeadersInit
  raw?: boolean
}

async function refreshTokens(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise
  }
  isRefreshing = true
  refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then(res => res.ok)
    .finally(() => {
      isRefreshing = false
      refreshPromise = null
    })
  return refreshPromise
}

async function doFetch(endpoint: string, options: ApiOptions): Promise<Response> {
  const { method = "GET", body, headers } = options
  return fetch(`${API_BASE}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

export async function api<T = unknown>(
  endpoint: string,
  options?: ApiOptions & { raw?: false },
): Promise<T>
export async function api(
  endpoint: string,
  options: ApiOptions & { raw: true },
): Promise<Response>
export async function api<T = unknown>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T | Response> {
  const { raw = false } = options
  let response = await doFetch(endpoint, options)

  if (
    (response.status === 401 || response.status === 403) &&
    !PUBLIC_ENDPOINTS.some(e => endpoint.includes(e))
  ) {
    const refreshed = await refreshTokens()
    if (refreshed) {
      response = await doFetch(endpoint, options)
    } else {
      onRefreshFailure?.()
      throw new ApiError(response.status, "sessionExpired", "Session expirée")
    }
  }

  if (raw) return response

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const rawMsg: string =
      body.message ??
      (Object.values(body).find(v => typeof v === "string") as string | undefined) ??
      "Une erreur est survenue"
    const i18nKey = resolveBackendErrorKey(rawMsg)
    throw new ApiError(response.status, i18nKey, rawMsg)
  }

  return response.json() as Promise<T>
}

export function resolveApiErrorMessage(
  error: ApiError,
  t: (key: string) => string,
  fallback: string,
): string {
  if (error.i18nKey) {
    try {
      return t(error.i18nKey)
    } catch {
      // key missing from messages — fall through
    }
  }
  return error.rawMessage || fallback
}
