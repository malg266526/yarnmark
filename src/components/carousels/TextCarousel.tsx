import React, { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { Typography } from '../Typography';
import { BackgroundColors } from '../../styles/theme';
import { RedesignSpacings } from '../../styles/spacings';
import { usePhone } from '../../hooks/usePhone';

interface TextCarouselItem {
  subtitle: string;
  description: string;
}

interface TextCarouselProps {
  title: string;
  items: TextCarouselItem[];
  interval?: number;
}

interface StyledProps {
  isPhone: boolean;
}

const GlassCarouselWrapper = styled.div<StyledProps>`
  z-index: 2;
  width: ${({ isPhone }) => (isPhone ? '100%' : '60%')};

  background: rgba(255, 255, 255, 0.75);
  // backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: ${({ isPhone }) => (isPhone ? RedesignSpacings.md : RedesignSpacings.lg)};
  box-shadow: 1px 8px 25px 0 rgba(60, 30, 30, 0.15);

  min-height: ${({ isPhone }) => (isPhone ? 'auto' : '350px')};
  display: flex;
  flex-direction: column;
  justify-content: center;

  .carousel-indicators {
    bottom: -60px;
    margin-bottom: 0;
    justify-content: center;

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

export const TextCarousel = ({ title, items, interval = 6000 }: TextCarouselProps) => {
  const [index, setIndex] = useState(0);
  const isPhone = usePhone();

  return (
    <GlassCarouselWrapper isPhone={isPhone}>
      <SectionHeader size="sm" weight="bold" color={BackgroundColors.green.strong}>
        {title}
      </SectionHeader>

      <Carousel activeIndex={index} onSelect={setIndex} interval={interval} indicators controls={false}>
        {items.map((item, idx) => (
          <Carousel.Item key={`${item.subtitle}-${idx}`}>
            <SlideContent>
              <SlideTitle size={isPhone ? 'lg' : 'xl'} weight="bold">
                {item.subtitle}
              </SlideTitle>
              <SlideText size="md">{item.description}</SlideText>
            </SlideContent>
          </Carousel.Item>
        ))}
      </Carousel>
    </GlassCarouselWrapper>
  );
};
