import { useState } from 'react';
import { ADMIN_PASSWORD } from './adminAuthConstants';
import { readStoredAdminAuth, writeStoredAdminAuth } from './adminAuthStorage';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAdminAuth);

  const login = (password: string): boolean => {
    const isPasswordCorrect = password === ADMIN_PASSWORD;

    if (isPasswordCorrect) {
      writeStoredAdminAuth(true);
      setIsAuthenticated(true);
    }

    return isPasswordCorrect;
  };

  const logout = () => {
    writeStoredAdminAuth(false);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
