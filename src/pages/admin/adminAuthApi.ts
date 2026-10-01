import { ADMIN_LOGIN_URL } from './adminAuthConstants';
import { resolveAdminLoginResponse, type AdminLoginResult } from './adminAuthUtils';

const readJsonBody = async (response: Response): Promise<unknown> => {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
};

export const loginAdminWithGoogle = async (idToken: string): Promise<AdminLoginResult> => {
  try {
    const response = await fetch(ADMIN_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });
    const body = await readJsonBody(response);
    const result = resolveAdminLoginResponse(response.status, body);

    if (result.status === 'error') {
      console.error('Admin login failed', { url: ADMIN_LOGIN_URL, status: response.status, body });
    }

    return result;
  } catch (error) {
    console.error('Admin login request failed', { url: ADMIN_LOGIN_URL, error });
    return { status: 'error' };
  }
};
