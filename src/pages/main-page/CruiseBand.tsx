import { Band } from '../../components/Band';
import shipAvifSrc from '../../assets/images/ship.avif';
import shipJpgSrc from '../../assets/images/ship.jpg';
import { Carouselge } from '../../components/Carouselge';
import waterWebpSrc from '../../assets/images/water.webp';
import waterJpgSrc from '../../assets/images/water.jpg';
import { TextWrapper } from '../../components/Title';
import { LinkWrapper, Text, TextH2, Typography } from './MainPage.styled';
import wineAvifSrc from '../../assets/images/wine.avif';
import wineWebpSrc from '../../assets/images/wine.webp';
import wineJpgSrc from '../../assets/images/wine.jpg';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import ticketAvifSrc from '../../assets/images/ticket.avif';
import ticketWebpSrc from '../../assets/images/ticket.webp';
import ticketJpgSrc from '../../assets/images/ticket.jpg';
import { Link } from '../../components/Link';
import { Trans } from 'react-i18next';
import mapWebpSrc from '../../assets/images/map.webp';
import mapJpgSrc from '../../assets/images/map.jpg';
import { CruiseMap } from '../../components/CruiseMap';
import React, { useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

type CruiseBandType = {
  id: string;
};

export const CruiseBand = ({ id }: CruiseBandType) => {
  const t = useTypedTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Band
      id={id}
      size="lg"
      narrowContent="auto"
      variant="background-image"
      justify="flex-end"
      background={
        <Band.Picture opacity={0.8} objectFit="cover" filter="grayscale(0.2) brightness(1.3) contrast(0.8)">
          <source srcSet={shipAvifSrc} type="image/avif" />
          <img loading="lazy" src={shipJpgSrc} alt="sailing ship" />
        </Band.Picture>
      }>
      <Band.Slot alignItems="flex-end" width="100%">
        <Carouselge
          height="600px"
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}
          indicators="white">
          <Carouselge.Item>
            <Carouselge.ItemBackground
              variant="bottom"
              background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 95%)">
              <source srcSet={waterWebpSrc} type="image/webp" />
              <img src={waterJpgSrc} alt="water visible on the ship" />
            </Carouselge.ItemBackground>

            <TextWrapper>
              <Typography size="xl" weight="bold">
                {t('cashmereTicketsBand.beautifulCruise')}
              </Typography>
            </TextWrapper>

            <TextH2>{t('cashmereTicketsBand.invitation')}</TextH2>
            <TextH2>{t('cashmereTicketsBand.ship')}</TextH2>
          </Carouselge.Item>

          <Carouselge.Item>
            <Carouselge.ItemBackground
              background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)"
              variant="bottom">
              <source srcSet={wineAvifSrc} type="image/avif" />
              <source srcSet={wineWebpSrc} type="image/webp" />
              <img src={wineJpgSrc} alt="glass of wine" />
            </Carouselge.ItemBackground>

            <TextWrapper>
              <Typography size="xl" weight="bold">
                {t('cashmereTicketsBand.prosecco.title')}
              </Typography>
            </TextWrapper>

            <FlexColumnLayout gap="sm" padding="none" align="flex-start">
              <Text>{t('cashmereTicketsBand.prosecco.intro')}</Text>
              <Text>{t('cashmereTicketsBand.prosecco.description')}</Text>
            </FlexColumnLayout>
          </Carouselge.Item>

          <Carouselge.Item>
            <Carouselge.ItemBackground
              variant="bottom"
              background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)">
              <source srcSet={ticketAvifSrc} type="image/avif" />
              <source srcSet={ticketWebpSrc} type="image/webp" />
              <img src={ticketJpgSrc} alt="ticket lying around" />
            </Carouselge.ItemBackground>

            <FlexColumnLayout gap="sm" padding="none" align="flex-start">
              <TextWrapper>
                <Typography size="xl" weight="bold">
                  {t('cashmereTicketsBand.tickets')}
                </Typography>
              </TextWrapper>

              <LinkWrapper>
                <Link target="_blank" to="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833">
                  {t('cashmereTicketsBand.buyTickets')}
                </Link>
              </LinkWrapper>

              <FlexColumnLayout gap="sm" padding="none" align="flex-start">
                <Typography size="xl" weight="bold">
                  {t('cashmereTicketsBand.map.price')}:
                </Typography>
                <Text marginTop="none">130 zł </Text>
                <Text marginTop="none">
                  <Trans i18nKey="cashmereTicketsBand.map.priceIncludesYarnmarkTicket" />
                </Text>
              </FlexColumnLayout>
            </FlexColumnLayout>
          </Carouselge.Item>

          <Carouselge.Item>
            <Carouselge.ItemBackground
              variant="bottom"
              background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)">
              <source srcSet={mapWebpSrc} type="image/webp" />
              <img src={mapJpgSrc} alt="map" />
            </Carouselge.ItemBackground>

            <CruiseMap />
          </Carouselge.Item>
        </Carouselge>
      </Band.Slot>
    </Band>
  );
};
