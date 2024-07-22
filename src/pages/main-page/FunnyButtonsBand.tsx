import { BackgroundImage, ButtonsLayout, MobileBasicInfoSection, SectionWrapper } from './MainPage.styled';
import knitting2ImageUrl from '../../assets/images/knitting2.svg';
import { Colors } from '../../styles/theme';
import React, { useMemo, useRef } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { usePhone } from '../../hooks/usePhone';
import { FunnyButton } from '../../components/FunnyButton';
import { Icon } from '../../components/Icon';
import ticketImageUrl from '../../assets/iconify/ticket.svg';
import shopImageUrl from '../../assets/iconify/shop.svg';
import pinBlackImageUrl from '../../assets/iconify/pinBlack.svg';
import pizzaImageUrl from '../../assets/iconify/pizza.svg';
import ferryImageUrl from '../../assets/iconify/ferry.svg';
import mapImageUrl from '../../assets/iconify/worldmap.svg';
import styled from 'styled-components';
import { Typography } from '../../components/Typography';
import { BandTitle } from '../../components/bands/BandTitle';
import { SolidBackgroundBand } from '../../components/bands/SolidBackgroundBand';

const InfoSectionWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export const FunnyButtonsBand = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  const ticketsFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const vendorsFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const geoFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const foodFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const shipFunnyButtonRef = useRef<HTMLDivElement | null>(null);
  const hallMapFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  const infoSectionButtons = useMemo(
    () => (
      <ButtonsLayout>
        <FunnyButton
          icon={<Icon size="xl" zIndex={0} src={ticketImageUrl} />}
          text={t('buttonsBand.tickets.text')}
          ref={ticketsFunnyButtonRef}
          onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}
        />
        <FunnyButton
          ref={vendorsFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={shopImageUrl} />}
          text={t('buttonsBand.vendors.text')}
          onClick={() => (window.location.href = '/home#vendors')}
        />
        <FunnyButton
          ref={geoFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={pinBlackImageUrl} />}
          text={t('buttonsBand.location.text')}
          onClick={() => (window.location.href = '/home#location')}
        />
        <FunnyButton
          ref={foodFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={pizzaImageUrl} />}
          text={t('buttonsBand.foodButton')}
          onClick={() => (window.location.href = '/home#food')}
        />
        <FunnyButton
          icon={<Icon size="xl" zIndex={0} src={ferryImageUrl} />}
          text={t('buttonsBand.cruiseButton')}
          ref={shipFunnyButtonRef}
          onClick={() => (window.location.href = '/home#cruise')}
        />
        <FunnyButton
          ref={hallMapFunnyButtonRef}
          icon={<Icon size="xl" zIndex={0} src={mapImageUrl} />}
          text={t('buttonsBand.hallMap')}
          onClick={() => window.open('/hall', '_blank')}
        />
      </ButtonsLayout>
    ),
    [t]
  );

  if (isPhone) {
    return (
      <MobileBasicInfoSection zIndex={1} backgroundUrl={knitting2ImageUrl}>
        <InfoSectionWrapper>
          <Typography size="lg" weight="bold">
            {t('buttonsBand.anotherEdition')}
          </Typography>
          <Typography size="md" weight="regular">
            {t('buttonsBand.linksBelow')}
          </Typography>
        </InfoSectionWrapper>
        {infoSectionButtons}
      </MobileBasicInfoSection>
    );
  }

  return (
    <SolidBackgroundBand size="md" color={Colors.pastelGray} padding="xl" maxWidth="80%" align="center">
      <BackgroundImage src={knitting2ImageUrl} alt="wool_skeins_background" />

      <SectionWrapper>
        <InfoSectionWrapper>
          <BandTitle>{t('buttonsBand.anotherEdition')}</BandTitle>
          <Typography size="lg" weight="regular">
            {t('buttonsBand.linksBelow')}
          </Typography>
        </InfoSectionWrapper>
        {infoSectionButtons}
      </SectionWrapper>
    </SolidBackgroundBand>
  );
};
