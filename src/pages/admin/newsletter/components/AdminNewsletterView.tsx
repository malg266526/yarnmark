import React, { useId } from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { NewsletterStatus, NewsletterSubscriber } from '../../../../domain/newsletter/newsletterTypes.ts';
import {
  SubscriberEmail,
  SubscriberStatusControl,
  SubscriberStatusCheckbox,
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
  updatingId: string | null;
  updateFailed: boolean;
  updateStatus: (id: string, status: NewsletterStatus) => Promise<void>;
}

export const AdminNewsletterView = ({
  subscribers,
  loading,
  hasFailed,
  updatingId,
  updateFailed,
  updateStatus
}: AdminNewsletterViewProps) => {
  const statusLabelId = useId();
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
      {updateFailed && (
        <SubscribersEmpty role="alert">{t('infoForVendorsPage.newsletter.submitError')}</SubscribersEmpty>
      )}
      <SubscribersMeta>{t('adminNewsletterPage.subscribersCount', { count: subscribers.length })}</SubscribersMeta>

      <SubscribersList>
        <SubscriberRow>
          <SubscriberEmail />
          <SubscriberStatus id={statusLabelId}>{t('adminNewsletterPage.addedToExcel')}</SubscriberStatus>
        </SubscriberRow>
        {subscribers.map((subscriber) => (
          <SubscriberRow key={subscriber.email}>
            <SubscriberEmail id={`${statusLabelId}-${subscriber.email}`}>{subscriber.email}</SubscriberEmail>
            <SubscriberStatusControl>
              <SubscriberStatusCheckbox
                type="checkbox"
                aria-labelledby={`${statusLabelId} ${statusLabelId}-${subscriber.email}`}
                aria-busy={updatingId !== null && updatingId === subscriber.id}
                checked={subscriber.status !== 'pending'}
                disabled={!subscriber.id || updatingId !== null}
                onChange={(event) => {
                  if (subscriber.id) {
                    void updateStatus(subscriber.id, event.target.checked ? 'subscribed' : 'pending');
                  }
                }}
              />
              {t(
                subscriber.status === 'pending'
                  ? 'adminNewsletterPage.excelStatus.no'
                  : 'adminNewsletterPage.excelStatus.yes'
              )}
            </SubscriberStatusControl>
          </SubscriberRow>
        ))}
      </SubscribersList>
    </SubscribersSection>
  );
};
