import { BackgroundColors, TextColors } from '../../styles/theme';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Icon, sizeToIconWidth } from '../../components/Icon';
import styled from 'styled-components';
import { Typography } from '../../components/Typography';
import { RedesignSpacings } from '../../styles/spacings';
import { RowLayout } from '../../components/RowLayout';
import redMapMarkerIconUrl from '../../assets/figmaIcons/red_map_marker_icon.svg';
import blueTicketsIconUrl from '../../assets/figmaIcons/blue_tickets_icon.svg';
import shipIconUrl from '../../assets/figmaIcons/ship_icon.svg';
import storeIconUrl from '../../assets/figmaIcons/store_icon.svg';
import { Button } from '../../components/Button';
import { Icon as IconifyIcon } from '@iconify/react';
import { Band } from '../../components/bands/Band';
import mapIcon from '../../assets/figmaIcons/map_icon.svg';

const InfoSectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  gap: ${RedesignSpacings.md};
`;

const IconButton = styled(Button)`
  max-width: 60px;
  color: ${TextColors.link};
  text-align: center;
`;

export const NavigationBand = () => {
  const t = useTypedTranslation();

  return (
    <Band.NarrowColumn id="mainInfoButtons" size="sm" gap="md" padding="lg" color={BackgroundColors.navigationBand}>
      <InfoSectionWrapper>
        <Typography size="xl">{t('navigationBand.anotherEdition')}</Typography>

        <Typography size="md" weight="regular">
          {t('navigationBand.knittingSaturday')}
        </Typography>
        <Typography size="md" weight="regular">
          {t('navigationBand.linksBelow')}
        </Typography>
      </InfoSectionWrapper>

      <RowLayout wide justify="center" gap="xxl">
        <IconButton onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}>
          <Icon size="xl" zIndex={0} src={blueTicketsIconUrl} />
          <Typography size="sm">{t('tickets.clickHere')}</Typography>
        </IconButton>

        <IconButton onClick={() => (window.location.href = '/home#vendors')}>
          <Icon size="xl" zIndex={0} src={storeIconUrl} />
          <Typography size="sm">{t('tickets.clickHere')}</Typography>
        </IconButton>

        <IconButton onClick={() => (window.location.href = '/home#location')}>
          <Icon size="xl" zIndex={0} src={redMapMarkerIconUrl} />
          <Typography size="sm">{t('tickets.clickHere')}</Typography>
        </IconButton>

        <IconButton onClick={() => (window.location.href = '/home#cruise')}>
          <Icon size="xl" zIndex={0} src={shipIconUrl} />
          <Typography size="sm">{t('tickets.clickHere')}</Typography>
        </IconButton>

        <IconButton onClick={() => (window.location.href = '/home#food')}>
          <IconifyIcon icon="fxemoji:hamburger" width={sizeToIconWidth['xl']}></IconifyIcon>
          <Typography size="sm">{t('tickets.clickHere')}</Typography>
        </IconButton>

        <IconButton onClick={() => window.open('/hall', '_blank')}>
          <Icon size="xl" zIndex={0} src={mapIcon} />
          <Typography size="sm">{t('tickets.clickHere')}</Typography>
        </IconButton>
      </RowLayout>
    </Band.NarrowColumn>
  );
};
