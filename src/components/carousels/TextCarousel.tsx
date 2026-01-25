import React, { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { Typography } from '../Typography';
import { BackgroundColors } from '../../styles/theme';
import { RedesignSpacings } from '../../styles/spacings';
import { usePhone } from '../../hooks/usePhone';

export interface TextCarouselItem {
  title: string;
  subtitle: string;
  description: string;
  extraParagraph?: string;
  button?: {
    title?: string;
    callback?: () => void;
  };
}

interface TextCarouselProps {
  items: TextCarouselItem[];
  interval?: number;
}

interface StyledWrapperProps {
  isPhone: boolean;
  activeIndex: number;
}

const GlassCarouselWrapper = styled.div<StyledWrapperProps>`
  z-index: 2;
  width: ${({ isPhone }) => (isPhone ? '100%' : '60%')};
  background: rgba(255, 255, 255, 0.75);
  border-radius: 24px;
  padding: ${({ isPhone }) => (isPhone ? RedesignSpacings.md : RedesignSpacings.lg)};
  transition: all 0.5s ease;

  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: ${({ isPhone }) => (isPhone ? 'auto' : '350px')};

  box-shadow: ${({ activeIndex }) =>
    activeIndex === 2
      ? `
        0 0 20px rgba(255, 0, 0, 0.2),   /* Czerwony */
        10px 0 30px rgba(0, 255, 0, 0.2), /* Zielony */
        -10px 0 30px rgba(0, 0, 255, 0.2),/* Niebieski */
        0 10px 40px rgba(255, 255, 0, 0.2) /* Żółty */
      `
      : '1px 8px 25px 0 rgba(60, 30, 30, 0.15)'};

  border: 1px solid ${({ activeIndex }) => (activeIndex === 2 ? 'rgba(121, 59, 59, 0.3)' : 'rgba(255, 255, 255, 0.4)')};

  animation: ${({ activeIndex }) => (activeIndex === 2 ? 'pulse 3s infinite alternate' : 'none')};

  @keyframes pulse {
    from {
      filter: saturate(1);
    }
    to {
      filter: saturate(1.8);
    }
  }

  .carousel-indicators {
    bottom: -60px;
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

export const TextCarousel = ({ items, interval = 10000 }: TextCarouselProps) => {
  const [index, setIndex] = useState(0);
  const isPhone = usePhone();

  return (
    <GlassCarouselWrapper isPhone={isPhone} activeIndex={index}>
      <Carousel activeIndex={index} onSelect={setIndex} interval={interval} indicators controls={false} fade>
        {items.map(({ title, subtitle, extraParagraph, button, description }, idx) => (
          <Carousel.Item key={`${subtitle}-${idx}`}>
            <SectionHeader size="sm" weight="bold" color={BackgroundColors.green.strong}>
              {title}
            </SectionHeader>

            <SlideContent>
              <SlideTitle size={isPhone ? 'lg' : 'xl'} weight="bold">
                {subtitle}
              </SlideTitle>
              <SlideText size="md">{description}</SlideText>
              {extraParagraph && <SlideText size="md">{extraParagraph}</SlideText>}

              {button?.title && <ActionButton onClick={button.callback}>{button.title}</ActionButton>}
            </SlideContent>
          </Carousel.Item>
        ))}
      </Carousel>
    </GlassCarouselWrapper>
  );
};
