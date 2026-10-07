import React from 'react';
import {
  ApplicationsFilterField,
  ApplicationsFilterLabel,
  ApplicationsFilterSelect as ApplicationsFilterSelectControl
} from '../VendorsApplicationsPage.styled';
import { VendorsApplicationsFilterSelectProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsFilterSelect = ({
  id,
  label,
  onChange,
  options,
  value
}: VendorsApplicationsFilterSelectProps) => (
  <ApplicationsFilterField>
    <ApplicationsFilterLabel htmlFor={id}>{label}</ApplicationsFilterLabel>
    <ApplicationsFilterSelectControl id={id} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </ApplicationsFilterSelectControl>
  </ApplicationsFilterField>
);
