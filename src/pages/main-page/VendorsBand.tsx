import { Band } from '../../components/Band';
import { VendorsList } from './VendorsList';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { BandTitle } from '../../components/bands/BandTitle';

type VendorsSectionType = {
  id: string;
};

export const VendorsBand = ({ id }: VendorsSectionType) => {
  const t = useTypedTranslation();

  return (
    <Band
      id={id}
      size="lg"
      variant="background"
      padding="xl"
      color={`linear-gradient(to bottom, #eee3de, #fff,  #fff, #fff, #eee3de);`}
      overflowX="hidden">
      <Band.Slot flex="auto-grow" size="sm">
        <BandTitle>{t('vendorsPage.title')}</BandTitle>

        <VendorsList />
      </Band.Slot>
    </Band>
  );
};
