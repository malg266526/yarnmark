import shipAvifSrc from '../../assets/images/ship.avif';
import shipJpgSrc from '../../assets/images/ship.jpg';
import { Carouselge } from '../../components/carousels/Carouselge';
import waterWebpSrc from '../../assets/images/water.webp';
import waterJpgSrc from '../../assets/images/water.jpg';
import wineAvifSrc from '../../assets/images/wine.avif';
import wineWebpSrc from '../../assets/images/wine.webp';
import wineJpgSrc from '../../assets/images/wine.jpg';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import ticketAvifSrc from '../../assets/images/ticket.avif';
import ticketWebpSrc from '../../assets/images/ticket.webp';
import ticketJpgSrc from '../../assets/images/ticket.jpg';
import { Trans } from 'react-i18next';
import mapWebpSrc from '../../assets/images/map.webp';
import mapJpgSrc from '../../assets/images/map.jpg';
import { CruiseMap } from '../../components/CruiseMap';
import React, { useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Typography } from '../../components/Typography';
import { BackgroundPicture } from '../../components/BackgroundPicture';
import { Band } from '../../components/bands/Band';
import { usePhone } from '../../hooks/usePhone';
import { Link } from '../../components/Link';
import { LinkWrapper } from './MainPage.styled';

type CruiseBandType = {
  id: string;
};

const ShipPicture = (
  <BackgroundPicture filter="grayscale(0.2) brightness(1.3) contrast(0.8)" opacity={0.8} objectFit="cover">
    <source srcSet={shipAvifSrc} type="image/avif" />
    <img loading="lazy" src={shipJpgSrc} alt="sailing ship" />
  </BackgroundPicture>
);

export const CruiseBand = ({ id }: CruiseBandType) => {
  const isPhone = usePhone();
  const t = useTypedTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionTitleSize = isPhone ? 'lg' : 'xl';

  return (
    <Band.Wallpaper id={id} size="lg" justify="flex-end" picture={ShipPicture} padding={isPhone ? 'sm' : 'xl'}>
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

          <FlexColumnLayout gap="sm" padding="none" align="flex-start">
            <Typography size={sectionTitleSize} weight="bold">
              {t('cashmereTicketsBand.beautifulCruise')}
            </Typography>

            <Typography size="sm">{t('cashmereTicketsBand.invitation')}</Typography>
            <Typography size="sm">{t('cashmereTicketsBand.ship')}</Typography>
          </FlexColumnLayout>
        </Carouselge.Item>

        <Carouselge.Item>
          <Carouselge.ItemBackground
            background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)"
            variant="bottom">
            <source srcSet={wineAvifSrc} type="image/avif" />
            <source srcSet={wineWebpSrc} type="image/webp" />
            <img src={wineJpgSrc} alt="glass of wine" />
          </Carouselge.ItemBackground>

          <FlexColumnLayout gap="sm" padding="none" align="flex-start">
            <Typography size={sectionTitleSize} weight="bold">
              {t('cashmereTicketsBand.prosecco.title')}
            </Typography>

            <Typography size="sm">{t('cashmereTicketsBand.prosecco.intro')}</Typography>
            <Typography size="sm">{t('cashmereTicketsBand.prosecco.description')}</Typography>
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
            <Typography size={sectionTitleSize} weight="bold">
              {t('cashmereTicketsBand.tickets')}
            </Typography>

            <LinkWrapper>
              <Link
                target="_blank"
                to="https://wloczykijki.pl/pl_PL/p/Bilet-wstepu-na-Krakoski-Yarnmark-2025-REJS/3451">
                {t('cashmereTicketsBand.buyTickets')}
              </Link>
            </LinkWrapper>

            <FlexColumnLayout gap="sm" padding="none" align="flex-start">
              <Typography size={sectionTitleSize} weight="bold">
                {t('cashmereTicketsBand.map.price')}:
              </Typography>
              <Typography size="sm">130 zł </Typography>
              <Typography size="sm">
                <Trans i18nKey="cashmereTicketsBand.map.priceIncludesYarnmarkTicket" />
              </Typography>
              <Typography size="sm">
                <Trans i18nKey="cashmereTicketsBand.pleaseBeEarly" />
              </Typography>
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
    </Band.Wallpaper>
  );
};
