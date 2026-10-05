import React, { type ReactNode } from 'react';
import { FieldRequirement } from './FieldRequirement';
import { FieldHint, FieldLabel, FieldLabelText, type FieldRequirementType } from './FormField.styled';
import { FormFieldError } from './FormFieldError';

interface FormFieldProps {
  htmlFor: string;
  label?: string;
  requirement?: FieldRequirementType;
  error?: string;
  errorId?: string;
  hint?: ReactNode;
  children: ReactNode;
}

export const FormField = ({ htmlFor, label, requirement, error, errorId, hint, children }: FormFieldProps) => (
  <>
    <FieldLabel htmlFor={htmlFor}>
      {label ? (
        <FieldLabelText>
          {label}
          {requirement ? <FieldRequirement requirement={requirement} /> : null}
        </FieldLabelText>
      ) : null}
      {children}
      {hint ? <FieldHint>{hint}</FieldHint> : null}
    </FieldLabel>
    <FormFieldError id={errorId} message={error} />
  </>
);
