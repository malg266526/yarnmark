import { z } from 'zod';

export type AdminAuthState = 'initializing' | 'signedOut' | 'verifying' | 'authenticated' | 'pendingApproval' | 'error';

export interface AdminSession {
  token: string;
  user: unknown;
}

export type AdminLoginResult =
  | { status: 'authenticated'; session: AdminSession }
  | { status: 'pendingApproval' }
  | { status: 'error' };

const adminLoginSuccessSchema = z.object({ token: z.string().min(1), user: z.unknown() });

export const resolveAdminLoginResponse = (httpStatus: number, body: unknown): AdminLoginResult => {
  if (httpStatus === 403) {
    return { status: 'pendingApproval' };
  }

  if (httpStatus < 200 || httpStatus >= 300) {
    return { status: 'error' };
  }

  const parsedBody = adminLoginSuccessSchema.safeParse(body);

  return parsedBody.success
    ? { status: 'authenticated', session: { token: parsedBody.data.token, user: parsedBody.data.user } }
    : { status: 'error' };
};

const adminSessionUserSchema = z.object({ permissions: z.array(z.string()) });

export const resolveAdminPermissions = (session: AdminSession | null): string[] => {
  const parsedUser = adminSessionUserSchema.safeParse(session?.user);

  return parsedUser.success ? parsedUser.data.permissions : [];
};

export const hasAdminPermission = (permissions: string[], requiredPermission?: string): boolean =>
  requiredPermission === undefined || permissions.includes(requiredPermission);

const jwtPayloadSchema = z.object({ exp: z.number() });

const getTokenExpiryMs = (token: string): number | null => {
  const encodedPayload = token.split('.')[1];

  if (!encodedPayload) {
    return null;
  }

  try {
    const payloadJson = atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/'));
    const parsedPayload = jwtPayloadSchema.safeParse(JSON.parse(payloadJson));

    return parsedPayload.success ? parsedPayload.data.exp * 1000 : null;
  } catch {
    return null;
  }
};

export const parseStoredAdminSession = (rawValue: string | null, nowMs: number): AdminSession | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsedSession = adminLoginSuccessSchema.safeParse(JSON.parse(rawValue));

    if (!parsedSession.success) {
      return null;
    }

    const expiryMs = getTokenExpiryMs(parsedSession.data.token);

    if (expiryMs !== null && expiryMs <= nowMs) {
      return null;
    }

    return { token: parsedSession.data.token, user: parsedSession.data.user };
  } catch {
    return null;
  }
};
