import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { FormFieldError } from '../../../../components/form/FormFieldError';
import { FormFieldHeading } from '../../../../components/form/FormFieldHeading';
import { Fieldset, FormSection, RadioGroup, RadioOption, TextInput } from '../WorkshopFormPage.styled';
import type { WorkshopFormActions, WorkshopFormBindings } from './workshopFormViewContracts';

const GROSS_PRICE_PER_PARTICIPANT_ERROR_ID = 'workshop-gross-price-per-participant-error';
const CONTRACT_TYPE_OTHER_ERROR_ID = 'workshop-contract-type-other-error';
const CONTRACT_TYPE_ERROR_ID = 'workshop-contract-type-error';

interface WorkshopFormPricingSectionProps {
  formActions: Pick<WorkshopFormActions, 'setContractType' | 'setNumberFieldValue'>;
  formBindings: WorkshopFormBindings;
}

const CONTRACT_TYPES = ['commission', 'specificWork', 'invoice', 'other'] as const;

export const WorkshopFormPricingSection = ({ formActions, formBindings }: WorkshopFormPricingSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const grossPricePerParticipantError = resolveFieldErrorMessage('grossPricePerParticipant');
  const contractTypeOtherError = resolveFieldErrorMessage('contractTypeOther');
  const contractTypeError = resolveFieldErrorMessage('contractType');
  const { setContractType, setNumberFieldValue } = formActions;
  const priceField = register('grossPricePerParticipant');

  return (
    <>
      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('workshopsFormPage.steps.pricing.title')}</Typography>
          <FormField
            htmlFor="gross_price_per_participant"
            label={t('workshopsFormPage.steps.pricing.grossPricePerParticipantLabel')}
            requirement="required"
            error={grossPricePerParticipantError}
            errorId={GROSS_PRICE_PER_PARTICIPANT_ERROR_ID}
          >
            <TextInput
              id="gross_price_per_participant"
              data-workshop-form-field="grossPricePerParticipant"
              aria-invalid={Boolean(grossPricePerParticipantError)}
              aria-describedby={grossPricePerParticipantError ? GROSS_PRICE_PER_PARTICIPANT_ERROR_ID : undefined}
              type="number"
              min={1}
              step="0.01"
              name={priceField.name}
              ref={priceField.ref}
              onBlur={priceField.onBlur}
              value={formData.grossPricePerParticipant ?? ''}
              onChange={(event) =>
                setNumberFieldValue(
                  'grossPricePerParticipant',
                  event.target.value === '' ? null : Number(event.target.value)
                )
              }
            />
          </FormField>
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <FormFieldHeading title={t('workshopsFormPage.steps.contractType.title')} requirement="required" />
          <RadioGroup
            role="radiogroup"
            data-workshop-form-field="contractType"
            aria-invalid={Boolean(contractTypeError)}
            aria-describedby={contractTypeError ? CONTRACT_TYPE_ERROR_ID : undefined}
          >
            {CONTRACT_TYPES.map((contractType) => (
              <RadioOption key={contractType}>
                <input
                  type="radio"
                  name="contract_type"
                  checked={formData.contractType === contractType}
                  onChange={() => setContractType(contractType)}
                />
                <span>{t(`workshopsFormPage.steps.contractType.${contractType}` as const)}</span>
              </RadioOption>
            ))}
          </RadioGroup>
          <FormFieldError id={CONTRACT_TYPE_ERROR_ID} message={contractTypeError} />
          {formData.contractType === 'other' ? (
            <FormField
              htmlFor="contract_type_other"
              label={t('workshopsFormPage.steps.contractType.otherLabel')}
              requirement="required"
              error={contractTypeOtherError}
              errorId={CONTRACT_TYPE_OTHER_ERROR_ID}
            >
              <TextInput
                id="contract_type_other"
                data-workshop-form-field="contractTypeOther"
                aria-invalid={Boolean(contractTypeOtherError)}
                aria-describedby={contractTypeOtherError ? CONTRACT_TYPE_OTHER_ERROR_ID : undefined}
                type="text"
                placeholder={t('workshopsFormPage.steps.contractType.otherPlaceholder')}
                {...register('contractTypeOther')}
              />
            </FormField>
          ) : null}
        </Fieldset>
      </FormSection>
    </>
  );
};
