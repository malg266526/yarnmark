import { useOutletContext } from 'react-router-dom';
import type { AdminSession } from './adminAuthUtils';

export const useAdminSession = () => useOutletContext<AdminSession>();
