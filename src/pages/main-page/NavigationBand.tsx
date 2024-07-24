import { SectionWrapper } from './MainPage.styled';
import { BackgroundColors } from '../../styles/theme';
import React, { useRef } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { FunnyButton } from '../../components/FunnyButton';
import { Icon, sizeToIconWidth } from '../../components/Icon';
import mapImageUrl from '../../assets/iconify/worldmap.svg';
import styled from 'styled-components';
import { Typography } from '../../components/Typography';
import { BandTitle } from '../../components/bands/BandTitle';
import { SolidBackgroundBand } from '../../components/bands/SolidBackgroundBand';
import { Spacings } from '../../styles/spacings';
import { RowLayout } from '../../components/RowLayout';
import redMapMarkerIconUrl from '../../assets/figmaIcons/red_map_marker_icon.svg';
import blueTicketsIconUrl from '../../assets/figmaIcons/blue_tickets_icon.svg';
import shipIconUrl from '../../assets/figmaIcons/ship_icon.svg';
import storeIconUrl from '../../assets/figmaIcons/store_icon.svg';
import { Button } from '../../components/Button';
import { Icon as IconifyIcon } from '@iconify/react';

const InfoSectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  gap: ${Spacings.md};
`;

export const NavigationBand = () => {
  const t = useTypedTranslation();

  const hallMapFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  return (
    <SolidBackgroundBand id="mainInfoButtons" size="md" color={BackgroundColors.primary} maxWidth="80%" align="center">
      <SectionWrapper>
        <InfoSectionWrapper>
          <BandTitle>{t('navigationBand.anotherEdition')}</BandTitle>
          <Typography size="lg" weight="regular">
            {t('navigationBand.knittingSaturday')}
          </Typography>
          <Typography size="lg" weight="regular">
            {t('navigationBand.linksBelow')}
          </Typography>
          <Typography size="lg" weight="regular">
            {t('navigationBand.checkTheVendors')}
          </Typography>
        </InfoSectionWrapper>

        <RowLayout>
          <Button onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}>
            <Icon size="xl" zIndex={0} src={blueTicketsIconUrl} />
          </Button>

          <Button onClick={() => (window.location.href = '/home#vendors')}>
            <Icon size="xl" zIndex={0} src={storeIconUrl} />
          </Button>

          <Button onClick={() => (window.location.href = '/home#location')}>
            <Icon size="xl" zIndex={0} src={redMapMarkerIconUrl} />
          </Button>

          <Button onClick={() => (window.location.href = '/home#cruise')}>
            <Icon size="xl" zIndex={0} src={shipIconUrl} />
          </Button>

          <Button onClick={() => (window.location.href = '/home#food')}>
            <IconifyIcon icon="fxemoji:hamburger" width={sizeToIconWidth['xl']}></IconifyIcon>
          </Button>

          <FunnyButton
            ref={hallMapFunnyButtonRef}
            icon={<Icon size="md" zIndex={0} src={mapImageUrl} />}
            text={t('buttonsBand.hallMap')}
            onClick={() => window.open('/hall', '_blank')}
          />
        </RowLayout>
      </SectionWrapper>
    </SolidBackgroundBand>
  );
};
