import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import type { UseFormRegister, FormState, UseFormSetValue } from 'react-hook-form';
import { CtaButton } from '../../components/Button';
import { Typography } from '../../components/Typography';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import type { VendorsFormState } from './vendorsFormTypes';
import type { VendorsFormValues } from './vendorsFormSchema';
import {
  ActionsRow,
  ActionsSpacer,
  CheckboxRow,
  ErrorText,
  FieldLabel,
  FieldHint,
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
  SummaryList,
  TextArea,
  TextInput
} from './VendorsFormPage.styled';
import {
  VENDORS_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH,
  VENDORS_FORM_MAX_PREFERRED_STANDS
} from './vendorsFormConstants';
import { SelectableHall } from './SelectableHall';
import { SubmissionDateTimePreview } from './SubmissionDateTimePreview';

interface VendorsFormViewProps {
  currentError: string;
  formData: VendorsFormState;
  formState: FormState<VendorsFormValues>;
  register: UseFormRegister<VendorsFormValues>;
  isComplete: boolean;
  isSubmitting: boolean;
  submitError: string;
  submittedAtLabel: string | null;
  submitForm: () => Promise<void>;
  setAcceptedStatute: (value: boolean) => void;
  setBooleanField: (fieldName: 'attendedBefore' | 'interestedIfUnavailable', value: boolean) => void;
  setCategory: (category: VendorsFormState['mainCategory']) => void;
  setValue: UseFormSetValue<VendorsFormValues>;
  toggleStand: (standId: string) => void;
  updateLogoFile: (file: File | null) => void;
}

export const VendorsFormView = ({
  currentError,
  formData,
  formState,
  register,
  isComplete,
  isSubmitting,
  submitError,
  submittedAtLabel,
  submitForm,
  setAcceptedStatute,
  setBooleanField,
  setCategory,
  setValue,
  toggleStand,
  updateLogoFile
}: VendorsFormViewProps) => {
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
          </Fieldset>
        </FormSection>

        <FormSection>
          <Fieldset>
            <Typography size="xl">{t('vendorsFormPage.steps.preferredStands.title')}</Typography>
            <FieldHint>
              {rawT('vendorsFormPage.steps.preferredStands.hint', {
                max: VENDORS_FORM_MAX_PREFERRED_STANDS
              })}
            </FieldHint>
            <FieldHint>{t('vendorsFormPage.steps.preferredStands.orderHint')}</FieldHint>
            <FieldHint>
              {rawT('vendorsFormPage.steps.preferredStands.counter', {
                current: formData.preferredStands.length,
                max: VENDORS_FORM_MAX_PREFERRED_STANDS
              })}
            </FieldHint>
            <HallLayout>
              <HallMapColumn>
                <SelectableHall selectedStandIds={formData.preferredStands} onToggleStand={toggleStand} />
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
              </LegendCard>
            </HallLayout>
            <FieldHint>
              <Trans
                i18nKey="vendorsFormPage.steps.preferredStands.detailsHint"
                components={[<InlineLink key="vendors_info_link" href="/info-for-vendors" />]}
              />
            </FieldHint>
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
                onChange={(event) => updateLogoFile(event.target.files?.[0] ?? null)}
              />
              <FieldHint>{formData.logoFileName ?? t('vendorsFormPage.steps.invoice.logoHint')}</FieldHint>
            </FieldLabel>
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
                    event.target.value.slice(0, VENDORS_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH),
                    { shouldDirty: true, shouldValidate: true }
                  )
                }
              />
              <FieldHint>
                {rawT('vendorsFormPage.steps.businessDescription.limitHint', {
                  current: formData.businessDescription.length,
                  max: VENDORS_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH
                })}
              </FieldHint>
            </FieldLabel>
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
            <FieldHint>{t('vendorsFormPage.steps.statute.complianceHint')}</FieldHint>
          </Fieldset>
        </FormSection>

        {formState.submitCount > 0 && currentError ? <ErrorText>{currentError}</ErrorText> : null}

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
