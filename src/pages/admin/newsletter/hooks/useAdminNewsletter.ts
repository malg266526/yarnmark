import { useEffect, useState } from 'react';
import { useAdminSession } from '../../useAdminSession';
import { listNewsletterSubscribers } from '../../../../domain/newsletter/newsletterApi.ts';
import type { NewsletterSubscriber } from '../../../../domain/newsletter/newsletterTypes.ts';

export const useAdminNewsletter = () => {
  const { token, handleAdminApiError } = useAdminSession();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    let isActive = true;

    setLoading(true);
    setHasFailed(false);

    listNewsletterSubscribers(token)
      .then((fetchedSubscribers) => {
        if (isActive) {
          setSubscribers(fetchedSubscribers);
        }
      })
      .catch((error: unknown) => {
        console.error('Newsletter subscribers could not be loaded', error);
        handleAdminApiError(error);

        if (isActive) {
          setHasFailed(true);
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [token, handleAdminApiError]);

  return { subscribers, loading, hasFailed };
};
