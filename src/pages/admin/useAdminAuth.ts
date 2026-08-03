import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ADMIN_AUTH_STORAGE_KEY, ADMIN_PASSWORD } from './adminAuthConstants';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>(ADMIN_AUTH_STORAGE_KEY, false);

  const login = (password: string): boolean => {
    const isPasswordCorrect = password === ADMIN_PASSWORD;

    if (isPasswordCorrect) {
      setIsAuthenticated(true);
    }

    return isPasswordCorrect;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
