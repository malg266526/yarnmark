import styled from 'styled-components';
import React, { forwardRef, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import skeinIconSrc from '../../assets/images/indicator_skein_green.svg';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Dots } from '../Dots';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.sm};
  background-color: white;
  overflow: hidden;

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0;
  }
`;

const SlidesWithNavigation = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
  justify-content: space-between;
`;

const SlidesWrapper = styled.div`
  min-height: 500px;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

const Slides = styled.div<{ padding?: number; gap?: number }>`
  height: 100%;
  display: flex;
  align-items: center;
  gap: ${({ gap }) => `${gap || 0}px`};
  padding: ${({ padding }) => `${padding || 0}px`};
  overflow: hidden;
  position: relative;
  top: 0;
  left: ${RedesignSpacings.xs};
  transition: all 0.1s linear;

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.xs};
  }
`;

const NextIcon = styled(Icon)`
  transform: rotateY(180deg);
`;

const DotsWrapper = styled.span`
  width: 70px;
  height: 30px;
`;

const DefaultStyleConfig = {
  gap: 30,
  padding: 10
};

interface MultiCarouselProps {
  // Todo: make id obligatory
  items: ReactNode[];
  style?: {
    gap: number;
    padding: number;
  };
}

const SlideMoveOffset = 320;

const getOffsetByPosition = (position: number, gap?: number, padding?: number) => {
  return `${position * (SlideMoveOffset + (gap || 0)) + (padding || 0)}px`;
};

const getIndexesOrderedByPositionInCarousel = (firstCardIndex: number, length: number): number[] => {
  const originArray = Array.from(Array(length).keys());

  return [...originArray.slice(firstCardIndex, length), ...originArray.slice(0, firstCardIndex)];
};

export const MultiCarousel = ({ items, style = DefaultStyleConfig }: MultiCarouselProps) => {
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const [firstCardIndex, setFirstCardIndex] = useState(0);

  const moveByOffset = useCallback(
    (originPosition: number, newPosition: number) => {
      const slideRef = itemsRef.current[originPosition];

      if (slideRef) {
        slideRef.style.left = getOffsetByPosition(newPosition, style?.gap, style?.padding);
      }
    },
    [style?.gap, style?.padding]
  );

  const reorderSlides = useCallback(
    (firstIndex: number) => {
      setFirstCardIndex(firstIndex);

      const orderedSlides = getIndexesOrderedByPositionInCarousel(firstIndex, items.length);
      orderedSlides.forEach((position, index) => moveByOffset(position, index));
    },
    [items.length, moveByOffset]
  );

  useEffect(() => {
    reorderSlides(0);
  }, [reorderSlides]);

  const goBack = () => {
    let updatedIndex = items.length - 1;

    if (firstCardIndex > 0) {
      updatedIndex = firstCardIndex - 1;
    }

    reorderSlides(updatedIndex);
  };

  const goNext = () => {
    let updatedIndex = 1;
    if (firstCardIndex < items.length) {
      updatedIndex = firstCardIndex + 1;
    }

    reorderSlides(updatedIndex);
  };

  return (
    <Root id="carousel_container">
      <SlidesWithNavigation>
        <Button onClick={goBack} aria-label="go back">
          <Icon size="lg" src={skeinIconSrc} />
        </Button>

        <SlidesWrapper>
          <Slides id="carousel_slides" ref={slidesContainerRef} gap={style?.gap} padding={style?.padding}>
            {/*Todo: try to read props of item and use id as a key*/}
            {items.map((item, index) => (
              <MultiCarouselSlide
                key={`slide_item_${index}`}
                ref={(node) => {
                  if (node) {
                    itemsRef.current[index] = node;
                  }
                }}>
                {item}
              </MultiCarouselSlide>
            ))}
          </Slides>
        </SlidesWrapper>

        <Button onClick={goNext} aria-label="go next">
          <NextIcon size="lg" src={skeinIconSrc} />
        </Button>
      </SlidesWithNavigation>

      <DotsWrapper>
        <Dots onPrev={goBack} onNext={goNext} />
      </DotsWrapper>
    </Root>
  );
};

interface MultiCarouselSlideProps {
  children: ReactNode;
  left?: number;
}

const SlideRoot = styled.div`
  position: absolute;
  transition: all 0.1s linear;
`;

const MultiCarouselSlide = forwardRef<HTMLDivElement, MultiCarouselSlideProps>(({ children }, ref) => {
  return <SlideRoot ref={ref}>{children}</SlideRoot>;
});
MultiCarouselSlide.displayName = 'MultiCarouselSlide';
