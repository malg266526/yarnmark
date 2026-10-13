import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { NewsletterSubscriber } from '../../../../domain/newsletter/newsletterTypes.ts';
import {
  SubscriberEmail,
  SubscriberRow,
  SubscriberStatus,
  SubscribersEmpty,
  SubscribersList,
  SubscribersMeta,
  SubscribersSection
} from '../AdminNewsletterPage.styled';

interface AdminNewsletterViewProps {
  subscribers: NewsletterSubscriber[];
  loading: boolean;
  hasFailed: boolean;
}

export const AdminNewsletterView = ({ subscribers, loading, hasFailed }: AdminNewsletterViewProps) => {
  const t = useTypedTranslation();

  if (loading) {
    return <SubscribersEmpty>{t('adminNewsletterPage.loading')}</SubscribersEmpty>;
  }

  if (hasFailed) {
    return <SubscribersEmpty role="alert">{t('adminNewsletterPage.error')}</SubscribersEmpty>;
  }

  if (subscribers.length === 0) {
    return <SubscribersEmpty>{t('adminNewsletterPage.empty')}</SubscribersEmpty>;
  }

  return (
    <SubscribersSection>
      <SubscribersMeta>{t('adminNewsletterPage.subscribersCount', { count: subscribers.length })}</SubscribersMeta>

      <SubscribersList>
        <SubscriberRow>
          <SubscriberEmail />
          <SubscriberStatus>{t('adminNewsletterPage.addedToExcel')}</SubscriberStatus>
        </SubscriberRow>
        {subscribers.map((subscriber) => (
          <SubscriberRow key={subscriber.email}>
            <SubscriberEmail>{subscriber.email}</SubscriberEmail>
            <SubscriberStatus>
              {t(
                subscriber.status === 'pending'
                  ? 'adminNewsletterPage.excelStatus.no'
                  : 'adminNewsletterPage.excelStatus.yes'
              )}
            </SubscriberStatus>
          </SubscriberRow>
        ))}
      </SubscribersList>
    </SubscribersSection>
  );
};
