import type { Pump } from "../components/AssetMonitoring"; // adjust path
const DEFAULT_BASE_URL = "https://iotaspheresystems.com/api"
console.log("API Base URL:", DEFAULT_BASE_URL)


export type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  headers?: HeadersInit
}

export class ApiClientError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = "ApiClientError"
    this.status = status
    this.data = data
  }
}

export function createApiClient(baseUrl = DEFAULT_BASE_URL) {
  async function parseResponse(response: Response) {
    const contentType = response.headers.get("content-type") ?? ""
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      const message =
        typeof data === "string"
          ? data
          : data && typeof data === "object" && "message" in data
            ? String(data.message)
            : `Request failed with status ${response.status}`

      throw new ApiClientError(message, response.status, data)
    }

    return data
  }

  async function post(path: string, body: unknown = {}, options: RequestOptions = {}) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      ...options,
      body: JSON.stringify(body),
    })

    return parseResponse(response)
  }

  async function getPumps(){
    return post("/pumps")
  }

  async function getPumpStatus(pumpId: string): Promise<Pump[]>  {
    return post("/pumps-status", { "pump-id": pumpId }) as Promise<Pump[]>
  }

  async function getAllPumpStatus(pumps: string[]) {
    const pumpStatusList = []
    for (const pumpId of pumps) {
      const status = await post(`/pump-status`, { "pump-id": pumpId })
      pumpStatusList.push(status)
    }
    return pumpStatusList
  }

  return {
    post,
    getPumps,
    getPumpStatus,
    getAllPumpStatus,
  }
}

export const apiClient = createApiClient()