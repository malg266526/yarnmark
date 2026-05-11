import React from 'react';
import {
  ApplicationCard,
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationFieldValue,
  ApplicationHeader,
  ApplicationsEmpty,
  ApplicationsGrid,
  ApplicationsMeta,
  ApplicationsSection,
  ApplicationTitle
} from './VendorsApplicationsPage.styled';
import type { VendorApplication } from '../vendors-form/vendorsFormSubmission';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useTranslation } from 'react-i18next';

type TranslateFn = ReturnType<typeof useTypedTranslation>;

interface Props {
  applications: VendorApplication[];
  loading: boolean;
}

const formatBoolean = (value: boolean | null, t: TranslateFn) => {
  if (value === null) {
    return t('vendorsApplicationsPage.values.noAnswer');
  }

  return value ? t('vendorsApplicationsPage.values.yes') : t('vendorsApplicationsPage.values.no');
};

const formatMainCategory = (application: VendorApplication, rawT: (key: string) => string, t: TranslateFn) => {
  if (application.mainCategory === 'other') {
    return application.mainCategoryOther || t('vendorsApplicationsPage.values.notProvided');
  }

  if (!application.mainCategory) {
    return t('vendorsApplicationsPage.values.notProvided');
  }

  return rawT(`vendorsFormPage.steps.mainCategory.${application.mainCategory}`);
};

const formatDateTime = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'medium'
  }).format(new Date(value));

export const VendorsApplicationsView: React.FC<Props> = ({ applications, loading }) => {
  const t = useTypedTranslation();
  const { t: rawT, i18n } = useTranslation();

  if (loading) {
    return <ApplicationsEmpty>{t('vendorsApplicationsPage.loading')}</ApplicationsEmpty>;
  }

  if (applications.length === 0) {
    return <ApplicationsEmpty>{t('vendorsApplicationsPage.empty')}</ApplicationsEmpty>;
  }

  return (
    <ApplicationsSection>
      <ApplicationsMeta>{rawT('vendorsApplicationsPage.savedCount', { count: applications.length })}</ApplicationsMeta>
      <ApplicationsGrid>
        {applications.map((application) => (
          <ApplicationCard key={application.id}>
            <ApplicationHeader>
              <ApplicationTitle>{application.storeName}</ApplicationTitle>
              <ApplicationsMeta>{formatDateTime(application.submittedAt, i18n.language)}</ApplicationsMeta>
            </ApplicationHeader>

            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.mainCategory')}</ApplicationFieldLabel>
              <ApplicationFieldValue>{formatMainCategory(application, rawT, t)}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.preferredStands')}</ApplicationFieldLabel>
              <ApplicationFieldValue>
                {application.preferredStands.length > 0
                  ? application.preferredStands.join(', ')
                  : t('vendorsApplicationsPage.values.noneSelected')}
              </ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.attendedBefore')}</ApplicationFieldLabel>
              <ApplicationFieldValue>{formatBoolean(application.attendedBefore, t)}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>
                {t('vendorsApplicationsPage.fields.interestedIfUnavailable')}
              </ApplicationFieldLabel>
              <ApplicationFieldValue>{formatBoolean(application.interestedIfUnavailable, t)}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.phone')}</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.phoneNumber}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.email')}</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.email}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.invoiceDetails')}</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.invoiceDetails}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.logoFilename')}</ApplicationFieldLabel>
              <ApplicationFieldValue>
                {application.logoFileName ?? t('vendorsApplicationsPage.values.notProvided')}
              </ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.businessDescription')}</ApplicationFieldLabel>
              <ApplicationFieldValue>{application.businessDescription}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.acceptedStatute')}</ApplicationFieldLabel>
              <ApplicationFieldValue>
                {application.acceptedStatute
                  ? t('vendorsApplicationsPage.values.yes')
                  : t('vendorsApplicationsPage.values.no')}
              </ApplicationFieldValue>
            </ApplicationField>
          </ApplicationCard>
        ))}
      </ApplicationsGrid>
    </ApplicationsSection>
  );
};
