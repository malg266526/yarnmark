import { z } from 'zod';
import { requestApi } from '../apiClient.ts';
import { ADMIN_USERS_API_URL } from './adminUsersConstants.ts';
import type { AdminUser, AdminUserPermission } from './adminUsersTypes.ts';

const adminUserRecordsSchema = z.union([
  z.array(z.unknown()),
  z.object({ users: z.array(z.unknown()) }).transform(({ users }) => users)
]);

const adminUserRecordSchema = z.object({
  id: z.string(),
  googleId: z.string(),
  email: z.string(),
  permissions: z.array(z.string()),
  status: z.string().min(1),
  createdAt: z.string()
});

export const parseAdminUsers = (responseBody: unknown): AdminUser[] => {
  const adminUserRecords = adminUserRecordsSchema.safeParse(responseBody);

  if (!adminUserRecords.success) {
    return [];
  }

  return adminUserRecords.data.flatMap((adminUserRecord) => {
    const parsedAdminUser = adminUserRecordSchema.safeParse(adminUserRecord);

    return parsedAdminUser.success ? [parsedAdminUser.data] : [];
  });
};

export const listAdminUsers = async (token: string): Promise<AdminUser[]> =>
  parseAdminUsers(await requestApi(ADMIN_USERS_API_URL, { token }));

export const approveAdminUser = async (
  token: string,
  userId: string,
  permissions: AdminUserPermission[]
): Promise<void> => {
  await requestApi(`${ADMIN_USERS_API_URL}/${encodeURIComponent(userId)}/approve`, {
    method: 'POST',
    body: { permissions },
    token
  });
};

export const revokeAdminUser = async (token: string, userId: string): Promise<void> => {
  await requestApi(`${ADMIN_USERS_API_URL}/${encodeURIComponent(userId)}/revoke`, {
    method: 'POST',
    token
  });
};
