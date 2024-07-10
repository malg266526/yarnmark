import { Band } from '../../components/Band';
import { RowLayout } from '../../components/RowLayout';
import { TextWrapper, Title } from '../../components/Title';
import { PulseButton, VendorsMapDrawer } from './MainPage.styled';
import { Icon as IconifyIcon } from '@iconify/react';
import { Button } from '../../components/Button';
import { Hall } from '../../components/Hall';
import { VendorsList } from './VendorsList';
import React, { forwardRef, useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useFirstClick } from '../../hooks/useFirstClick';

export const VendorsSection = forwardRef<HTMLDivElement>((props, ref) => {
  const t = useTypedTranslation();

  const [isVendorsMapShown, showVendorsMap] = useState<boolean>(false);

  const { wasClickedBefore: wasVendorsMapClicked, handleClick: handleVendorsMapClick } =
    useFirstClick('vendorsMapPulse');

  return (
    <Band
      id="vendors"
      ref={ref}
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

          <PulseButton
            shouldPulse={!wasVendorsMapClicked}
            onClick={() => {
              showVendorsMap((prev) => !prev);
              handleVendorsMapClick();
            }}
            aria-label="vendors-map-button">
            <IconifyIcon icon="fluent-emoji:information" width="48" />
          </PulseButton>
        </RowLayout>

        <VendorsMapDrawer isOpen={isVendorsMapShown}>
          <Button onClick={() => showVendorsMap(false)}>
            <IconifyIcon icon="mingcute:close-fill" aria-label="close-vendors-map-button" />
          </Button>

          <Hall multiplier={19} />
        </VendorsMapDrawer>

        <VendorsList />
      </Band.Slot>
    </Band>
  );
});

VendorsSection.displayName = 'VendorsSection';
