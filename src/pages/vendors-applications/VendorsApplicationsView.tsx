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
import { formatBoolean, formatDateTime, formatMainCategory } from './VendorsApplicationsUtils';

interface VendorsApplicationsViewProps {
  applications: VendorApplication[];
  loading: boolean;
}

export const VendorsApplicationsView = ({ applications, loading }: VendorsApplicationsViewProps) => {
  const t = useTypedTranslation();
  const { t: rawT, i18n } = useTranslation();
  const booleanLabels = {
    no: t('vendorsApplicationsPage.values.no'),
    noAnswer: t('vendorsApplicationsPage.values.noAnswer'),
    yes: t('vendorsApplicationsPage.values.yes')
  };

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
              <ApplicationFieldValue>
                {formatMainCategory(
                  application,
                  (categoryKey) => rawT(`vendorsFormPage.steps.mainCategory.${categoryKey}`),
                  t('vendorsApplicationsPage.values.notProvided')
                )}
              </ApplicationFieldValue>
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
              <ApplicationFieldValue>{formatBoolean(application.attendedBefore, booleanLabels)}</ApplicationFieldValue>
            </ApplicationField>
            <ApplicationField>
              <ApplicationFieldLabel>
                {t('vendorsApplicationsPage.fields.interestedIfUnavailable')}
              </ApplicationFieldLabel>
              <ApplicationFieldValue>
                {formatBoolean(application.interestedIfUnavailable, booleanLabels)}
              </ApplicationFieldValue>
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
