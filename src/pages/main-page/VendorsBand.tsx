import { VendorsList } from './VendorsList';
import React from 'react';
import { Band } from '../../components/bands/Band';
import { BackgroundColors } from '../../styles/theme';

type VendorsSectionType = {
  id: string;
};

export const VendorsBand = ({ id }: VendorsSectionType) => {
  return (
    <Band.CenteredColumn id={id} size="lg" padding="lg" color={BackgroundColors.gradient}>
      <VendorsList />
    </Band.CenteredColumn>
  );
};
