import { useEffect, useState } from 'react';
import { useAdminSession } from '../../useAdminSession';
import { listNewsletterSubscribers, updateNewsletterStatus } from '../../../../domain/newsletter/newsletterApi.ts';
import type { NewsletterStatus, NewsletterSubscriber } from '../../../../domain/newsletter/newsletterTypes.ts';

export const useAdminNewsletter = () => {
  const { token, handleAdminApiError } = useAdminSession();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateFailed, setUpdateFailed] = useState(false);
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

  const updateStatus = async (id: string, status: NewsletterStatus) => {
    if (updatingId !== null) {
      return;
    }

    setUpdatingId(id);
    setUpdateFailed(false);

    try {
      await updateNewsletterStatus(token, id, status);
      setSubscribers((current) =>
        current.map((subscriber) => (subscriber.id === id ? { ...subscriber, status } : subscriber))
      );
    } catch (error: unknown) {
      handleAdminApiError(error);
      setUpdateFailed(true);
    } finally {
      setUpdatingId(null);
    }
  };

  return { subscribers, loading, hasFailed, updatingId, updateFailed, updateStatus };
};
