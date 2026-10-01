import { GOOGLE_IDENTITY_SCRIPT_URL } from './adminAuthConstants';

export interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdentityApi {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
  }) => void;
  prompt: () => void;
  renderButton: (
    parent: HTMLElement,
    options: { theme?: 'outline' | 'filled_blue'; size?: 'large' | 'medium'; locale?: string }
  ) => void;
  disableAutoSelect: () => void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdentityApi } };
  }
}

let googleIdentityPromise: Promise<GoogleIdentityApi> | null = null;

export const loadGoogleIdentity = (): Promise<GoogleIdentityApi> => {
  if (window.google) {
    return Promise.resolve(window.google.accounts.id);
  }

  googleIdentityPromise ??= new Promise<GoogleIdentityApi>((resolve, reject) => {
    const script = document.createElement('script');

    script.src = GOOGLE_IDENTITY_SCRIPT_URL;
    script.async = true;
    script.onload = () =>
      window.google ? resolve(window.google.accounts.id) : reject(new Error('Google Identity Services not available'));
    script.onerror = () => {
      googleIdentityPromise = null;
      reject(new Error(`Failed to load ${GOOGLE_IDENTITY_SCRIPT_URL}`));
    };
    document.head.appendChild(script);
  });

  return googleIdentityPromise;
};
