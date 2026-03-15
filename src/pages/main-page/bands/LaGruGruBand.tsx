import React from 'react';
import styled from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { Picture } from '../../../components/Picture';
import { usePhone } from '../../../hooks/usePhone';
import { RedesignSpacings } from '../../../styles/spacings';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { TextCarousel, TextCarouselItem } from '../../../components/carousels/TextCarousel';
import { SlantedCornersBox } from '../../../components/SlantedCornersBox';

import lagrugruJpg from '../../../assets/images/lagrugru/DSC04493.jpg';
import lagrugruWebp from '../../../assets/images/lagrugru/DSC04493.webp';
import lagrugruAvif from '../../../assets/images/lagrugru/DSC04493.avif';

interface StyledProps {
  isPhone: boolean;
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
  flex-direction: ${({ isPhone }) => (isPhone ? 'column' : 'row')};
  width: ${({ isPhone }) => (isPhone ? '100%' : '80%')};
  align-items: center;
  justify-content: center;
  gap: ${({ isPhone }) => (isPhone ? RedesignSpacings.lg : RedesignSpacings.xl)};
  margin-top: ${({ isPhone }) => (isPhone ? RedesignSpacings.md : RedesignSpacings.xl)};

  > div {
    flex: 1;
    width: ${({ isPhone }) => (isPhone ? '100%' : '50%')};
    display: flex;
    justify-content: center;
  }
`;

export const LaGruGruBand = () => {
  const isPhone = usePhone();
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
      description: 'lagrugruBand.slide2.description'
    },
    {
      title: 'lagrugruBand.slide4.title',
      subtitle: 'lagrugruBand.slide4.subtitle',
      description: 'lagrugruBand.slide4.description',
      isHighlighted: true
    }
  ];

  return (
    <Band.CenteredColumn id="lagrugru" size="lg" color={BackgroundColors.card} padding={isPhone ? 'lg' : 'xxxl'}>
      <Band.Title>{t('lagrugruBand.title')}</Band.Title>

      <TwoColumnLayout isPhone={isPhone}>
        <div>
          <SlantedCornersBox width={isPhone ? '100%' : '700px'} padding="none" overflowSize="10px">
            <Picture picture={lagrugruPictureConfig} alt="Grupa LaGruGru" width={isPhone ? 300 : 700} />
          </SlantedCornersBox>
        </div>

        <div>
          <TextCarousel items={carouselItems} />
        </div>
      </TwoColumnLayout>
    </Band.CenteredColumn>
  );
};
