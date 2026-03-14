/**
 * Pump types: domain shape (camelCase) and API request/response (kebab-case).
 */

// -----------------------------------------------------------------------------
// Domain types (camelCase, for app code)
// -----------------------------------------------------------------------------

export type PumpStatusType = {
  pumpId: string
  temperature: number
  pressure: number
  flowRate: number
  rpm: number
  operationalHours: number
  requiresMaintenance: boolean
  loadPercent: number
  timestamp: number
  health: number
  isRunning: boolean
}

export type PumpListItem = {
  pumpId: string
  nState: number
}

// -----------------------------------------------------------------------------
// API: G /pump-status
// -----------------------------------------------------------------------------

export type PumpStatusRequest = {
  'pump-id': string // hex-str
}

export type PumpStatusResponse = {
  'pump-id': string
  temperature: number // °C
  pressure: number // Bar
  'flow-rate': number // CFM
  rpm: number
  'operational-hours': number // hrs
  'requires-maintenance': boolean
  'load-percent': number // ratio 0–1
  timestamp: number // Unix epoch
  health: number // ratio 0–1
  'is-running': boolean
}

// -----------------------------------------------------------------------------
// API: POST /pumps
// -----------------------------------------------------------------------------

export type PumpListEntry = {
  'pump-id': string
  'n-state': number // normalized estimated state, ratio 0–1
}

/** If the API returns a bare array at root, use PumpListEntry[] instead. */
export type PumpsResponse = {
  'pump-list': PumpListEntry[]
}

// -----------------------------------------------------------------------------
// API: POST /pump-start
// -----------------------------------------------------------------------------

export type PumpStartRequest = {
  'pump-id': string
  override: boolean
}

export type PumpStartResponse = {
  result: boolean
  'start-message': string
}

// -----------------------------------------------------------------------------
// API: POST /pump-stop
// -----------------------------------------------------------------------------

export type PumpStopRequest = {
  'pump-id': string
  override: boolean
}

export type PumpStopResponse = {
  result: boolean
  'start-message': string // API may use "stop-message" on server; adjust if needed
}
