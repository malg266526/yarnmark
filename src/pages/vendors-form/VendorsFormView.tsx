import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Typography';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import type { VendorsFormState } from './vendorsFormTypes';
import {
  ActionsRow,
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
  PrimaryButton,
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

interface VendorsFormViewProps {
  currentError: string;
  formData: VendorsFormState;
  isComplete: boolean;
  showErrors: boolean;
  submitForm: () => void;
  toggleStand: (standId: string) => void;
  updateField: <K extends keyof VendorsFormState>(key: K, value: VendorsFormState[K]) => void;
  updateLogoFile: (file: File | null) => void;
}

export const VendorsFormView = ({
  currentError,
  formData,
  isComplete,
  showErrors,
  submitForm,
  toggleStand,
  updateField,
  updateLogoFile
}: VendorsFormViewProps) => {
  const t = useTypedTranslation();
  const { t: rawT } = useTranslation();

  return (
    <FormCard>
      <FormLayout
        onSubmit={(event) => {
          event.preventDefault();
          submitForm();
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
                value={formData.storeName}
                placeholder={t('vendorsFormPage.steps.storeName.placeholder')}
                onChange={(event) => updateField('storeName', event.target.value)}
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
                  onChange={() => updateField('attendedBefore', true)}
                />
                <span>{t('vendorsFormPage.steps.attendedBefore.yes')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="attended_before"
                  checked={formData.attendedBefore === false}
                  onChange={() => updateField('attendedBefore', false)}
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
                  onChange={() => updateField('mainCategory', 'yarns')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.yarns')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="main_category"
                  checked={formData.mainCategory === 'accessories'}
                  onChange={() => updateField('mainCategory', 'accessories')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.accessories')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="main_category"
                  checked={formData.mainCategory === 'ceramics'}
                  onChange={() => updateField('mainCategory', 'ceramics')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.ceramics')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="main_category"
                  checked={formData.mainCategory === 'candles'}
                  onChange={() => updateField('mainCategory', 'candles')}
                />
                <span>{t('vendorsFormPage.steps.mainCategory.candles')}</span>
              </RadioOption>
            </RadioGroup>
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
                  onChange={() => updateField('interestedIfUnavailable', true)}
                />
                <span>{t('vendorsFormPage.steps.interestedIfUnavailable.yes')}</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="interested_if_unavailable"
                  checked={formData.interestedIfUnavailable === false}
                  onChange={() => updateField('interestedIfUnavailable', false)}
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
                value={formData.phoneNumber}
                placeholder={t('vendorsFormPage.steps.contact.phonePlaceholder')}
                onChange={(event) => updateField('phoneNumber', event.target.value)}
              />
            </FieldLabel>

            <FieldLabel htmlFor="email_address">
              {t('vendorsFormPage.steps.contact.emailLabel')}
              <TextInput
                id="email_address"
                type="email"
                value={formData.email}
                placeholder={t('vendorsFormPage.steps.contact.emailPlaceholder')}
                onChange={(event) => updateField('email', event.target.value)}
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
                value={formData.invoiceDetails}
                placeholder={t('vendorsFormPage.steps.invoice.detailsPlaceholder')}
                onChange={(event) => updateField('invoiceDetails', event.target.value)}
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
                value={formData.businessDescription}
                placeholder={t('vendorsFormPage.steps.businessDescription.placeholder')}
                onChange={(event) =>
                  updateField(
                    'businessDescription',
                    event.target.value.slice(0, VENDORS_FORM_BUSINESS_DESCRIPTION_MAX_LENGTH)
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
                onChange={(event) => updateField('acceptedStatute', event.target.checked)}
              />
              <span>
                {t('vendorsFormPage.steps.statute.prefix')}{' '}
                <InlineLink href="/info-for-vendors-statue">{t('vendorsFormPage.steps.statute.linkLabel')}</InlineLink>
              </span>
            </CheckboxRow>
          </Fieldset>
        </FormSection>

        {showErrors && currentError ? <ErrorText>{currentError}</ErrorText> : null}

        <FieldHint>{t('vendorsFormPage.draftBanner')}</FieldHint>

        <ActionsRow>
          <span />
          <PrimaryButton type="submit">{t('vendorsFormPage.saveDraft')}</PrimaryButton>
        </ActionsRow>
      </FormLayout>

      {isComplete ? (
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.summary.title')}</Typography>
          <Typography size="md">{t('vendorsFormPage.summary.description')}</Typography>

          <SummaryList>
            <dt>{t('vendorsFormPage.summary.storeName')}</dt>
            <dd>{formData.storeName}</dd>
            <dt>{t('vendorsFormPage.summary.attendedBefore')}</dt>
            <dd>
              {formData.attendedBefore
                ? t('vendorsFormPage.steps.attendedBefore.yes')
                : t('vendorsFormPage.steps.attendedBefore.no')}
            </dd>
            <dt>{t('vendorsFormPage.summary.mainCategory')}</dt>
            <dd>
              {formData.mainCategory ? rawT(`vendorsFormPage.steps.mainCategory.${formData.mainCategory}`) : null}
            </dd>
            <dt>{t('vendorsFormPage.summary.preferredStands')}</dt>
            <dd>
              {formData.preferredStands.length > 0
                ? formData.preferredStands.join(', ')
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
