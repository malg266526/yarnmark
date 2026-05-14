import React from 'react';
import { Typography } from '../../../components/Typography';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Fieldset, SummaryList } from '../VendorFormPage.styled';
import type { VendorFormBindings, VendorFormStatusState } from './vendorFormViewContracts';

interface VendorFormSummaryProps {
  formBindings: Pick<VendorFormBindings, 'formData'>;
  formStatus: Pick<VendorFormStatusState, 'submittedAtLabel'>;
}

export const VendorFormSummary = ({ formBindings, formStatus }: VendorFormSummaryProps) => {
  const t = useTypedTranslation();
  const { formData } = formBindings;
  const { submittedAtLabel } = formStatus;

  return (
    <Fieldset>
      <Typography size="xl">{t('vendorsFormPage.summary.title')}</Typography>
      <Typography size="md">{t('vendorsFormPage.summary.description')}</Typography>

      <SummaryList>
        <dt>{t('vendorsFormPage.summary.storeName')}</dt>
        <dd>{formData.storeName}</dd>
        <dt>{t('vendorsFormPage.summary.submittedAt')}</dt>
        <dd>{submittedAtLabel ?? t('vendorsFormPage.summary.notProvided')}</dd>
        <dt>{t('vendorsFormPage.summary.attendedBefore')}</dt>
        <dd>
          {formData.attendedBefore
            ? t('vendorsFormPage.steps.attendedBefore.yes')
            : t('vendorsFormPage.steps.attendedBefore.no')}
        </dd>
        <dt>{t('vendorsFormPage.summary.mainCategory')}</dt>
        <dd>
          {formData.mainCategory === 'other'
            ? formData.mainCategoryOther
            : formData.mainCategory
              ? t(`vendorsFormPage.steps.mainCategory.${formData.mainCategory}` as const)
              : null}
        </dd>
        <dt>{t('vendorsFormPage.summary.preferredStands')}</dt>
        <dd>
          {formData.preferredStands.length > 0
            ? formData.preferredStands.map((standId, index) => `${index + 1}. ${standId}`).join(', ')
            : t('vendorsFormPage.summary.notProvided')}
        </dd>
        <dt>{t('vendorsFormPage.summary.interestedIfUnavailable')}</dt>
        <dd>
          {formData.interestedIfUnavailable
            ? t('vendorsFormPage.steps.interestedIfUnavailable.yes')
            : t('vendorsFormPage.steps.interestedIfUnavailable.no')}
        </dd>
        <dt>{t('vendorsFormPage.summary.sponsorshipInterest')}</dt>
        <dd>
          {formData.sponsorshipInterest === null
            ? t('vendorsFormPage.summary.notProvided')
            : formData.sponsorshipInterest
              ? t('vendorsFormPage.steps.sponsorshipInterest.yes')
              : t('vendorsFormPage.steps.sponsorshipInterest.no')}
        </dd>
        <dt>{t('vendorsFormPage.summary.phone')}</dt>
        <dd>{formData.phoneNumber}</dd>
        <dt>{t('vendorsFormPage.summary.email')}</dt>
        <dd>{formData.email}</dd>
        <dt>{t('vendorsFormPage.summary.invoiceDetails')}</dt>
        <dd>{formData.invoiceDetails}</dd>
        <dt>{t('vendorsFormPage.summary.logo')}</dt>
        <dd>{formData.logoFileName ?? t('vendorsFormPage.summary.notProvided')}</dd>
        <dt>{t('vendorsFormPage.summary.businessDescription')}</dt>
        <dd>{formData.businessDescription}</dd>
        <dt>{t('vendorsFormPage.summary.statute')}</dt>
        <dd>{t('vendorsFormPage.summary.accepted')}</dd>
      </SummaryList>
    </Fieldset>
  );
};
