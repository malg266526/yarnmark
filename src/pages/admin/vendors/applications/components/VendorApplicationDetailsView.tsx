import React from 'react';
import { ApplicationDeleteAction } from '../../../../../components/ApplicationDeleteAction';
import { LogoPreviewImage } from '../../../../../components/form/FormField.styled';
import {
  ApplicationActionButton,
  ApplicationActionRow,
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationFieldValue
} from '../VendorsApplicationsPage.styled';
import { downloadVendorApplicationLogo } from '../utils/vendorsApplicationsImageUtils';
import { formatBoolean, formatMainCategory } from '../utils/vendorsApplicationsFormatters';
import { VENDOR_APPLICATION_STATUS_ORDER } from '../vendorsApplicationsConstants';
import { VendorApplicationFlagsView } from './VendorApplicationFlagsView';
import { VendorApplicationDetailsViewProps } from './vendorsApplicationsViewContracts';

const LOGO_DOWNLOAD_FORMATS = [
  { mimeType: 'image/png', translationKey: 'vendorsApplicationsPage.downloads.png' },
  { mimeType: 'image/webp', translationKey: 'vendorsApplicationsPage.downloads.webp' },
  { mimeType: 'image/avif', translationKey: 'vendorsApplicationsPage.downloads.avif' }
] as const;

export const VendorApplicationDetailsView = ({
  application,
  deleteApplication,
  deletingApplicationId,
  flags,
  resolveCategoryLabel,
  setApplicationStatus,
  translate,
  values
}: VendorApplicationDetailsViewProps) => (
  <>
    {flags.length > 0 ? (
      <ApplicationField>
        <ApplicationFieldLabel>{translate('vendorsApplicationsPage.flags.title')}</ApplicationFieldLabel>
        <VendorApplicationFlagsView emptyLabel={values.noneSelected} flags={flags} translate={translate} />
      </ApplicationField>
    ) : null}
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
      <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.allocationIteration')}</ApplicationFieldLabel>
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
      <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.sponsorshipInterest')}</ApplicationFieldLabel>
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
      {application.logoUrl ? (
        <LogoPreviewImage src={application.logoUrl} alt={application.logoFileName ?? application.storeName} />
      ) : null}
      {application.logoDataUrl || application.logoUrl ? (
        <ApplicationActionRow>
          {LOGO_DOWNLOAD_FORMATS.map(({ mimeType, translationKey }) => (
            <ApplicationActionButton
              key={mimeType}
              type="button"
              onClick={() => {
                void downloadVendorApplicationLogo(application, mimeType);
              }}
            >
              {translate(translationKey)}
            </ApplicationActionButton>
          ))}
        </ApplicationActionRow>
      ) : null}
    </ApplicationField>
    <ApplicationField>
      <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.businessDescription')}</ApplicationFieldLabel>
      <ApplicationFieldValue>{application.businessDescription}</ApplicationFieldValue>
    </ApplicationField>
    <ApplicationField>
      <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.acceptedStatute')}</ApplicationFieldLabel>
      <ApplicationFieldValue>{application.acceptedStatute ? values.yes : values.no}</ApplicationFieldValue>
    </ApplicationField>
    <ApplicationActionRow>
      <ApplicationDeleteAction
        buttonLabel={translate('vendorsApplicationsPage.delete.button')}
        cancelLabel={translate('confirmModal.cancel')}
        confirmLabel={translate('vendorsApplicationsPage.delete.confirm')}
        confirmationMessage={translate('vendorsApplicationsPage.delete.message', { name: application.storeName })}
        confirmationTitle={translate('vendorsApplicationsPage.delete.title')}
        deleting={deletingApplicationId === application.id}
        deletingLabel={translate('vendorsApplicationsPage.delete.deleting')}
        onDelete={() => deleteApplication(application.id)}
      />
    </ApplicationActionRow>
  </>
);
