import React from 'react';
import styled from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { Picture } from '../../../components/Picture';
import { useTablet } from '../../../hooks/usePhone';
import { RedesignSpacings } from '../../../styles/spacings';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { TextCarousel, TextCarouselItem } from '../../../components/carousels/TextCarousel';
import { SlantedCornersBox } from '../../../components/SlantedCornersBox';

import lagrugruJpg from '../../../assets/images/lagrugru/DSC04493.jpg';
import lagrugruWebp from '../../../assets/images/lagrugru/DSC04493.webp';
import lagrugruAvif from '../../../assets/images/lagrugru/DSC04493.avif';
import slide4Jpg from '../../../assets/images/lagrugru/DSC04495.jpg';
import slide4Webp from '../../../assets/images/lagrugru/DSC04495.webp';
import slide4Avif from '../../../assets/images/lagrugru/DSC04495.avif';

interface StyledProps {
  isTablet: boolean;
}

const lagrugruPictureConfig = {
  fallbackUrl: lagrugruJpg,
  sources: [
    {
      type: 'image/avif',
      url: lagrugruAvif
    },
    {
      type: 'image/webp',
      url: lagrugruWebp
    }
  ]
};

const TwoColumnLayout = styled.div<StyledProps>`
  display: flex;
  flex-direction: ${({ isTablet }) => (isTablet ? 'column' : 'row')};
  width: ${({ isTablet }) => (isTablet ? '100%' : '80%')};
  align-items: center;
  justify-content: center;
  gap: ${({ isTablet }) => (isTablet ? RedesignSpacings.lg : RedesignSpacings.xl)};
  margin-top: ${({ isTablet }) => (isTablet ? RedesignSpacings.md : RedesignSpacings.xl)};
`;

const Column = styled.div<{ isTablet: boolean; width?: string }>`
  flex: 1;
  width: ${({ isTablet, width }) => (isTablet ? '100%' : width || '50%')};
  display: flex;
  justify-content: center;
`;

const slide4PictureConfig = {
  fallbackUrl: slide4Jpg,
  sources: [
    { type: 'image/avif', url: slide4Avif },
    { type: 'image/webp', url: slide4Webp }
  ]
};

export const LaGruGruBand = () => {
  const isTablet = useTablet();
  const t = useTypedTranslation();

  const carouselItems: TextCarouselItem[] = [
    {
      title: 'lagrugruBand.slide1.title',
      subtitle: 'lagrugruBand.slide1.subtitle',
      description: 'lagrugruBand.slide1.description'
    },
    {
      title: 'lagrugruBand.slide2.title',
      subtitle: 'lagrugruBand.slide2.subtitle',
      description: 'lagrugruBand.slide2.description',
      isHighlighted: true
    },
    {
      title: 'lagrugruBand.slide4.title',
      subtitle: 'lagrugruBand.slide4.subtitle',
      description: 'lagrugruBand.slide4.description',
      button: {
        title: 'LaGruGru',
        callback: () => window.open('https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-La-Gru-Gru/524', '_blank')
      }
    },
    {
      title: 'lagrugruBand.slide5.title',
      subtitle: 'lagrugruBand.slide5.subtitle',
      description: 'lagrugruBand.slide5.description'
    }
  ];

  return (
    <Band.CenteredColumn id="lagrugru" size="lg" color={BackgroundColors.card} padding={isTablet ? 'lg' : 'xxl'}>
      <Band.Title>{t('lagrugruBand.title')}</Band.Title>

      <TwoColumnLayout isTablet={isTablet}>
        {!isTablet && (
          <Column isTablet={isTablet} width="45%">
            <SlantedCornersBox width="500px" padding="none" overflowSize="10px">
              <Picture picture={lagrugruPictureConfig} alt="Grupa LaGruGru" width={500} />
            </SlantedCornersBox>
          </Column>
        )}

        <Column isTablet={isTablet} width="65%">
          <TextCarousel items={carouselItems} backgroundImage={slide4PictureConfig} />
        </Column>
      </TwoColumnLayout>
    </Band.CenteredColumn>
  );
};
