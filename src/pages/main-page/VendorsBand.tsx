import { VendorsList } from './VendorsList';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { BandTitle } from '../../components/bands/BandTitle';
import { SolidBackgroundBand } from '../../components/bands/SolidBackgroundBand';

type VendorsSectionType = {
  id: string;
};

export const VendorsBand = ({ id }: VendorsSectionType) => {
  const t = useTypedTranslation();

  return (
    <SolidBackgroundBand
      id={id}
      size="lg"
      padding="xl"
      color={`linear-gradient(to bottom, #eee3de, #fff,  #fff, #fff, #eee3de);`}
      direction="column"
      align="center">
      <BandTitle>{t('vendorsPage.title')}</BandTitle>

      <VendorsList />
    </SolidBackgroundBand>
  );
};
