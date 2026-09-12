import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FieldLabel, Fieldset, FormSection, TextArea } from '../WorkshopFormPage.styled';
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
        <Typography size="xl">{t('workshopsFormPage.steps.additionalInfo.title')}</Typography>
        <FieldLabel htmlFor="additional_info">
          <TextArea
            id="additional_info"
            placeholder={t('workshopsFormPage.steps.additionalInfo.placeholder')}
            {...register('additionalInfo')}
          />
        </FieldLabel>
      </Fieldset>
    </FormSection>
  );
};
