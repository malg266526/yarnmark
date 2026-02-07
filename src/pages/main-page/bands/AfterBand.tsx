import { Carouselge } from '../../../components/carousels/Carouselge';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Trans } from 'react-i18next';
import { AfterPartySection } from '../../../components/AfterPartySection';
import React, { useState } from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Typography } from '../../../components/Typography';
import { BackgroundPicture } from '../../../components/BackgroundPicture';
import { Band } from '../../../components/bands/Band';
import { usePhone } from '../../../hooks/usePhone';
import { Link } from '../../../components/Link';
import { LinkWrapper } from '../MainPage.styled';
import tapsJpgSrc from '../../../assets/images/after/taps_wide.jpg';
import tapsAvifSrc from '../../../assets/images/after/taps_wide.avif';
import tapsWebpSrc from '../../../assets/images/after/taps_wide.webp';
import hopJpgSrc from '../../../assets/images/after/hop.jpg';
import hopAvifSrc from '../../../assets/images/after/hop.avif';
import hopWebpSrc from '../../../assets/images/after/hop.webp';
import krakowJpgSrc from '../../../assets/images/after/krakow.jpg';
import krakowAvifSrc from '../../../assets/images/after/krakow.avif';
import krakowWebpSrc from '../../../assets/images/after/krakow.webp';
import ticketJpgSrc from '../../../assets/images/after/entry-ticket.jpg';
import ticketAvifSrc from '../../../assets/images/after/entry-ticket.avif';
import ticketWebpSrc from '../../../assets/images/after/entry-ticket.webp';
import raveJpgSrc from '../../../assets/images/after/rave2.jpg';
import raveAvifSrc from '../../../assets/images/after/rave2.avif';
import raveWebpSrc from '../../../assets/images/after/rave2.webp';

type CruiseBandType = {
  id: string;
};

const TapsPicture = (
  <BackgroundPicture filter="grayscale(0.1) brightness(1.3) contrast(0.8)" opacity={0.8} objectFit="cover">
    <source srcSet={tapsAvifSrc} type="image/avif" />
    <source srcSet={tapsWebpSrc} type="image/webp" />
    <img loading="lazy" src={tapsJpgSrc} alt="taps" />
  </BackgroundPicture>
);

export const AfterBand = ({ id }: CruiseBandType) => {
  const isPhone = usePhone();
  const t = useTypedTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionTitleSize = isPhone ? 'lg' : 'xl';

  return (
    <Band.Wallpaper id={id} size="lg" justify="flex-end" picture={TapsPicture} padding={isPhone ? 'sm' : 'xl'}>
      <Carouselge
        height="600px"
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
        indicators="white"
      >
        <Carouselge.Item>
          <Carouselge.ItemBackground
            variant="bottom"
            background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 95%)"
          >
            <source srcSet={hopAvifSrc} type="image/avif" />
            <source srcSet={hopWebpSrc} type="image/webp" />
            <img src={hopJpgSrc} alt="hop" />
          </Carouselge.ItemBackground>

          <FlexColumnLayout gap="sm" padding="none" align="flex-start">
            <Typography size={sectionTitleSize} weight="bold">
              {t('after.title')}
            </Typography>

            <Typography size="sm">
              <Trans>{t('after.invitation')}</Trans>
            </Typography>
          </FlexColumnLayout>
        </Carouselge.Item>

        <Carouselge.Item>
          <Carouselge.ItemBackground
            background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)"
            variant="bottom"
          >
            <source srcSet={krakowAvifSrc} type="image/avif" />
            <source srcSet={krakowWebpSrc} type="image/webp" />
            <img src={krakowJpgSrc} alt="krakow" />
          </Carouselge.ItemBackground>

          <FlexColumnLayout gap="sm" padding="none" align="flex-start">
            <Typography size={sectionTitleSize} weight="bold">
              {t('after.location')}
            </Typography>

            <Typography size="sm">{t('after.addressFull')}</Typography>

            <Typography size="sm">{t('after.hob')}</Typography>
            <Typography size="sm">{t('after.closeToMainStation')}</Typography>

            <Typography size={sectionTitleSize} weight="bold">
              {t('after.startTime')}
            </Typography>

            <Typography size="sm">{t('after.timeDetails')}</Typography>
          </FlexColumnLayout>
        </Carouselge.Item>

        <Carouselge.Item>
          <Carouselge.ItemBackground
            variant="bottom"
            background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)"
          >
            <source srcSet={ticketAvifSrc} type="image/avif" />
            <source srcSet={ticketWebpSrc} type="image/webp" />
            <img src={ticketJpgSrc} alt="ticket" />
          </Carouselge.ItemBackground>

          <FlexColumnLayout gap="sm" padding="none" align="flex-start">
            <Typography size={sectionTitleSize} weight="bold">
              {t('cashmereTicketsBand.tickets')}
            </Typography>

            <LinkWrapper>
              <Link
                disabled
                target="_blank"
                to="https://wloczykijki.pl/pl_PL/p/Bilet-wstepu-na-Krakoski-Yarnmark-2025-REJS/3451"
              >
                {t('cashmereTicketsBand.buyTickets')}
              </Link>
            </LinkWrapper>

            <FlexColumnLayout gap="sm" padding="none" align="flex-start">
              <Typography size={sectionTitleSize} weight="bold">
                {t('cashmereTicketsBand.map.price')}:
              </Typography>
              <Typography size="md" weight="bold">
                80 zł
              </Typography>
              <Typography size="sm">
                <Trans i18nKey="after.priceIncluded" />
              </Typography>
              <Typography size="sm">
                <Trans i18nKey="after.token" />
              </Typography>
              <Typography size="sm" weight="bold">
                {t('after.onlyAdults')}
              </Typography>
            </FlexColumnLayout>
          </FlexColumnLayout>
        </Carouselge.Item>

        <Carouselge.Item>
          <Carouselge.ItemBackground
            variant="bottom"
            background="linear-gradient(0deg, transparent 0%, rgb(255, 255, 255) 80%)"
          >
            <source srcSet={raveAvifSrc} type="image/avif" />
            <source srcSet={raveWebpSrc} type="image/webp" />
            <img src={raveJpgSrc} alt="rave" />
          </Carouselge.ItemBackground>

          <AfterPartySection />
        </Carouselge.Item>
      </Carouselge>
    </Band.Wallpaper>
  );
};
