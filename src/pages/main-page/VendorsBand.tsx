import { Band } from '../../components/Band';
import { RowLayout } from '../../components/RowLayout';
import { TextWrapper, Title } from '../../components/Title';
import { VendorsList } from './VendorsList';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

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
        <RowLayout>
          <TextWrapper align="center">
            <Title>{t('vendorsPage.title')}</Title>
          </TextWrapper>
        </RowLayout>

        <VendorsList />
      </Band.Slot>
    </Band>
  );
};
