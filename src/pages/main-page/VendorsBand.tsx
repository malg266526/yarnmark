import { VendorsList } from './VendorsList';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Band } from '../../components/bands/Band';
import { BackgroundColors } from '../../styles/theme';

type VendorsSectionType = {
  id: string;
};

export const VendorsBand = ({ id }: VendorsSectionType) => {
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn id={id} size="lg" padding="lg" color={BackgroundColors.gradient}>
      <Band.Title>{t('vendorsPage.title')}</Band.Title>

      <VendorsList />
    </Band.CenteredColumn>
  );
};
