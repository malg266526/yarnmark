import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { CtaButton } from '../../../components/Button';
import { Typography } from '../../../components/Typography';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import type { VendorFormState } from '../vendorFormTypes.ts';
import type { VendorFormValues } from '../vendorFormSchema.ts';
import {
  ActionsRow,
  ActionsSpacer,
  CheckboxRow,
  DisclaimerText,
  DownloadActions,
  ErrorText,
  FieldHint,
  FieldLabel,
  Fieldset,
  FormCard,
  FormLayout,
  FormSection,
  HallLayout,
  HallMapColumn,
  InlineLink,
  LegendBadge,
  LegendCard,
  LegendRow,
  LegendSize,
  LegendText,
  RadioGroup,
  RadioOption,
  StandStatusList,
  StandStatusPill,
  SummaryList,
  TextArea,
  TextInput,
  WarningCard
} from '../VendorFormPage.styled';
import {
  VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH,
  VENDOR_FORM_MAX_PREFERRED_STANDS
} from '../vendorFormConstants.ts';
import { SelectableHall } from './SelectableHall';
import { SubmissionDateTimePreview } from './SubmissionDateTimePreview';

interface VendorFormViewProps {
  formData: VendorFormState;
  getFieldError: (...fieldNames: Array<keyof VendorFormValues>) => string;
  highInterestSelectedStandIds: string[];
  highInterestStandIds: string[];
  register: UseFormRegister<VendorFormValues>;
  isComplete: boolean;
  isLoadingLogo: boolean;
  isSubmitting: boolean;
  standInterestCounts: Map<string, number>;
  submitError: string;
  submittedAtLabel: string | null;
  submitForm: () => Promise<void>;
  setAcceptedStatute: (value: boolean) => void;
  setBooleanField: (
    fieldName: 'attendedBefore' | 'interestedIfUnavailable' | 'sponsorshipInterest',
    value: boolean
  ) => void;
  setCategory: (category: VendorFormState['mainCategory']) => void;
  setValue: UseFormSetValue<VendorFormValues>;
  toggleStand: (standId: string) => void;
  updateLogoFile: (file: File | null) => void;
}

