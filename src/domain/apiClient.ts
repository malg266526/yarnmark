import { z } from 'zod';

export class ApiRequestError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown
  ) {
    super(`API request failed with status ${status}`);
  }
}

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PATCH';
  body?: unknown;
  token?: string;
}

const readJsonBody = async (response: Response): Promise<unknown> => {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
};

export const requestApi = async (url: string, { method = 'GET', body, token }: ApiRequestOptions = {}) => {
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    credentials: token ? 'include' : 'same-origin',
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const responseBody = await readJsonBody(response);

  if (!response.ok) {
    throw new ApiRequestError(response.status, responseBody);
  }

  return responseBody;
};

const submittedApplicationSchema = z.object({ submittedAt: z.string() });

export const resolveSubmittedAt = (responseBody: unknown): string => {
  const parsedBody = submittedApplicationSchema.safeParse(responseBody);

  return parsedBody.success ? parsedBody.data.submittedAt : new Date().toISOString();
};

export const applicationRecordsSchema = z.union([
  z.array(z.unknown()),
  z.object({ applications: z.array(z.unknown()) }).transform(({ applications }) => applications)
]);
