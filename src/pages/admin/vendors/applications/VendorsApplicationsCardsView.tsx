import React from 'react';
import {
  ApplicationActionButton,
  ApplicationActionRow,
  ApplicationCard,
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationFieldValue,
  ApplicationHeader,
  ApplicationsGrid,
  ApplicationsMeta,
  ApplicationTitle
} from './VendorsApplicationsPage.styled';
import { downloadVendorApplicationLogo } from './vendorsApplicationsImageUtils';
import {
  formatBoolean,
  formatDateTime,
  formatMainCategory,
  sortApplicationsBySubmittedAt,
  VENDOR_APPLICATION_STATUS_ORDER
} from './VendorsApplicationsUtils';
import { VendorsApplicationsCardsViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsCardsView = ({
  applications,
  locale,
  resolveCategoryLabel,
  setApplicationStatus,
  values,
  translate
}: VendorsApplicationsCardsViewProps) => {
  const sortedApplications = sortApplicationsBySubmittedAt(applications);

  return (
    <ApplicationsGrid>
      {sortedApplications.map((application) => (
        <ApplicationCard key={application.id}>
          <ApplicationHeader>
            <ApplicationTitle>{application.storeName}</ApplicationTitle>
            <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
          </ApplicationHeader>

          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.status')}</ApplicationFieldLabel>
            <ApplicationFieldValue>
              {translate(`vendorsApplicationsPage.statuses.${application.status}`)}
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
                  {translate(`vendorsApplicationsPage.statuses.${status}`)}
                </ApplicationActionButton>
              ))}
            </ApplicationActionRow>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.mainCategory')}</ApplicationFieldLabel>
            <ApplicationFieldValue>
              {formatMainCategory(application, resolveCategoryLabel, values.notProvided)}
            </ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.preferredStands')}</ApplicationFieldLabel>
            <ApplicationFieldValue>
              {application.preferredStands.length > 0
                ? application.preferredStands.map((standId, index) => `${index + 1}. ${standId}`).join(', ')
                : values.noneSelected}
            </ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.allocatedStand')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.allocatedStandId ?? values.notAssigned}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.allocationState')}</ApplicationFieldLabel>
            <ApplicationFieldValue>
              {translate(`vendorsApplicationsPage.allocationStates.${application.allocationState}`)}
            </ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('vendorsApplicationsPage.fields.allocationIteration')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>{application.allocationIteration ?? values.notAssigned}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.attendedBefore')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{formatBoolean(application.attendedBefore, values)}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('vendorsApplicationsPage.fields.interestedIfUnavailable')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>{formatBoolean(application.interestedIfUnavailable, values)}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('vendorsApplicationsPage.fields.sponsorshipInterest')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>{formatBoolean(application.sponsorshipInterest, values)}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.phone')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.phoneNumber}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.email')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.email}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.invoiceDetails')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.invoiceDetails}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.logoFilename')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.logoFileName ?? values.notProvided}</ApplicationFieldValue>
            {application.logoDataUrl ? (
              <ApplicationActionRow>
                <ApplicationActionButton
                  type="button"
                  onClick={() => {
                    void downloadVendorApplicationLogo(application, 'image/png');
                  }}
                >
                  {translate('vendorsApplicationsPage.downloads.png')}
                </ApplicationActionButton>
                <ApplicationActionButton
                  type="button"
                  onClick={() => {
                    void downloadVendorApplicationLogo(application, 'image/webp');
                  }}
                >
                  {translate('vendorsApplicationsPage.downloads.webp')}
                </ApplicationActionButton>
                <ApplicationActionButton
                  type="button"
                  onClick={() => {
                    void downloadVendorApplicationLogo(application, 'image/avif');
                  }}
                >
                  {translate('vendorsApplicationsPage.downloads.avif')}
                </ApplicationActionButton>
              </ApplicationActionRow>
            ) : null}
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('vendorsApplicationsPage.fields.businessDescription')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>{application.businessDescription}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.acceptedStatute')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.acceptedStatute ? values.yes : values.no}</ApplicationFieldValue>
          </ApplicationField>
        </ApplicationCard>
      ))}
    </ApplicationsGrid>
  );
};
