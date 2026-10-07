import React from 'react';
import {
  ApplicationsFilterField,
  ApplicationsFilterLabel,
  ApplicationsFilterSelect
} from '../WorkshopsApplicationsPage.styled';

interface WorkshopsApplicationsFilterSelectProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  value: string;
}

export const WorkshopsApplicationsFilterSelect = ({
  id,
  label,
  onChange,
  options,
  value
}: WorkshopsApplicationsFilterSelectProps) => (
  <ApplicationsFilterField>
    <ApplicationsFilterLabel htmlFor={id}>{label}</ApplicationsFilterLabel>
    <ApplicationsFilterSelect id={id} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </ApplicationsFilterSelect>
  </ApplicationsFilterField>
);
