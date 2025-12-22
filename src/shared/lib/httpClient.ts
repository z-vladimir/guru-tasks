import { handleApiError } from '../utils';

export async function httpClient(
  path: string,
  initRequest?: RequestInit
): Promise<Response> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const url = `${BASE_URL}${path}`;

  const defaultHeaders = { 'Content-Type': 'application/json' };

  const headers = {
    ...defaultHeaders,
    ...(initRequest?.headers || {}),
  };
  try {
    const response = await fetch(url, { ...initRequest, headers });

    if (!response.ok) {
      const errorText = await response.text();

      console.error('[API ERROR]', {
        path: url,
        params: initRequest?.body,
        status: response.status,
        statusText: response.statusText,
        errorText,
      });

      handleApiError({
        path: url,
        params: initRequest?.body,
        message: errorText || response.statusText || 'Unknown error',
      });
    }

    return response;
  } catch (error: unknown) {
    console.error('[API ERROR]', {
      error,
      path: url,
      params: initRequest?.body,
    });

    handleApiError({
      path: url,
      params: initRequest?.body,
      message: error instanceof Error ? error.message : 'Network error',
    });
  }

  return undefined as never;
}
