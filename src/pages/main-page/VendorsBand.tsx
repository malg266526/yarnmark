import { VendorsList } from './VendorsList';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Band } from '../../components/bands/Band';

const gradient = `linear-gradient(180deg, #EAE9E9 1.96%, rgba(244, 243, 243, 0.83) 12.51%, rgba(255, 255, 255, 0.65) 24.29%, #FFF 78.04%, #F3F2F2 91.01%, #EAE9E9 100%);`;

type VendorsSectionType = {
  id: string;
};

export const VendorsBand = ({ id }: VendorsSectionType) => {
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn id={id} size="lg" padding="lg" color={gradient}>
      <Band.Title>{t('vendorsPage.title')}</Band.Title>

      <VendorsList />
    </Band.CenteredColumn>
  );
};
