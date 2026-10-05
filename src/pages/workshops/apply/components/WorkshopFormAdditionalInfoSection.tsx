import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { FormFieldHeading } from '../../../../components/form/FormFieldHeading';
import { Fieldset, FormSection, TextArea } from '../WorkshopFormPage.styled';
import type { WorkshopFormBindings } from './workshopFormViewContracts';

interface WorkshopFormAdditionalInfoSectionProps {
  formBindings: WorkshopFormBindings;
}

export const WorkshopFormAdditionalInfoSection = ({ formBindings }: WorkshopFormAdditionalInfoSectionProps) => {
  const t = useTypedTranslation();
  const { register } = formBindings;

  return (
    <FormSection>
      <Fieldset>
        <FormFieldHeading title={t('workshopsFormPage.steps.additionalInfo.title')} requirement="optional" />
        <FormField htmlFor="additional_info">
          <TextArea
            id="additional_info"
            placeholder={t('workshopsFormPage.steps.additionalInfo.placeholder')}
            {...register('additionalInfo')}
          />
        </FormField>
      </Fieldset>
    </FormSection>
  );
};
