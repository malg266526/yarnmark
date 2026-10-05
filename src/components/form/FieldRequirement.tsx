import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { FieldRequirementMark, type FieldRequirementType } from './FormField.styled';

interface FieldRequirementProps {
  requirement: FieldRequirementType;
}

export const FieldRequirement = ({ requirement }: FieldRequirementProps) => {
  const t = useTypedTranslation();

  if (requirement === 'optional') {
    return null;
  }

  return <FieldRequirementMark aria-label={t('formField.requirement.required')}>*</FieldRequirementMark>;
};
