const DEFAULT_BASE_URL =
  "https://ncat-hackathon-spring2026-odumf8kir-geocube101s-projects.vercel.app/api"

export type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  headers?: HeadersInit
}

export type ConnectPayload = Record<string, unknown>

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
  async function parseResponse<T>(response: Response): Promise<T> {
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

    return data as T
  }

  async function post<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options: RequestOptions = {},
  ): Promise<TResponse> {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      ...options,
      body: JSON.stringify(body),
    })

    return parseResponse<TResponse>(response)
  }

  return {
    post,
    connect<TResponse = unknown>(payload: ConnectPayload, options?: RequestOptions) {
      return post<TResponse, ConnectPayload>("/connect", payload, options)
    },
  }
}

export const apiClient = createApiClient()
