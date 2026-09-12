import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  ErrorText,
  FieldLabel,
  Fieldset,
  FormSection,
  RadioGroup,
  RadioOption,
  TextInput
} from '../WorkshopFormPage.styled';
import type { WorkshopFormActions, WorkshopFormBindings } from './workshopFormViewContracts';

interface WorkshopFormPricingSectionProps {
  formActions: Pick<WorkshopFormActions, 'setContractType' | 'setNumberFieldValue'>;
  formBindings: WorkshopFormBindings;
}

const CONTRACT_TYPES = ['commission', 'specificWork', 'invoice', 'other'] as const;

export const WorkshopFormPricingSection = ({ formActions, formBindings }: WorkshopFormPricingSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const { setContractType, setNumberFieldValue } = formActions;
  const priceField = register('grossPricePerParticipant');

  return (
    <>
      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('workshopsFormPage.steps.pricing.title')}</Typography>
          <FieldLabel htmlFor="gross_price_per_participant">
            {t('workshopsFormPage.steps.pricing.grossPricePerParticipantLabel')}
            <TextInput
              id="gross_price_per_participant"
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
          </FieldLabel>
          {resolveFieldErrorMessage('grossPricePerParticipant') ? (
            <ErrorText>{resolveFieldErrorMessage('grossPricePerParticipant')}</ErrorText>
          ) : null}
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('workshopsFormPage.steps.contractType.title')}</Typography>
          <RadioGroup>
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
          {formData.contractType === 'other' ? (
            <FieldLabel htmlFor="contract_type_other">
              {t('workshopsFormPage.steps.contractType.otherLabel')}
              <TextInput
                id="contract_type_other"
                type="text"
                placeholder={t('workshopsFormPage.steps.contractType.otherPlaceholder')}
                {...register('contractTypeOther')}
              />
            </FieldLabel>
          ) : null}
          {resolveFieldErrorMessage('contractType', 'contractTypeOther') ? (
            <ErrorText>{resolveFieldErrorMessage('contractType', 'contractTypeOther')}</ErrorText>
          ) : null}
        </Fieldset>
      </FormSection>
    </>
  );
};
