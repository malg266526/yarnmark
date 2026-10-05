import React from 'react';
import { Typography } from '../Typography';
import { FieldRequirement } from './FieldRequirement';
import { FieldHeading, type FieldRequirementType } from './FormField.styled';

interface FormFieldHeadingProps {
  title: string;
  requirement: FieldRequirementType;
}

export const FormFieldHeading = ({ title, requirement }: FormFieldHeadingProps) => (
  <FieldHeading>
    <Typography size="xl">
      {title} <FieldRequirement requirement={requirement} />
    </Typography>
  </FieldHeading>
);
