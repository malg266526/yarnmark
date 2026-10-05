import React from 'react';
import { ErrorText } from './FormField.styled';

interface FormFieldErrorProps {
  id?: string;
  message?: string;
}

export const FormFieldError = ({ id, message }: FormFieldErrorProps) =>
  message ? <ErrorText id={id}>{message}</ErrorText> : null;
