import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Typography';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { VendorsFormState } from './vendorsFormTypes';
import {
  ActionsRow,
  CheckboxRow,
  ErrorText,
  FieldLabel,
  Fieldset,
  FormCard,
  FormLayout,
  InlineLink,
  PrimaryButton,
  ProgressDot,
  ProgressRow,
  RadioGroup,
  RadioOption,
  SecondaryButton,
  StepHeader,
  SummaryList,
  TextInput
} from './VendorsFormPage.styled';

interface VendorsFormViewProps {
  currentError: string;
  formData: VendorsFormState;
  goBack: () => void;
  goNext: () => void;
  isComplete: boolean;
  showErrors: boolean;
  step: number;
  totalSteps: number;
  updateField: <K extends keyof VendorsFormState>(key: K, value: VendorsFormState[K]) => void;
}

export const VendorsFormView = ({
  currentError,
  formData,
  goBack,
  goNext,
  isComplete,
  showErrors,
  step,
  totalSteps,
  updateField
}: VendorsFormViewProps) => {
  const t = useTypedTranslation();
  const { t: rawT } = useTranslation();

  return (
    <FormCard>
      <StepHeader>
        <Typography size="sm">
          {rawT('vendorsFormPage.stepCounter', { current: step + 1, total: totalSteps })}
        </Typography>
        <ProgressRow>
          {Array.from({ length: totalSteps }, (_, index) => (
            <ProgressDot key={index} $active={index === step && !isComplete} $done={index < step || isComplete} />
          ))}
        </ProgressRow>
      </StepHeader>

      {!isComplete ? (
        <FormLayout
          onSubmit={(event) => {
            event.preventDefault();
            goNext();
          }}
        >
          {step === 0 && (
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
          )}

          {step === 1 && (
            <Fieldset>
              <Typography size="xl">{t('vendorsFormPage.steps.attendedBefore.title')}</Typography>
              <RadioGroup>
                <RadioOption>
                  <input
                    type="radio"
                    name="attended_before"
                    checked={formData.attendedBefore === 'yes'}
                    onChange={() => updateField('attendedBefore', 'yes')}
                  />
                  <span>{t('vendorsFormPage.steps.attendedBefore.yes')}</span>
                </RadioOption>
                <RadioOption>
                  <input
                    type="radio"
                    name="attended_before"
                    checked={formData.attendedBefore === 'no'}
                    onChange={() => updateField('attendedBefore', 'no')}
                  />
                  <span>{t('vendorsFormPage.steps.attendedBefore.no')}</span>
                </RadioOption>
              </RadioGroup>
            </Fieldset>
          )}

          {step === 2 && (
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
          )}

          {step === 3 && (
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
                  <InlineLink href="/info-for-vendors-statue">
                    {t('vendorsFormPage.steps.statute.linkLabel')}
                  </InlineLink>
                </span>
              </CheckboxRow>
            </Fieldset>
          )}

          {showErrors && currentError ? <ErrorText>{currentError}</ErrorText> : null}

          <ActionsRow>
            {step > 0 ? (
              <SecondaryButton type="button" onClick={goBack}>
                {t('vendorsFormPage.back')}
              </SecondaryButton>
            ) : (
              <span />
            )}

            <PrimaryButton type="submit">
              {step === totalSteps - 1 ? t('vendorsFormPage.finish') : t('vendorsFormPage.next')}
            </PrimaryButton>
          </ActionsRow>
        </FormLayout>
      ) : (
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.summary.title')}</Typography>
          <Typography size="md">{t('vendorsFormPage.summary.description')}</Typography>

          <SummaryList>
            <dt>{t('vendorsFormPage.summary.storeName')}</dt>
            <dd>{formData.storeName}</dd>
            <dt>{t('vendorsFormPage.summary.attendedBefore')}</dt>
            <dd>
              {formData.attendedBefore === 'yes'
                ? t('vendorsFormPage.steps.attendedBefore.yes')
                : t('vendorsFormPage.steps.attendedBefore.no')}
            </dd>
            <dt>{t('vendorsFormPage.summary.phone')}</dt>
            <dd>{formData.phoneNumber}</dd>
            <dt>{t('vendorsFormPage.summary.email')}</dt>
            <dd>{formData.email}</dd>
            <dt>{t('vendorsFormPage.summary.statute')}</dt>
            <dd>{t('vendorsFormPage.summary.accepted')}</dd>
          </SummaryList>

          <ActionsRow>
            <SecondaryButton type="button" onClick={goBack}>
              {t('vendorsFormPage.edit')}
            </SecondaryButton>
          </ActionsRow>
        </Fieldset>
      )}
    </FormCard>
  );
};
