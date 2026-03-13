import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { Typography } from '../Typography';
import { BackgroundColors } from '../../styles/theme';
import { RedesignSpacings } from '../../styles/spacings';
import { usePhone } from '../../hooks/usePhone';

// 1. TYPY
export interface TextCarouselItem {
  title: string; // Traktowane jako kategoria/nadtytuł
  subtitle: string; // Traktowane jako główny tytuł slajdu
  description: string;
  extraParagraph?: string;
  isHighlighted?: boolean; // Zastępuje sztywne `activeIndex === 2`
  button?: {
    title?: string;
    callback?: () => void;
  };
}

interface TextCarouselProps {
  items: TextCarouselItem[];
  interval?: number;
}

// 2. GŁÓWNY KOMPONENT
export const TextCarousel = ({ items, interval = 10000 }: TextCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPhone = usePhone();

  const currentItem = items[activeIndex];
  const isCurrentHighlighted = currentItem?.isHighlighted || false;

  return (
    <CarouselWrapper isPhone={isPhone} isHighlighted={isCurrentHighlighted}>
      <Carousel
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        interval={interval}
        indicators
        controls={false}
        fade
      >
        {items.map((item, idx) => (
          <Carousel.Item key={`${item.title}-${idx}`}>
            <CarouselSlide item={item} isPhone={isPhone} />
          </Carousel.Item>
        ))}
      </Carousel>
    </CarouselWrapper>
  );
};

// 3. KOMPONENT SLAJDU (Mały, łatwy do testowania)
const CarouselSlide = ({ item, isPhone }: { item: TextCarouselItem; isPhone: boolean }) => {
  const { title, subtitle, description, extraParagraph, button } = item;

  return (
    <SlideContainer>
      <SlideKicker size="sm" weight="bold" color={BackgroundColors.green.strong}>
        {title}
      </SlideKicker>

      <SlideMainContent>
        <Typography size={isPhone ? 'lg' : 'xl'} weight="bold" style={{ marginBottom: '12px' }}>
          {subtitle}
        </Typography>

        <SlideDescription size="md">{description}</SlideDescription>

        {extraParagraph && <SlideDescription size="md">{extraParagraph}</SlideDescription>}

        {button?.title && <ActionButton onClick={button.callback}>{button.title}</ActionButton>}
      </SlideMainContent>
    </SlideContainer>
  );
};

// 4. STYLED COMPONENTS (Wydzielone na dół pliku dla czystości)

const pulseAnimation = keyframes`
  from { filter: saturate(1); }
  to { filter: saturate(1.8); }
`;

const highlightedStyles = css`
  box-shadow:
    0 0 20px rgba(255, 0, 0, 0.2),
    10px 0 30px rgba(0, 255, 0, 0.2),
    -10px 0 30px rgba(0, 0, 255, 0.2),
    0 10px 40px rgba(255, 255, 0, 0.2);
  border: 1px solid rgba(121, 59, 59, 0.3);
  animation: ${pulseAnimation} 3s infinite alternate;
`;

const CarouselWrapper = styled.div<{ isPhone: boolean; isHighlighted: boolean }>`
  z-index: 2;
  position: relative;
  width: 100%;
  height: 500px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 24px;
  padding: ${({ isPhone }) => (isPhone ? RedesignSpacings.md : RedesignSpacings.lg)};
  transition: all 0.5s ease;

  /* Domyślne style */
  box-shadow: 1px 8px 25px 0 rgba(60, 30, 30, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);

  /* Aplikowanie specjalnego efektu na podstawie danych, a nie sztywnego indexu */
  ${({ isHighlighted }) => isHighlighted && highlightedStyles}

  .carousel, .carousel-inner, .carousel-item {
    height: 100%;
  }

  .carousel-indicators {
    bottom: 0;

    [data-bs-target] {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: ${BackgroundColors.green.medium};
      transition: all 0.3s ease;

      &.active {
        background-color: ${BackgroundColors.green.strong};
        transform: scale(1.3);
      }
    }
  }
`;

const SlideContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 40px; /* Miejsce na kropki (indicators) */
`;

const SlideMainContent = styled.div`
  text-align: left;
`;

const SlideKicker = styled(Typography)`
  margin-bottom: ${RedesignSpacings.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SlideDescription = styled(Typography)`
  line-height: 1.6;
  opacity: 0.9;
`;

const ActionButton = styled.button`
  margin-top: 24px;
  padding: 12px 28px;
  background-color: #793b3b;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;

  &:hover {
    background-color: #632f2f;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
