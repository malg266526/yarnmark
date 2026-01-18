import React, { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { RowLayout } from '../../../components/RowLayout';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Typography } from '../../../components/Typography';
import { Picture } from '../../../components/Picture';
import { usePhone } from '../../../hooks/usePhone';
import { RedesignSpacings } from '../../../styles/spacings';

import grupoweAvifSrc from '../../../assets/napole/grupowe.avif';
import grupoweWebpSrc from '../../../assets/napole/grupowe.webp';
import grupoweJpgSrc from '../../../assets/napole/grupowe.jpeg';

interface StyledProps {
  isPhone: boolean;
}

const ContentWrapper = styled(RowLayout)<StyledProps>`
  width: 100%;
  max-width: 1100px;
  gap: ${({ isPhone }) => (isPhone ? RedesignSpacings.lg : '60px')}; // Większy odstęp między foto a tekstem
  align-items: center;
  flex-direction: ${({ isPhone }) => (isPhone ? 'column' : 'row')};
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }
`;

const TextCarouselWrapper = styled.div<StyledProps>`
  flex: 1.2;
  background-color: ${BackgroundColors.green.light};
  border-left: 8px solid ${BackgroundColors.green.medium};
  border-radius: 8px 24px 24px 8px;

  /* Sztywna wysokość zapobiega skakaniu strony */
  height: ${({ isPhone }) => (isPhone ? 'auto' : '380px')};
  min-height: ${({ isPhone }) => (isPhone ? '300px' : '380px')};

  display: flex;
  flex-direction: column;
  overflow: hidden;

  .carousel {
    height: 100%;
  }

  .carousel-inner {
    height: 100%;
  }

  .carousel-item {
    height: 100%;
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 8%;
    filter: invert(0.5) sepia(1) saturate(3) hue-rotate(60deg);
  }

  .carousel-indicators {
    bottom: 10px;
    [data-bs-target] {
      background-color: ${BackgroundColors.green.strong};
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  }
`;

const SlideContent = styled(FlexColumnLayout)`
  padding: ${RedesignSpacings.xl} ${RedesignSpacings.xxl};
  height: 100%;
  justify-content: center;
  text-align: left;
`;

export const LaGruGruBand = () => {
  const [index, setIndex] = useState<number>(0);
  const isPhone = usePhone();

  const groupPictureConfig = {
    fallbackUrl: grupoweJpgSrc,
    sources: [
      { type: 'image/webp', url: grupoweWebpSrc },
      { type: 'image/avif', url: grupoweAvifSrc }
    ]
  };

  return (
    <Band.CenteredColumn
      id="lagrugru"
      size="lg"
      color={BackgroundColors.card}
      padding={isPhone ? 'lg' : 'xxxl'}
      gap="xl"
    >
      <Band.Title>LaGruGru</Band.Title>

      <ContentWrapper isPhone={isPhone}>
        <ImageContainer>
          <Picture picture={groupPictureConfig} alt="Grupa LaGruGru" width={isPhone ? 320 : 520} />
        </ImageContainer>

        <TextCarouselWrapper isPhone={isPhone}>
          <Carousel
            activeIndex={index}
            onSelect={(idx) => setIndex(idx)}
            interval={6000}
            indicators={true}
            controls={!isPhone}
            fade
          >
            <Carousel.Item>
              <SlideContent padding="none" gap="md" align="flex-start">
                <Typography size="xl" weight="bold">
                  Kim jesteśmy?
                </Typography>
                <Typography size="lg">
                  Jesteśmy grupą pasjonatów dziergania, która udowadnia, że rzemiosło to nie tylko hobby, ale przede
                  wszystkim sposób na budowanie fantastycznej społeczności.
                </Typography>
              </SlideContent>
            </Carousel.Item>

            <Carousel.Item>
              <SlideContent padding="none" gap="md" align="flex-start">
                <Typography size="xl" weight="bold">
                  Nasze spotkania
                </Typography>
                <Typography size="lg">
                  Spotykamy się regularnie, aby wspólnie tworzyć, wymieniać się doświadczeniami i inspirować nawzajem
                  nowymi splotami w luźnej, przyjaznej atmosferze.
                </Typography>
              </SlideContent>
            </Carousel.Item>

            <Carousel.Item>
              <SlideContent padding="none" gap="md" align="flex-start">
                <Typography size="xl" weight="bold">
                  Dołącz do nas
                </Typography>
                <Typography size="lg">
                  Niezależnie od poziomu umiejętności, w LaGruGru zawsze znajdzie się miejsce dla kolejnej pary rąk i
                  głowy pełnej kreatywnych pomysłów.
                </Typography>
              </SlideContent>
            </Carousel.Item>
          </Carousel>
        </TextCarouselWrapper>
      </ContentWrapper>
    </Band.CenteredColumn>
  );
};