export const VendorFormView = ({
  formData,
  getFieldError,
  highInterestSelectedStandIds,
  highInterestStandIds,
  register,
  isComplete,
  isLoadingLogo,
  isSubmitting,
  standInterestCounts,
  submitError,
  submittedAtLabel,
  submitForm,
  setAcceptedStatute,
  setBooleanField,
  setCategory,
  setValue,
  toggleStand,
  updateLogoFile
}: VendorFormViewProps) => {
  const t = useTypedTranslation();
  const { t: rawT } = useTranslation();
  const businessDescriptionField = register('businessDescription');

  return (
    <FormCard>
      <FormLayout
        onSubmit={(event) => {
          event.preventDefault();
          void submitForm();
        }}
      >
        <FormSection $isFirst>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.storeName.title')}</Typography>
            <FieldLabel htmlFor="store_name">
              {t('vendorsFormPage.steps.storeName.label')}
              <TextInput
                id="store_name"
                type="text"
                placeholder={t('vendorsFormPage.steps.storeName.placeholder')}
                {...register('storeName')}
              />
            </FieldLabel>
            {getFieldError('storeName') ? <ErrorText>{getFieldError('storeName')}</ErrorText> : null}
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.attendedBefore.title')}</Typography>
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  name="attended_before"
                  checked={formData.attendedBefore === true}
                  onChange={() => setBooleanField('attendedBefore', true)}
                />
                <span>{t('vendorsFormPage.steps.attendedBefore.yes')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="attended_before"
                  checked={formData.attendedBefore === false}
                  onChange={() => setBooleanField('attendedBefore', false)}
                />
                <span>{t('vendorsFormPage.steps.attendedBefore.no')}</span>
              </RadioOption>
            </RadioGroup>
            {getFieldError('attendedBefore') ? <ErrorText>{getFieldError('attendedBefore')}</ErrorText> : null}
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.mainCategory.title')}</Typography>
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  name="main_category"
                  checked={formData.mainCategory === 'yarns'}
                  onChange={() => setCategory('yarns')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.yarns')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="main_category"
                  checked={formData.mainCategory === 'accessories'}
                  onChange={() => setCategory('accessories')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.accessories')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="main_category"
                  checked={formData.mainCategory === 'ceramics'}
                  onChange={() => setCategory('ceramics')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.ceramics')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="main_category"
                  checked={formData.mainCategory === 'candles'}
                  onChange={() => setCategory('candles')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.candles')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="main_category"
                  checked={formData.mainCategory === 'other'}
                  onChange={() => setCategory('other')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.other')}</span>
              </RadioOption>
            </RadioGroup>
            {formData.mainCategory === 'other' ? (
              <FieldLabel htmlFor="main_category_other">
                {t('vendorsFormPage.steps.mainCategory.otherLabel')}
                <TextInput
                  id="main_category_other"
                  type="text"
                  placeholder={t('vendorsFormPage.steps.mainCategory.otherPlaceholder')}
                  {...register('mainCategoryOther')}
                />
              </FieldLabel>
            ) : null}
            {getFieldError('mainCategory', 'mainCategoryOther') ? (
              <ErrorText>{getFieldError('mainCategory', 'mainCategoryOther')}</ErrorText>
            ) : null}
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.preferredStands.title')}</Typography>
            <FieldHint>
              {rawT('vendorsFormPage.steps.preferredStands.hint', {
                max: VENDOR_FORM_MAX_PREFERRED_STANDS
              })}
            </FieldHint>
            <FieldHint>{t('vendorsFormPage.steps.preferredStands.orderHint')}</FieldHint>
            <FieldHint>
              {rawT('vendorsFormPage.steps.preferredStands.counter', {
                current: formData.preferredStands.length,
                max: VENDOR_FORM_MAX_PREFERRED_STANDS
              })}
            </FieldHint>
            <HallLayout>
              <HallMapColumn>
                <SelectableHall
                  highInterestStandIds={highInterestStandIds}
                  selectedStandIds={formData.preferredStands}
                  onToggleStand={toggleStand}
                />
              </HallMapColumn>
              <LegendCard aria-label={t('vendorsFormPage.steps.preferredStands.legendTitle')}>
                <Typography size="sm" weight="bold">
                  {t('vendorsFormPage.steps.preferredStands.legendTitle')}
                </Typography>
                <LegendRow>
                  <LegendBadge>P</LegendBadge>
                  <LegendText>
                    {t('vendorsFormPage.steps.preferredStands.premiumLabel')}
                    <LegendSize>{t('vendorsFormPage.steps.preferredStands.premiumSize')}</LegendSize>
                  </LegendText>
                </LegendRow>
                <LegendRow>
                  <LegendBadge>S</LegendBadge>
                  <LegendText>
                    {t('vendorsFormPage.steps.preferredStands.standardLabel')}
                    <LegendSize>{t('vendorsFormPage.steps.preferredStands.standardSize')}</LegendSize>
                  </LegendText>
                </LegendRow>
                <LegendRow>
                  <LegendBadge>M</LegendBadge>
                  <LegendText>
                    {t('vendorsFormPage.steps.preferredStands.miniLabel')}
                    <LegendSize>{t('vendorsFormPage.steps.preferredStands.miniSize')}</LegendSize>
                  </LegendText>
                </LegendRow>
                <LegendRow>
                  <LegendBadge>HI</LegendBadge>
                  <LegendText>
                    {t('vendorsFormPage.steps.preferredStands.highInterestLabel')}
                    <LegendSize>{t('vendorsFormPage.steps.preferredStands.highInterestHint')}</LegendSize>
                  </LegendText>
                </LegendRow>
              </LegendCard>
            </HallLayout>
            {highInterestSelectedStandIds.length > 0 ? (
              <StandStatusList>
                {highInterestSelectedStandIds.map((standId) => (
                  <StandStatusPill key={standId}>
                    {standId} · {t('vendorsFormPage.steps.preferredStands.highInterestLabel')}
                  </StandStatusPill>
                ))}
              </StandStatusList>
            ) : null}
            {highInterestSelectedStandIds.length > 0 ? (
              <WarningCard>
                {rawT('vendorsFormPage.steps.preferredStands.highInterestWarning', {
                  stands: highInterestSelectedStandIds.join(', ')
                })}
              </WarningCard>
            ) : null}
            <DisclaimerText>
              <Trans
                i18nKey="vendorsFormPage.steps.preferredStands.detailsHint"
                components={[<InlineLink key="vendors_info_link" href="/info-for-vendors" />]}
              />
            </DisclaimerText>
            {formData.preferredStands.length > 0 ? (
              <FieldHint>
                {formData.preferredStands
                  .map((standId) =>
                    rawT('vendorsFormPage.steps.preferredStands.standInterestCount', {
                      count: standInterestCounts.get(standId) ?? 0,
                      standId
                    })
                  )
                  .join(' • ')}
              </FieldHint>
            ) : null}
            {getFieldError('preferredStands') ? <ErrorText>{getFieldError('preferredStands')}</ErrorText> : null}
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.interestedIfUnavailable.title')}</Typography>
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  name="interested_if_unavailable"
                  checked={formData.interestedIfUnavailable === true}
                  onChange={() => setBooleanField('interestedIfUnavailable', true)}
                />
                <span>{t('vendorsFormPage.steps.interestedIfUnavailable.yes')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="interested_if_unavailable"
                  checked={formData.interestedIfUnavailable === false}
                  onChange={() => setBooleanField('interestedIfUnavailable', false)}
                />
                <span>{t('vendorsFormPage.steps.interestedIfUnavailable.no')}</span>
              </RadioOption>
            </RadioGroup>
            {getFieldError('interestedIfUnavailable') ? (
              <ErrorText>{getFieldError('interestedIfUnavailable')}</ErrorText>
            ) : null}
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.sponsorshipInterest.title')}</Typography>
            <DisclaimerText>{t('vendorsFormPage.steps.sponsorshipInterest.hint')}</DisclaimerText>
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  name="sponsorship_interest"
                  checked={formData.sponsorshipInterest === true}
                  onChange={() => setBooleanField('sponsorshipInterest', true)}
                />
                <span>{t('vendorsFormPage.steps.sponsorshipInterest.yes')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="sponsorship_interest"
                  checked={formData.sponsorshipInterest === false}
                  onChange={() => setBooleanField('sponsorshipInterest', false)}
                />
                <span>{t('vendorsFormPage.steps.sponsorshipInterest.no')}</span>
              </RadioOption>
            </RadioGroup>
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.contact.title')}</Typography>
            <FieldLabel htmlFor="phone_number">
              {t('vendorsFormPage.steps.contact.phoneLabel')}
              <TextInput
                id="phone_number"
                type="tel"
                placeholder={t('vendorsFormPage.steps.contact.phonePlaceholder')}
                {...register('phoneNumber')}
              />
            </FieldLabel>

            <FieldLabel htmlFor="email_address">
              {t('vendorsFormPage.steps.contact.emailLabel')}
              <TextInput
                id="email_address"
                type="email"
                placeholder={t('vendorsFormPage.steps.contact.emailPlaceholder')}
                {...register('email')}
              />
            </FieldLabel>
            {getFieldError('phoneNumber', 'email') ? (
              <ErrorText>{getFieldError('phoneNumber', 'email')}</ErrorText>
            ) : null}
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.invoice.title')}</Typography>
            <FieldLabel htmlFor="invoice_details">
              {t('vendorsFormPage.steps.invoice.detailsLabel')}
              <TextArea
                id="invoice_details"
                placeholder={t('vendorsFormPage.steps.invoice.detailsPlaceholder')}
                {...register('invoiceDetails')}
              />
            </FieldLabel>

            <FieldLabel htmlFor="logo_file">
              {t('vendorsFormPage.steps.invoice.logoLabel')}
              <TextInput
                id="logo_file"
                type="file"
                accept="image/*"
                disabled={isLoadingLogo}
                onChange={(event) => {
                  void updateLogoFile(event.target.files?.[0] ?? null);
                }}
              />
              <FieldHint>
                {isLoadingLogo
                  ? t('vendorsFormPage.logoLoading')
                  : (formData.logoFileName ?? t('vendorsFormPage.steps.invoice.logoHint'))}
              </FieldHint>
              {formData.logoDataUrl ? (
                <DownloadActions>
                  <FieldHint>{t('vendorsFormPage.steps.invoice.logoSavedHint')}</FieldHint>
                </DownloadActions>
              ) : null}
            </FieldLabel>
            {getFieldError('invoiceDetails', 'logoFileName') ? (
              <ErrorText>{getFieldError('invoiceDetails', 'logoFileName')}</ErrorText>
            ) : null}
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.businessDescription.title')}</Typography>
            <FieldLabel htmlFor="business_description">
              {t('vendorsFormPage.steps.businessDescription.label')}
              <TextArea
                id="business_description"
                name={businessDescriptionField.name}
                placeholder={t('vendorsFormPage.steps.businessDescription.placeholder')}
                ref={businessDescriptionField.ref}
                onBlur={businessDescriptionField.onBlur}
                onChange={(event) =>
                  setValue(
                    'businessDescription',
                    event.target.value.slice(0, VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH),
                    { shouldDirty: true, shouldValidate: true }
                  )
                }
              />
              <FieldHint>
                {rawT('vendorsFormPage.steps.businessDescription.limitHint', {
                  current: formData.businessDescription.length,
                  max: VENDOR_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH
                })}
              </FieldHint>
            </FieldLabel>
            {getFieldError('businessDescription') ? (
              <ErrorText>{getFieldError('businessDescription')}</ErrorText>
            ) : null}
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.statute.title')}</Typography>
            <CheckboxRow htmlFor="accept_statute">
              <input
                id="accept_statute"
                type="checkbox"
                checked={formData.acceptedStatute}
                onChange={(event) => setAcceptedStatute(event.target.checked)}
              />
              <span>
                {t('vendorsFormPage.steps.statute.prefix')}{' '}
                <InlineLink href="/info-for-vendors-statue">{t('vendorsFormPage.steps.statute.linkLabel')}</InlineLink>
              </span>
            </CheckboxRow>
            <DisclaimerText>{t('vendorsFormPage.steps.statute.complianceHint')}</DisclaimerText>
            {getFieldError('acceptedStatute') ? <ErrorText>{getFieldError('acceptedStatute')}</ErrorText> : null}
          </Fieldset>
        </FormSection>

        <FieldHint>{t('vendorsFormPage.draftBanner')}</FieldHint>

        <SubmissionDateTimePreview />

        {submitError ? <ErrorText>{submitError}</ErrorText> : null}

        <ActionsRow>
          <ActionsSpacer />
          <CtaButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('vendorsFormPage.submitting') : t('vendorsFormPage.submit')}
          </CtaButton>
        </ActionsRow>
      </FormLayout>

      {isComplete ? (
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
                  ? rawT(`vendorsFormPage.steps.mainCategory.${formData.mainCategory}`)
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
      ) : null}
    </FormCard>
  );
};
