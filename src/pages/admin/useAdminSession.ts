import { useOutletContext } from 'react-router-dom';
import { ApiRequestError } from '../../domain/apiClient.ts';
import { resolveAdminPermissions, type AdminSession } from './adminAuthUtils';

const UNAUTHORIZED_STATUS = 401;

export interface AdminOutletContext {
  session: AdminSession | null;
  expireSession: () => void;
}

export const useAdminSession = () => {
  const { session, expireSession } = useOutletContext<AdminOutletContext>();

  const handleAdminApiError = (error: unknown) => {
    if (error instanceof ApiRequestError && error.status === UNAUTHORIZED_STATUS) {
      expireSession();
    }
  };

  return { token: session?.token ?? '', permissions: resolveAdminPermissions(session), handleAdminApiError };
};
