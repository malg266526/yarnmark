import { useCallback, useEffect, useRef, useState } from 'react';
import { GOOGLE_CLIENT_ID } from './adminAuthConstants';
import { loginAdminWithGoogle } from './adminAuthApi';
import { clearStoredAdminSession, readStoredAdminSession, writeStoredAdminSession } from './adminAuthStorage';
import type { AdminAuthState, AdminSession } from './adminAuthUtils';
import { loadGoogleIdentity, type GoogleCredentialResponse } from './googleIdentity';

export const useAdminAuth = (language: string) => {
  const [session, setSession] = useState<AdminSession | null>(readStoredAdminSession);
  const [authState, setAuthState] = useState<AdminAuthState>(() => (session ? 'authenticated' : 'initializing'));
  const hasRestoredSessionRef = useRef(session !== null);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  const handleCredential = useCallback(async ({ credential }: GoogleCredentialResponse) => {
    setAuthState('verifying');

    const result = await loginAdminWithGoogle(credential);

    if (result.status === 'authenticated') {
      writeStoredAdminSession(result.session);
      setSession(result.session);
    }

    setAuthState(result.status);
  }, []);

  useEffect(() => {
    let isActive = true;

    loadGoogleIdentity()
      .then((googleIdentity) => {
        if (!isActive) {
          return;
        }

        googleIdentity.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => void handleCredential(response),
          auto_select: true
        });

        if (!hasRestoredSessionRef.current) {
          googleIdentity.prompt();
        }

        setAuthState((currentState) => (currentState === 'initializing' ? 'signedOut' : currentState));
      })
      .catch((error: unknown) => {
        console.error('Google sign-in could not be initialised', error);

        if (isActive) {
          setAuthState((currentState) => (currentState === 'authenticated' ? currentState : 'error'));
        }
      });

    return () => {
      isActive = false;
    };
  }, [handleCredential]);

  useEffect(() => {
    if (authState === 'authenticated' || authState === 'initializing' || authState === 'verifying') {
      return;
    }

    const buttonContainer = googleButtonRef.current;

    if (!buttonContainer || !window.google) {
      return;
    }

    buttonContainer.replaceChildren();
    window.google.accounts.id.renderButton(buttonContainer, { theme: 'outline', size: 'large', locale: language });
  }, [authState, language]);

  const logout = useCallback(() => {
    window.google?.accounts.id.disableAutoSelect();
    clearStoredAdminSession();
    setSession(null);
    setAuthState('signedOut');
  }, []);

  return { authState, session, googleButtonRef, logout };
};
