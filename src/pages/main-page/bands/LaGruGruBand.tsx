import React, { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { Typography } from '../../../components/Typography';
import { Picture } from '../../../components/Picture';
import { usePhone } from '../../../hooks/usePhone';
import { RedesignSpacings } from '../../../styles/spacings';
import grupoweJpgSrc from '../../../assets/napole/grupowe.jpeg';

interface StyledProps {
  isPhone: boolean;
}

const carouselItems = [
  {
    title: 'Kim jesteśmy?',
    text: 'Grupą pasjonatów, która zamienia rzemiosło w przestrzeń spotkań. Tutaj każde oczko ma swoją historię.'
  },
  {
    title: 'Nasze spotkania',
    text: 'Tworzymy w przyjaznej atmosferze, dzieląc się splotami i inspiracją przy wspólnej kawie.'
  },
  {
    title: 'Dołącz do nas',
    text: 'Niezależnie od Twojego doświadczenia, zawsze znajdziemy miejsce dla kolejnej pary rąk i nowych pomysłów.'
  }
];

const ContentGrid = styled.div<StyledProps>`
  display: grid;
  width: 100%;
  max-width: 1200px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  gap: ${({ isPhone }) => (isPhone ? RedesignSpacings.lg : '0')};
  margin-top: ${({ isPhone }) => (isPhone ? RedesignSpacings.md : RedesignSpacings.xl)};
`;

const ImageWrapper = styled.div<StyledProps>`
  grid-column: ${({ isPhone }) => (isPhone ? '1 / -1' : '1 / 8')};
  grid-row: 1;
  z-index: 1;

  img {
    width: 100%;
    height: auto;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }
`;

const GlassCarouselWrapper = styled.div<StyledProps>`
  grid-column: ${({ isPhone }) => (isPhone ? '1 / -1' : '6 / 13')};
  grid-row: ${({ isPhone }) => (isPhone ? '2' : '1')};
  z-index: 2;

  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: ${({ isPhone }) => (isPhone ? RedesignSpacings.lg : RedesignSpacings.xxl)};
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);

  min-height: ${({ isPhone }) => (isPhone ? 'auto' : '350px')};
  display: flex;
  flex-direction: column;
  justify-content: center;

  .carousel-indicators {
    bottom: -30px;
    margin-bottom: 0;
    justify-content: ${({ isPhone }) => (isPhone ? 'center' : 'flex-start')};

    [data-bs-target] {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${BackgroundColors.green.medium};
      opacity: 0.3;
      border: none;

      &.active {
        opacity: 1;
        background-color: ${BackgroundColors.green.strong};
        transform: scale(1.2);
      }
    }
  }
`;

const SectionHeader = styled(Typography)`
  margin-bottom: ${RedesignSpacings.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SlideContent = styled.div`
  text-align: left;
`;

const SlideTitle = styled(Typography)`
  margin-bottom: 12px;
`;

const SlideText = styled(Typography)`
  line-height: 1.6;
  opacity: 0.9;
`;

export const LaGruGruBand = () => {
  const [index, setIndex] = useState(0);
  const isPhone = usePhone();

  return (
    <Band.CenteredColumn id="lagrugru" size="lg" color={BackgroundColors.card} padding={isPhone ? 'lg' : 'xxxl'}>
      <Band.Title>Społeczność LaGruGru</Band.Title>

      <ContentGrid isPhone={isPhone}>
        <ImageWrapper isPhone={isPhone}>
          <Picture picture={{ fallbackUrl: grupoweJpgSrc }} alt="Grupa LaGruGru" width={isPhone ? 400 : 800} />
        </ImageWrapper>

        <GlassCarouselWrapper isPhone={isPhone}>
          <SectionHeader size="sm" weight="bold" color={BackgroundColors.green.strong}>
            Poznaj nas bliżej
          </SectionHeader>

          <Carousel activeIndex={index} onSelect={setIndex} interval={6000} indicators controls={false} fade>
            {carouselItems.map((item) => (
              <Carousel.Item key={item.title}>
                <SlideContent>
                  <SlideTitle size={isPhone ? 'lg' : 'xl'} weight="bold">
                    {item.title}
                  </SlideTitle>
                  <SlideText size="md">{item.text}</SlideText>
                </SlideContent>
              </Carousel.Item>
            ))}
          </Carousel>
        </GlassCarouselWrapper>
      </ContentGrid>
    </Band.CenteredColumn>
  );
};
