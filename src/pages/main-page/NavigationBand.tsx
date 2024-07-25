import { BackgroundColors } from '../../styles/theme';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Icon, sizeToIconWidth } from '../../components/Icon';
import styled from 'styled-components';
import { Typography } from '../../components/Typography';
import { Spacings } from '../../styles/spacings';
import { RowLayout } from '../../components/RowLayout';
import redMapMarkerIconUrl from '../../assets/figmaIcons/red_map_marker_icon.svg';
import blueTicketsIconUrl from '../../assets/figmaIcons/blue_tickets_icon.svg';
import shipIconUrl from '../../assets/figmaIcons/ship_icon.svg';
import storeIconUrl from '../../assets/figmaIcons/store_icon.svg';
import { Button } from '../../components/Button';
import { Icon as IconifyIcon } from '@iconify/react';
import { Band } from '../../components/bands/Band';

const InfoSectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  gap: ${Spacings.md};
`;

export const NavigationBand = () => {
  const t = useTypedTranslation();

  return (
    <Band.NarrowColumn id="mainInfoButtons" size="sm" gap="md" padding="md" color={BackgroundColors.navigationBand}>
      <InfoSectionWrapper>
        <Typography size="lg">{t('navigationBand.anotherEdition')}</Typography>

        <Typography size="md" weight="regular">
          {t('navigationBand.knittingSaturday')}
        </Typography>
        <Typography size="md" weight="regular">
          {t('navigationBand.linksBelow')}
        </Typography>
      </InfoSectionWrapper>

      <RowLayout wide justify="center" gap="lg">
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

        <Button onClick={() => window.open('/hall', '_blank')}>
          <IconifyIcon icon="fxemoji:hamburger" width={sizeToIconWidth['xl']}></IconifyIcon>
        </Button>
      </RowLayout>
    </Band.NarrowColumn>
  );
};
