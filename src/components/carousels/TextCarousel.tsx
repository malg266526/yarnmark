import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { Typography } from '../Typography';
import { Picture, PictureType } from '../Picture';
import { BackgroundColors } from '../../styles/theme';
import { RedesignSpacings } from '../../styles/spacings';
import { usePhone } from '../../hooks/usePhone';

// ==========================================
// 1. TYPY
// ==========================================
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
  backgroundImage?: string | PictureType;
}

// ==========================================
// 2. GŁÓWNY KOMPONENT
// ==========================================
export const TextCarousel = ({ items, interval = 6000, backgroundImage }: TextCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPhone = usePhone();

  const currentItem = items[activeIndex];
  const isCurrentHighlighted = currentItem?.isHighlighted || false;

  return (
    <CarouselWrapper isPhone={isPhone} isHighlighted={isCurrentHighlighted}>
      <CarouselBackground background={backgroundImage} />

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

// ==========================================
// 3. SUB-KOMPONENTY (Logika i układ)
// ==========================================

const CarouselSlide = ({ item, isPhone }: { item: TextCarouselItem; isPhone: boolean }) => {
  // Wyciągnięcie trudnych warunków do czytelnych zmiennych
  const shouldShowText = !(isPhone && item.showOnlyImageOnMobile);
  const shouldShowImage = Boolean(item.image) && (!isPhone || item.showOnlyImageOnMobile);

  return (
    <SlideContainer isPhone={isPhone}>
      {shouldShowText && <SlideText item={item} isPhone={isPhone} />}
      {shouldShowImage && <SlideMedia item={item} isPhone={isPhone} />}
    </SlideContainer>
  );
};

const SlideText = ({ item, isPhone }: { item: TextCarouselItem; isPhone: boolean }) => {
  const { t } = useTranslation();
  const { title, subtitle, description, extraParagraph, button } = item;

  return (
    <TextColumn>
      <SlideKicker size="sm" weight="bold" color={BackgroundColors.green.strong}>
        {t(title)}
      </SlideKicker>

      <SlideMainContent>
        <Typography size={isPhone ? 'md' : 'xl'} weight="bold" style={{ marginBottom: isPhone ? '8px' : '12px' }}>
          {t(subtitle)}
        </Typography>

        <SlideDescription size={isPhone ? 'sm' : 'md'}>
          <Trans i18nKey={description} />
        </SlideDescription>

        {extraParagraph && (
          <SlideDescription size={isPhone ? 'sm' : 'md'}>
            <Trans i18nKey={extraParagraph} />
          </SlideDescription>
        )}

        {button?.title && (
          <ActionButton onClick={button.callback} isPhone={isPhone}>
            {button.title}
          </ActionButton>
        )}
      </SlideMainContent>
    </TextColumn>
  );
};

const SlideMedia = ({ item, isPhone }: { item: TextCarouselItem; isPhone: boolean }) => {
  const { t } = useTranslation();
  const { image, title, showOnlyImageOnMobile } = item;

  if (!image) return null;

  const isStringUrl = typeof image === 'string';

  return (
    <ImageColumn isPhone={isPhone}>
      {isStringUrl ? (
        <SlideImage src={image} alt={t(title)} isPhone={isPhone} showOnlyImageOnMobile={showOnlyImageOnMobile} />
      ) : (
        <StyledPicture picture={image} alt={t(title)} isPhone={isPhone} showOnlyImageOnMobile={showOnlyImageOnMobile} />
      )}
    </ImageColumn>
  );
};

const CarouselBackground = ({ background }: { background?: string | PictureType }) => {
  if (!background) return null;

  const pictureData = typeof background === 'string' ? { fallbackUrl: background } : background;

  return (
    <BackgroundContainer>
      <Picture picture={pictureData} alt="" />
    </BackgroundContainer>
  );
};

// ==========================================
// 4. STYLED COMPONENTS (Pogrupowane)
// ==========================================

// --- Animacje i style współdzielone ---
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

const imageStyles = css<{ isPhone: boolean; showOnlyImageOnMobile?: boolean }>`
  width: ${({ isPhone, showOnlyImageOnMobile }) => (isPhone && showOnlyImageOnMobile ? '280px' : '250px')};
  height: ${({ isPhone, showOnlyImageOnMobile }) => (isPhone && showOnlyImageOnMobile ? '280px' : '250px')};
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// --- Layout & Kontenery ---
const CarouselWrapper = styled.div<{ isPhone: boolean; isHighlighted: boolean }>`
  z-index: 2;
  position: relative;
  width: 100%;
  height: ${({ isPhone }) => (isPhone ? '400px' : '500px')};
  background: rgba(255, 255, 255, 0.75);
  border-radius: 24px;
  padding: ${({ isPhone }) => (isPhone ? RedesignSpacings.sm : RedesignSpacings.lg)};
  transition: all 0.5s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 8px 25px 0 rgba(60, 30, 30, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);

  ${({ isHighlighted }) => isHighlighted && highlightedStyles}

  .carousel, .carousel-inner, .carousel-item {
    height: 100%;
    z-index: 2;
  }

  .carousel-indicators {
    bottom: 0;
    z-index: 3;
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

const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0; /* Zastępuje top: 0; left: 0; right: 0; bottom: 0; */
  z-index: 1;
  opacity: 0.2;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  picture {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const SlideContainer = styled.div<{ isPhone: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: ${({ isPhone }) => (isPhone ? 'column' : 'row')};
  align-items: center;
  justify-content: space-between;
  gap: ${RedesignSpacings.lg};
  padding-bottom: ${({ isPhone }) => (isPhone ? RedesignSpacings.xl : RedesignSpacings.lg)};
  box-sizing: border-box;

  /* Animacja pojawiania się slajdu */
  opacity: 0;
  transform: translateY(4px) scale(0.98);
  filter: blur(4px);
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.5s ease-in-out;

  .active & {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
    transition:
      opacity 0.6s ease-in-out,
      transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1),
      filter 0.6s ease-in-out;
  }
`;

// --- Kolumny & Media ---
const TextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${RedesignSpacings.xs};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;

const ImageColumn = styled.div<{ isPhone: boolean }>`
  flex: ${({ isPhone }) => (isPhone ? 'none' : '0 0 250px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideImage = styled.img<{ isPhone: boolean; showOnlyImageOnMobile?: boolean }>`
  ${imageStyles}
`;

const StyledPicture = styled(Picture)<{ isPhone: boolean; showOnlyImageOnMobile?: boolean }>`
  img {
    ${imageStyles}
  }
`;

// --- Typografia & Elementy ---
const SlideMainContent = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const SlideKicker = styled(Typography)`
  margin-bottom: ${RedesignSpacings.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 10px !important;
`;

const SlideDescription = styled(Typography)`
  line-height: 1.6;
  opacity: 0.9;
  word-break: break-word;
`;

const ActionButton = styled.button<{ isPhone?: boolean }>`
  margin-top: ${({ isPhone }) => (isPhone ? RedesignSpacings.sm : RedesignSpacings.md)};
  padding: ${({ isPhone }) =>
    isPhone ? `${RedesignSpacings.xs} ${RedesignSpacings.sm}` : `${RedesignSpacings.xs} ${RedesignSpacings.md}`};
  background-color: #793b3b;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: ${({ isPhone }) => (isPhone ? '12px' : '14px')};
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
