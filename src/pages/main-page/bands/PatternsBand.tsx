import React, { useState } from 'react';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { RowLayout } from '../../../components/RowLayout';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Typography } from '../../../components/Typography';
import { Carousel } from 'react-bootstrap';
import { Link, SecondaryLink } from '../../../components/Link';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';

import napoleAvifSrc from '../../../assets/napole/napole.avif';
import napoleWebpSrc from '../../../assets/napole/napole.webp';
import napoleJpgSrc from '../../../assets/napole/napole.jpg';

import napole1AvifSrc from '../../../assets/napole/napole1.avif';
import napole1WebpSrc from '../../../assets/napole/napole1.webp';
import napole1JpgSrc from '../../../assets/napole/napole1.jpg';

import napole2AvifSrc from '../../../assets/napole/napole2.avif';
import napole2WebpSrc from '../../../assets/napole/napole2.webp';
import napole2JpgSrc from '../../../assets/napole/napole2.jpeg';

import grupoweAvifSrc from '../../../assets/napole/grupowe.avif';
import grupoweWebpSrc from '../../../assets/napole/grupowe.webp';
import grupoweJpgSrc from '../../../assets/napole/grupowe.jpeg';

import styled from 'styled-components';

const CarouselContainer = styled.div`
  /* flex-grow: 0, flex-shrink: 0, flex-basis: 60% */
  flex: 0 0 60%;

  width: 60%;
  max-width: 60%;

  overflow: hidden;
  // aspect-ratio: 16 / 9;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
`;

const RowContent = styled(RowLayout)`
  width: 80%;
`;

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

      <RowContent justify="space-between">
        <CarouselContainer>
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
                <source srcSet={grupoweAvifSrc} type="image/avif" />
                <source srcSet={grupoweWebpSrc} type="image/webp" />
                <CarouselImage loading="lazy" src={grupoweJpgSrc} alt={t('patternsBand.slides.wineAlt')} />
              </picture>
            </Carousel.Item>

            <Carousel.Item>
              <picture>
                <source srcSet={napole2AvifSrc} type="image/avif" />
                <source srcSet={napole2WebpSrc} type="image/webp" />
                <CarouselImage loading="lazy" src={napole2JpgSrc} alt={t('patternsBand.slides.wineAlt')} />
              </picture>
            </Carousel.Item>

            <Carousel.Item>
              <picture>
                <source srcSet={napole1AvifSrc} type="image/avif" />
                <source srcSet={napole1WebpSrc} type="image/webp" />
                <CarouselImage loading="lazy" src={napole1JpgSrc} alt={t('patternsBand.slides.wineAlt')} />
              </picture>
            </Carousel.Item>

            <Carousel.Item>
              <picture>
                <source srcSet={napoleAvifSrc} type="image/avif" />
                <source srcSet={napoleWebpSrc} type="image/webp" />
                <CarouselImage loading="lazy" src={napoleJpgSrc} alt={t('patternsBand.slides.wineAlt')} />
              </picture>
            </Carousel.Item>

            {/*<Carousel.Item>*/}
            {/*  <picture>*/}
            {/*    <source srcSet={ticketAvifSrc} type="image/avif" />*/}
            {/*    <source srcSet={ticketWebpSrc} type="image/webp" />*/}
            {/*    <CarouselImage loading="lazy" src={ticketJpgSrc} alt={t('patternsBand.slides.ticketAlt')} />*/}
            {/*  </picture>*/}
            {/*</Carousel.Item>*/}

            {/*<Carousel.Item>*/}
            {/*  <picture>*/}
            {/*    <source srcSet={mapWebpSrc} type="image/webp" />*/}
            {/*    <CarouselImage loading="lazy" src={mapJpgSrc} alt={t('patternsBand.slides.mapAlt')} />*/}
            {/*  </picture>*/}
            {/*</Carousel.Item>*/}
          </Carousel>
        </CarouselContainer>

        <FlexColumnLayout padding="none" gap="md" style={{ flex: '0 0 32%', maxWidth: '32%' }}>
          <FlexColumnLayout padding="none" gap="xs">
            <Typography size="lg" weight="bold">
              {t('patternsBand.patterns.naPoleTee.title')}
            </Typography>
            <Link to="https://www.ravelry.com/patterns/library/na-pole-tee" target="_blank" rel="noreferrer">
              {t('patternsBand.viewOnRavelry')}
            </Link>
            <Typography size="md">
              {t('patternsBand.authorship.monikaPrefix')}{' '}
              <SecondaryLink to="https://www.instagram.com/made_me_knit/" target="_blank" rel="noreferrer">
                @made_me_knit
              </SecondaryLink>
            </Typography>
          </FlexColumnLayout>

          <FlexColumnLayout padding="none" gap="xs">
            <Typography size="lg" weight="bold">
              {t('patternsBand.patterns.atropa.title')}
            </Typography>
            <Link to="https://www.ravelry.com/patterns/library/atropa-2" target="_blank" rel="noreferrer">
              {t('patternsBand.viewOnRavelry')}
            </Link>
            <Typography size="md">
              {t('patternsBand.authorship.annaPrefix')}{' '}
              <SecondaryLink to="https://www.instagram.com/moracraft.handmade/" target="_blank" rel="noreferrer">
                @moracraft.handmade
              </SecondaryLink>
            </Typography>
          </FlexColumnLayout>
        </FlexColumnLayout>
      </RowContent>
    </Band.CenteredColumn>
  );
};
