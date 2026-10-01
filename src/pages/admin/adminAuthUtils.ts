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
