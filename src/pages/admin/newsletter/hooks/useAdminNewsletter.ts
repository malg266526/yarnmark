import { useEffect, useState } from 'react';
import { useAdminSession } from '../../useAdminSession';
import {
  listNewsletterSubscribers,
  markNewsletterSubscriberAsAdded
} from '../../../../domain/newsletter/newsletterApi.ts';
import type { NewsletterSubscriber } from '../../../../domain/newsletter/newsletterTypes.ts';

export const useAdminNewsletter = () => {
  const { token, handleAdminApiError } = useAdminSession();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const [updatingEmail, setUpdatingEmail] = useState<string | null>(null);
  const [hasUpdateFailed, setHasUpdateFailed] = useState(false);

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

  const markAsAdded = async (email: string) => {
    setUpdatingEmail(email);
    setHasUpdateFailed(false);

    try {
      await markNewsletterSubscriberAsAdded(token, email);
      setSubscribers((currentSubscribers) =>
        currentSubscribers.map((subscriber) =>
          subscriber.email === email ? { ...subscriber, status: 'isAddded' } : subscriber
        )
      );
    } catch (error: unknown) {
      console.error('Newsletter subscriber status could not be updated', error);
      handleAdminApiError(error);
      setHasUpdateFailed(true);
    } finally {
      setUpdatingEmail(null);
    }
  };

  return { subscribers, loading, hasFailed, updatingEmail, hasUpdateFailed, markAsAdded };
};
