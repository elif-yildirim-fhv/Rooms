import { API_URL } from '@/config';

export type ApiResponse<Data = unknown> = {
  statusText: string;
  status?: number;
  data?: Data;
};

export default class ApiService {
  static async fetch<Data = unknown>(pathname: string, init?: RequestInit): Promise<ApiResponse<Data>> {
    let status, statusText, data;

    try {
      const url = new URL(pathname, API_URL);
      const response = await fetch(url, init);

      status = response.status;
      statusText = response.statusText;
      data = await response.json().catch(() => undefined);
    } catch (error: unknown) {
      if (error instanceof Error) {
        statusText = error.message; 
      } else {
        statusText = 'Unknown error occurred'; 
      }
    }

    return { status, statusText, data };
  }

  static post<Data = unknown>(pathname: string, body?: any): Promise<ApiResponse<Data>> {
    return ApiService.fetch<Data>(pathname, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}