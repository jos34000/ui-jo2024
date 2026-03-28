import type { ErrorKey } from "./registry"

export type AppErrorSource = "backend" | "validation" | "ui"

export interface AppError<S extends AppErrorSource = AppErrorSource> {
  readonly source: S
  readonly key: ErrorKey
  readonly raw?: string
}

export type BackendError = AppError<"backend">
export type ValidationError = AppError<"validation">
export type UIError = AppError<"ui">
