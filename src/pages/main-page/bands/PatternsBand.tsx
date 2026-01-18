import React, { useState } from 'react';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { RowLayout } from '../../../components/RowLayout';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Typography } from '../../../components/Typography';
import { Link, SecondaryLink } from '../../../components/Link';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';

import grupoweAvifSrc from '../../../assets/napole/grupowe.avif';
import grupoweWebpSrc from '../../../assets/napole/grupowe.webp';
import grupoweJpgSrc from '../../../assets/napole/grupowe.jpeg';

import napoleAvifSrc from '../../../assets/napole/napole.avif';
import napoleWebpSrc from '../../../assets/napole/napole.webp';
import napoleJpgSrc from '../../../assets/napole/napole.jpg';

import napole2AvifSrc from '../../../assets/napole/napole2.avif';
import napole2WebpSrc from '../../../assets/napole/napole2.webp';
import napole2JpgSrc from '../../../assets/napole/napole2.jpeg';

import styled from 'styled-components';
import { Picture } from '../../../components/Picture';
import { Carousel } from 'react-bootstrap';
import { usePhone } from '../../../hooks/usePhone';

const CarouselContainer = styled.div`
  /* Let the content (vertical photos) define the height */
  width: 90%;
  max-width: 90%;
  margin: 0 auto;
`;

const CarouselImage = styled.img`
  width: 100%;
  object-fit: contain;
  display: block;
  height: 300px;
  aspect-ratio: 3/4;
`;

const PatternContentContainer = styled(RowLayout)<{ direction: 'row' | 'column' }>`
  width: 100%;
  flex-direction: ${({ direction }) => direction};
  align-items: center;
  text-align: center;
`;

type PatternsBandType = {
  id: string;
};

export const PatternsBand = ({ id }: PatternsBandType) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const t = useTypedTranslation();
  const isPhone = usePhone();

  const contentDirection = isPhone ? 'column' : 'row';

  return (
    <Band.CenteredColumn
      id={id}
      size="md"
      gap={isPhone ? 'sm' : 'lg'}
      padding={isPhone ? 'md' : 'xxxl'}
      color={BackgroundColors.patterns}
      justify="center"
    >
      <Band.Title>{t('patternsBand.title')}</Band.Title>

      <PatternContentContainer direction={contentDirection} justify={isPhone ? 'flex-start' : 'space-evenly'}>
        <FlexColumnLayout padding="none" gap="md">
          <FlexColumnLayout padding="none" gap="xxs">
            <Typography size={isPhone ? 'md' : 'lg'} weight="bold">
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

          <FlexColumnLayout padding="none" gap="xxs">
            <Typography size={isPhone ? 'md' : 'lg'} weight="bold">
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

        {!isPhone && (
          <Picture
            picture={{
              fallbackUrl: grupoweJpgSrc,
              sources: [
                {
                  type: 'image/webp',
                  url: grupoweWebpSrc
                },
                {
                  type: 'image/avif',
                  url: grupoweAvifSrc
                }
              ]
            }}
            alt="yarnmark_girls"
            width={1000}
          />
        )}

        {isPhone && (
          <CarouselContainer>
            <Carousel
              activeIndex={currentSlideIndex}
              onSelect={(selectedIndex) => setCurrentSlideIndex(selectedIndex)}
              controls
              indicators
              interval={3000}
              pause={false}
              fade={false}
            >
              <Carousel.Item>
                <picture>
                  <source srcSet={napole2AvifSrc} type="image/avif" />
                  <source srcSet={napole2WebpSrc} type="image/webp" />
                  <CarouselImage loading="lazy" src={napole2JpgSrc} alt={t('patternsBand.slides.wineAlt')} />
                </picture>
              </Carousel.Item>

              <Carousel.Item>
                <picture>
                  <source srcSet={napoleAvifSrc} type="image/avif" />
                  <source srcSet={napoleWebpSrc} type="image/webp" />
                  <CarouselImage loading="lazy" src={napoleJpgSrc} alt={t('patternsBand.slides.wineAlt')} />
                </picture>
              </Carousel.Item>
            </Carousel>
          </CarouselContainer>
        )}
      </PatternContentContainer>
    </Band.CenteredColumn>
  );
};
