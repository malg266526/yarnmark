import { ADMIN_SESSION_STORAGE_KEY } from './adminAuthConstants';
import { parseStoredAdminSession, type AdminSession } from './adminAuthUtils';

export const readStoredAdminSession = (): AdminSession | null =>
  parseStoredAdminSession(window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY), Date.now());

export const writeStoredAdminSession = (session: AdminSession) => {
  window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
};

export const clearStoredAdminSession = () => {
  window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
};
