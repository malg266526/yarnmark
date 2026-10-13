import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { NewsletterSubscriber } from '../../../../domain/newsletter/newsletterTypes.ts';
import {
  SubscriberEmail,
  SubscriberAction,
  SubscriberRow,
  SubscriberStatus,
  SubscriberStatusGroup,
  SubscribersEmpty,
  SubscribersList,
  SubscribersMeta,
  SubscribersSection
} from '../AdminNewsletterPage.styled';

interface AdminNewsletterViewProps {
  subscribers: NewsletterSubscriber[];
  loading: boolean;
  hasFailed: boolean;
  updatingEmail: string | null;
  hasUpdateFailed: boolean;
  onMarkAsAdded: (email: string) => void;
}

export const AdminNewsletterView = ({
  subscribers,
  loading,
  hasFailed,
  updatingEmail,
  hasUpdateFailed,
  onMarkAsAdded
}: AdminNewsletterViewProps) => {
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
      {hasUpdateFailed ? (
        <SubscribersEmpty role="alert">{t('adminNewsletterPage.updateError')}</SubscribersEmpty>
      ) : null}

      <SubscribersList>
        <SubscriberRow>
          <SubscriberEmail />
          <SubscriberStatus>{t('adminNewsletterPage.addedToExcel')}</SubscriberStatus>
        </SubscriberRow>
        {subscribers.map((subscriber) => (
          <SubscriberRow key={subscriber.email}>
            <SubscriberEmail>{subscriber.email}</SubscriberEmail>
            <SubscriberStatusGroup>
              <SubscriberStatus>
                {t(
                  subscriber.status === 'pending'
                    ? 'adminNewsletterPage.excelStatus.no'
                    : 'adminNewsletterPage.excelStatus.yes'
                )}
              </SubscriberStatus>
              {subscriber.status === 'pending' ? (
                <SubscriberAction
                  type="button"
                  disabled={updatingEmail !== null}
                  onClick={() => onMarkAsAdded(subscriber.email)}
                >
                  {t('adminNewsletterPage.markAsAdded')}
                </SubscriberAction>
              ) : null}
            </SubscriberStatusGroup>
          </SubscriberRow>
        ))}
      </SubscribersList>
    </SubscribersSection>
  );
};
