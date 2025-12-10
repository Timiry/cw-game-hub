import { HubError } from "@/shared/lib/api/HubError";

const BASE_INIT: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

async function parseErrorResponse(response: Response) {
  try {
    const data = await response.json();
    return {
      status: data.status || response.status,
      message: data.message || response.statusText,
    };
  } catch {
    return { status: response.status, message: response.statusText };
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await parseErrorResponse(response);
    throw new HubError({ status: errorData.status });
  }

  try {
    return await response.json();
  } catch {
    return Promise.resolve() as Promise<T>;
  }
}

const api = {
  async get<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, { ...BASE_INIT, ...init });
    return handleResponse<T>(response);
  },

  async post<T, U = unknown>(url: string, data: U): Promise<T> {
    const response = await fetch(url, {
      ...BASE_INIT,
      method: "POST",
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },
};

export default api;
