import { ADMIN_AUTH_STORAGE_KEY } from './adminAuthConstants';

export const readStoredAdminAuth = (): boolean => {
  try {
    return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === JSON.stringify(true);
  } catch (error) {
    console.error('adminAuthStorage: ', error);
    return false;
  }
};

export const writeStoredAdminAuth = (isAuthenticated: boolean) => {
  try {
    window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(isAuthenticated));
  } catch (error) {
    console.error('adminAuthStorage: ', error);
  }
};
