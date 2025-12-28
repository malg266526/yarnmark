import React, { useState } from 'react';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { RowLayout } from '../../../components/RowLayout';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Typography } from '../../../components/Typography';
import { Carousel } from 'react-bootstrap';
import { Link } from '../../../components/Link';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';

// Zdjęcia slajdów – korzystamy z istniejących zasobów z /assets/images
import waterWebpSrc from '../../../assets/images/water.webp';
import waterJpgSrc from '../../../assets/images/water.jpg';
import wineAvifSrc from '../../../assets/images/wine.avif';
import wineWebpSrc from '../../../assets/images/wine.webp';
import wineJpgSrc from '../../../assets/images/wine.jpg';
import ticketAvifSrc from '../../../assets/images/ticket.avif';
import ticketWebpSrc from '../../../assets/images/ticket.webp';
import ticketJpgSrc from '../../../assets/images/ticket.jpg';
import mapWebpSrc from '../../../assets/images/map.webp';
import mapJpgSrc from '../../../assets/images/map.jpg';

export const PatternsBand = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const t = useTypedTranslation();

  return (
    <Band.CenteredColumn
      id="patterns"
      size="md"
      gap="lg"
      padding="xxxl"
      color={BackgroundColors.patterns}
      justify="center"
    >
      <Band.Title>{t('patternsBand.title')}</Band.Title>

      <RowLayout wide justify="space-between" align="flex-start">
        {/* Lewa kolumna: karuzela zdjęć */}
        <div style={{ flex: '0 0 64%', maxWidth: '64%' }}>
          <Carousel
            activeIndex={currentSlideIndex}
            onSelect={(selectedIndex) => setCurrentSlideIndex(selectedIndex)}
            controls
            indicators
            interval={4000}
            pause={false}
            fade={false}
          >
            <Carousel.Item>
              <picture>
                <source srcSet={waterWebpSrc} type="image/webp" />
                <img
                  loading="lazy"
                  src={waterJpgSrc}
                  alt={t('patternsBand.slides.waterAlt')}
                  style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
                />
              </picture>
            </Carousel.Item>

            <Carousel.Item>
              <picture>
                <source srcSet={wineAvifSrc} type="image/avif" />
                <source srcSet={wineWebpSrc} type="image/webp" />
                <img
                  loading="lazy"
                  src={wineJpgSrc}
                  alt={t('patternsBand.slides.wineAlt')}
                  style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
                />
              </picture>
            </Carousel.Item>

            <Carousel.Item>
              <picture>
                <source srcSet={ticketAvifSrc} type="image/avif" />
                <source srcSet={ticketWebpSrc} type="image/webp" />
                <img
                  loading="lazy"
                  src={ticketJpgSrc}
                  alt={t('patternsBand.slides.ticketAlt')}
                  style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
                />
              </picture>
            </Carousel.Item>

            <Carousel.Item>
              <picture>
                <source srcSet={mapWebpSrc} type="image/webp" />
                <img
                  loading="lazy"
                  src={mapJpgSrc}
                  alt={t('patternsBand.slides.mapAlt')}
                  style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
                />
              </picture>
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Prawa kolumna: dwa wzory */}
        <FlexColumnLayout padding="none" gap="md" align="flex-start" style={{ flex: '0 0 32%', maxWidth: '32%' }}>
          <FlexColumnLayout padding="none" gap="xs" align="flex-start">
            <Typography size="lg" weight="bold">{t('patternsBand.patterns.naPoleTee.title')}</Typography>
            <Link to="https://www.ravelry.com/patterns/library/na-pole-tee" target="_blank" rel="noreferrer">
              {t('patternsBand.viewOnRavelry')}
            </Link>
            <Typography size="sm">
              {t('patternsBand.authorship.monikaPrefix')}{' '}
              <Link to="https://www.instagram.com/made_me_knit/" target="_blank" rel="noreferrer">
                @made_me_knit
              </Link>
            </Typography>
          </FlexColumnLayout>

          <FlexColumnLayout padding="none" gap="xs" align="flex-start">
            <Typography size="lg" weight="bold">{t('patternsBand.patterns.atropa.title')}</Typography>
            <Link to="https://www.ravelry.com/patterns/library/atropa-2" target="_blank" rel="noreferrer">
              {t('patternsBand.viewOnRavelry')}
            </Link>
            <Typography size="sm">
              {t('patternsBand.authorship.annaPrefix')}{' '}
              <Link to="https://www.instagram.com/moracraft.handmade/" target="_blank" rel="noreferrer">
                moracraft.handmade
              </Link>
            </Typography>
          </FlexColumnLayout>
        </FlexColumnLayout>
      </RowLayout>
    </Band.CenteredColumn>
  );
};

