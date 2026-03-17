import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { Typography } from '../Typography';
import { BackgroundColors } from '../../styles/theme';
import { RedesignSpacings } from '../../styles/spacings';
import { usePhone } from '../../hooks/usePhone';
import { Trans, useTranslation } from 'react-i18next';
import { Picture, PictureType } from '../Picture';

export interface TextCarouselItem {
  title: string;
  subtitle: string;
  description: string;
  extraParagraph?: string;
  isHighlighted?: boolean;
  image?: string | PictureType;
  showOnlyImageOnMobile?: boolean;
  button?: {
    title?: string;
    callback?: () => void;
  };
}

interface TextCarouselProps {
  items: TextCarouselItem[];
  interval?: number;
}

export const TextCarousel = ({ items, interval = 50000 }: TextCarouselProps) => {
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

const CarouselSlide = ({ item, isPhone }: { item: TextCarouselItem; isPhone: boolean }) => {
  const { title, subtitle, description, extraParagraph, button, image } = item;
  const { t } = useTranslation();

  return (
    <SlideContainer isPhone={isPhone}>
      {!(isPhone && item.showOnlyImageOnMobile) && (
        <TextColumn>
          <SlideKicker size="sm" weight="bold" color={BackgroundColors.green.strong}>
            {t(title)}
          </SlideKicker>

          <SlideMainContent>
            <Typography size={isPhone ? 'lg' : 'xl'} weight="bold" style={{ marginBottom: '12px' }}>
              {t(subtitle)}
            </Typography>

            <SlideDescription size="md">
              <Trans i18nKey={description} />
            </SlideDescription>

            {extraParagraph && (
              <SlideDescription size="md">
                <Trans i18nKey={extraParagraph} />
              </SlideDescription>
            )}

            {button?.title && <ActionButton onClick={button.callback}>{button.title}</ActionButton>}
          </SlideMainContent>
        </TextColumn>
      )}
      {image && (!isPhone || item.showOnlyImageOnMobile) && (
        <ImageColumn isPhone={isPhone}>
          {typeof image === 'string' ? (
            <SlideImage
              src={image}
              alt={t(title)}
              isPhone={isPhone}
              showOnlyImageOnMobile={item.showOnlyImageOnMobile}
            />
          ) : (
            <StyledPicture
              picture={image}
              alt={t(title)}
              isPhone={isPhone}
              showOnlyImageOnMobile={item.showOnlyImageOnMobile}
            />
          )}
        </ImageColumn>
      )}
    </SlideContainer>
  );
};

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

  box-shadow: 1px 8px 25px 0 rgba(60, 30, 30, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);

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

const SlideContainer = styled.div<{ isPhone: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: ${({ isPhone }) => (isPhone ? 'column' : 'row')};
  align-items: center;
  justify-content: space-between;
  gap: ${RedesignSpacings.lg};
  padding-bottom: 40px;
`;

const TextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ImageColumn = styled.div<{ isPhone: boolean }>`
  flex: ${({ isPhone }) => (isPhone ? 'none' : '0 0 250px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const imageStyles = css<{ isPhone: boolean; showOnlyImageOnMobile?: boolean }>`
  width: ${({ isPhone, showOnlyImageOnMobile }) => (isPhone && showOnlyImageOnMobile ? '280px' : '250px')};
  height: ${({ isPhone, showOnlyImageOnMobile }) => (isPhone && showOnlyImageOnMobile ? '280px' : '250px')};
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SlideImage = styled.img<{ isPhone: boolean; showOnlyImageOnMobile?: boolean }>`
  ${imageStyles}
`;

const StyledPicture = styled(Picture)<{ isPhone: boolean; showOnlyImageOnMobile?: boolean }>`
  img {
    ${imageStyles}
  }
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
