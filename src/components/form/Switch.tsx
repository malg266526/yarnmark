import React, { ReactNode } from 'react';
import { SwitchInput, SwitchLabel, SwitchTrack } from './Switch.styled';

interface SwitchProps {
  checked: boolean;
  children: ReactNode;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch = ({ checked, children, disabled, onChange }: SwitchProps) => (
  <SwitchLabel>
    <SwitchInput
      type="checkbox"
      role="switch"
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
    />
    <SwitchTrack aria-hidden="true" />
    {children}
  </SwitchLabel>
);
