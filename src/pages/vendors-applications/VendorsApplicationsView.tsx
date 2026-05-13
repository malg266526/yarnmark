import React, { useState } from 'react';
import {
  ApplicationActionButton,
  ApplicationActionRow,
  ApplicationCard,
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationFieldValue,
  ApplicationHeader,
  ApplicationsEmpty,
  ApplicationsGrid,
  ApplicationsMeta,
  ApplicationsSection,
  ApplicationsToolbar,
  ApplicationTitle,
  StandGroupCard,
  StandGroups,
  StandGroupTitle,
  StandRequestItem,
  StandRequestList,
  StandRequestMeta,
  StandRequestVendor
} from './VendorsApplicationsPage.styled';
import type { VendorApplication, VendorApplicationStatus } from '../vendors-form/vendorsFormSubmission';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useTranslation } from 'react-i18next';
import {
  formatBoolean,
  formatDateTime,
  formatMainCategory,
  groupApplicationsByStand,
  sortApplicationsBySubmittedAt,
  VENDOR_APPLICATION_STATUS_ORDER
} from './VendorsApplicationsUtils';
import { downloadVendorApplicationLogo } from './vendorsApplicationsImageUtils';

interface VendorsApplicationsViewProps {
  applications: VendorApplication[];
  loading: boolean;
  setApplicationStatus: (applicationId: string, status: VendorApplicationStatus) => Promise<void>;
}

export const VendorsApplicationsView = ({
  applications,
  loading,
  setApplicationStatus
}: VendorsApplicationsViewProps) => {
  const t = useTypedTranslation();
  const { t: rawT, i18n } = useTranslation();
  const [isStandView, setIsStandView] = useState(false);
  const booleanLabels = {
    no: t('vendorsApplicationsPage.values.no'),
    noAnswer: t('vendorsApplicationsPage.values.noAnswer'),
    yes: t('vendorsApplicationsPage.values.yes')
  };
  const sortedApplications = sortApplicationsBySubmittedAt(applications);
  const standGroups = groupApplicationsByStand(applications);

  if (loading) {
    return <ApplicationsEmpty>{t('vendorsApplicationsPage.loading')}</ApplicationsEmpty>;
  }

  if (applications.length === 0) {
    return <ApplicationsEmpty>{t('vendorsApplicationsPage.empty')}</ApplicationsEmpty>;
  }

  return (
    <ApplicationsSection>
      <ApplicationsMeta>{rawT('vendorsApplicationsPage.savedCount', { count: applications.length })}</ApplicationsMeta>
      <ApplicationsToolbar>
        <ApplicationActionButton type="button" onClick={() => setIsStandView((value) => !value)}>
          {isStandView ? t('vendorsApplicationsPage.showCards') : t('vendorsApplicationsPage.showByStand')}
        </ApplicationActionButton>
      </ApplicationsToolbar>
      {isStandView ? (
        <StandGroups>
          {standGroups.map((standGroup) => (
            <StandGroupCard key={standGroup.standId}>
              <StandGroupTitle>{standGroup.standId}</StandGroupTitle>
              <StandRequestList>
                {standGroup.requests.map((request) => (
                  <StandRequestItem key={`${standGroup.standId}-${request.applicationId}`}>
                    <StandRequestVendor>{request.storeName}</StandRequestVendor>
                    <StandRequestMeta>{formatDateTime(request.submittedAt, i18n.language)}</StandRequestMeta>
                    <StandRequestMeta>
                      {rawT(`vendorsApplicationsPage.priorities.${request.priority}`)}
                    </StandRequestMeta>
                  </StandRequestItem>
                ))}
              </StandRequestList>
            </StandGroupCard>
          ))}
        </StandGroups>
      ) : (
        <ApplicationsGrid>
          {sortedApplications.map((application) => (
            <ApplicationCard key={application.id}>
              <ApplicationHeader>
                <ApplicationTitle>{application.storeName}</ApplicationTitle>
                <ApplicationsMeta>{formatDateTime(application.submittedAt, i18n.language)}</ApplicationsMeta>
              </ApplicationHeader>

              <ApplicationField>
                <ApplicationFieldLabel>{rawT('vendorsApplicationsPage.fields.status')}</ApplicationFieldLabel>
                <ApplicationFieldValue>
                  {rawT(`vendorsApplicationsPage.statuses.${application.status}`)}
                </ApplicationFieldValue>
                <ApplicationActionRow>
                  {VENDOR_APPLICATION_STATUS_ORDER.map((status) => (
                    <ApplicationActionButton
                      key={status}
                      type="button"
                      aria-pressed={application.status === status}
                      onClick={() => {
                        void setApplicationStatus(application.id, status);
                      }}
                    >
                      {rawT(`vendorsApplicationsPage.statuses.${status}`)}
                    </ApplicationActionButton>
                  ))}
                </ApplicationActionRow>
              </ApplicationField>
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
                    ? application.preferredStands.map((standId, index) => `${index + 1}. ${standId}`).join(', ')
                    : t('vendorsApplicationsPage.values.noneSelected')}
                </ApplicationFieldValue>
              </ApplicationField>
              <ApplicationField>
                <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.allocatedStand')}</ApplicationFieldLabel>
                <ApplicationFieldValue>
                  {application.allocatedStandId ?? t('vendorsApplicationsPage.values.notAssigned')}
                </ApplicationFieldValue>
              </ApplicationField>
              <ApplicationField>
                <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.allocationState')}</ApplicationFieldLabel>
                <ApplicationFieldValue>
                  {rawT(`vendorsApplicationsPage.allocationStates.${application.allocationState}`)}
                </ApplicationFieldValue>
              </ApplicationField>
              <ApplicationField>
                <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.allocationIteration')}</ApplicationFieldLabel>
                <ApplicationFieldValue>
                  {application.allocationIteration ?? t('vendorsApplicationsPage.values.notAssigned')}
                </ApplicationFieldValue>
              </ApplicationField>
              <ApplicationField>
                <ApplicationFieldLabel>{t('vendorsApplicationsPage.fields.attendedBefore')}</ApplicationFieldLabel>
                <ApplicationFieldValue>
                  {formatBoolean(application.attendedBefore, booleanLabels)}
                </ApplicationFieldValue>
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
                {application.logoDataUrl ? (
                  <ApplicationActionRow>
                    <ApplicationActionButton
                      type="button"
                      onClick={() => {
                        void downloadVendorApplicationLogo(application, 'image/png');
                      }}
                    >
                      {t('vendorsApplicationsPage.downloads.png')}
                    </ApplicationActionButton>
                    <ApplicationActionButton
                      type="button"
                      onClick={() => {
                        void downloadVendorApplicationLogo(application, 'image/webp');
                      }}
                    >
                      {t('vendorsApplicationsPage.downloads.webp')}
                    </ApplicationActionButton>
                    <ApplicationActionButton
                      type="button"
                      onClick={() => {
                        void downloadVendorApplicationLogo(application, 'image/avif');
                      }}
                    >
                      {t('vendorsApplicationsPage.downloads.avif')}
                    </ApplicationActionButton>
                  </ApplicationActionRow>
                ) : null}
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
      )}
    </ApplicationsSection>
  );
};
