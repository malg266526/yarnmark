import { useCallback, useState, type FormEvent } from 'react';
import { subscribeToNewsletter } from '../../../domain/newsletter/newsletterApi.ts';
import {
  normalizeNewsletterEmail,
  validateNewsletterEmail,
  type NewsletterValidationKey
} from '../../../domain/newsletter/newsletterUtils.ts';

export type NewsletterFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface NewsletterFormBindings {
  email: string;
  status: NewsletterFormStatus;
  validationKey: NewsletterValidationKey | null;
  onEmailChange: (email: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const useNewsletterForm = (): NewsletterFormBindings => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterFormStatus>('idle');
  const [validationKey, setValidationKey] = useState<NewsletterValidationKey | null>(null);

  const onEmailChange = useCallback((nextEmail: string) => {
    setEmail(nextEmail);
    setValidationKey(null);
    setStatus('idle');
  }, []);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const nextValidationKey = validateNewsletterEmail(email);
      setValidationKey(nextValidationKey);

      if (nextValidationKey) {
        return;
      }

      setStatus('submitting');

      subscribeToNewsletter(normalizeNewsletterEmail(email))
        .then(() => {
          setStatus('success');
          setEmail('');
        })
        .catch(() => setStatus('error'));
    },
    [email]
  );

  return { email, status, validationKey, onEmailChange, onSubmit };
};
