import { z } from 'zod';

const YARNMARK_API_ORIGIN = 'https://yarnmark-api.com';

export class ApiRequestError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown
  ) {
    super(`API request failed with status ${status}`);
  }
}

interface ApiRequestOptions {
  method?: 'DELETE' | 'GET' | 'POST' | 'PATCH';
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

export const resolveApiAssetUrl = (path: string | null | undefined): string | null => {
  const normalizedPath = path?.trim().replace(/^\/+/, '');

  return normalizedPath ? `${YARNMARK_API_ORIGIN}/${normalizedPath}` : null;
};

export const applicationRecordsSchema = z.union([
  z.array(z.unknown()),
  z.object({ applications: z.array(z.unknown()) }).transform(({ applications }) => applications)
]);

const BACKEND_PENDING_STATUS = 'pending';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const unwrapSubmissions = (responseBody: unknown): unknown =>
  isRecord(responseBody) && 'submissions' in responseBody ? responseBody.submissions : responseBody;

export const normalizeBackendApplicationRecord = (record: unknown, defaultStatus: string): unknown => {
  if (!isRecord(record)) {
    return record;
  }

  return {
    ...record,
    logoFileName: record.logoFileName ?? record.logoOriginalFilename,
    status: record.status === BACKEND_PENDING_STATUS ? defaultStatus : record.status,
    submittedAt: record.submittedAt ?? record.createdAt
  };
};
