import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { FieldRequirementBadge, type FieldRequirementType } from './FormField.styled';

interface FieldRequirementProps {
  requirement: FieldRequirementType;
}

export const FieldRequirement = ({ requirement }: FieldRequirementProps) => {
  const t = useTypedTranslation();

  return (
    <FieldRequirementBadge $requirement={requirement}>
      {t(`formField.requirement.${requirement}` as const)}
    </FieldRequirementBadge>
  );
};
