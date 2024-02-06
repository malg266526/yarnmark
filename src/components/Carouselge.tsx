import React, { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import skeinIconSrc from '../assets/images/skein3.svg';
import { Spacings } from '../styles/spacings';

type VisibleIndex = {
  index: number;
  translateXZ: [number, number];
  left: number;
  opacity: number;
  pointerEvents: 'none' | 'initial';
  zIndex?: number;
};

interface RootProps {
  width?: `${number}${'px' | '%'}`;
  height?: `${number}${'px' | '%'}`;
}

const MIN_HEIGHT = 260;
const INACTIVE_INDICATOR_SIZE = 12;
const ACTIVE_INDICATOR_SCALE = 3;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Spacings.md};
  flex: 1 0;
`;

const Indicator = styled.div<{ active?: boolean }>`
  border-radius: 50%;
  border: 2px solid black;

  width: ${INACTIVE_INDICATOR_SIZE}px;
  height: ${INACTIVE_INDICATOR_SIZE}px;
  flex: 0 0 auto;
  transition: all 150ms ease-in-out;
  transform: scale(1);
  box-sizing: content-box;

  &:before {
    opacity: 0;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background: url(${skeinIconSrc});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    transition: all 150ms ease-int-out;
  }

  ${({ active }) =>
    active &&
    css`
      background: transparent;
      border-color: transparent;
      transform: scale(${ACTIVE_INDICATOR_SCALE});

      &:before {
        opacity: 1;
      }
    `};
`;

const ChildrenWrapper = styled.div<{ visibleIndexes: VisibleIndex[] }>`
  position: relative;
  width: calc(100% - 50px);
  height: calc(100% - ${INACTIVE_INDICATOR_SIZE * ACTIVE_INDICATOR_SCALE}px - 20px);
  perspective: 10000cm;

  > * {
    height: calc(100% - 30px);
    position: absolute;
    width: 65%;
    left: 0;
    top: 50%;
    transform: translate(200%) scale(0);
    transition: all 150ms ease-in-out;
  }

  ${({ visibleIndexes }) =>
    visibleIndexes.map(
      ({ index, left, opacity, pointerEvents, translateXZ: [translateX, translateZ], zIndex }) => css`
        > :nth-child(${index + 1}) {
          transform: translate3d(${translateX}%, -50%, ${translateZ}cm);
          left: ${left}%;
          opacity: ${opacity};
          pointer-events: ${pointerEvents};
          ${zIndex &&
          css`
            z-index: ${zIndex};
          `}
        }
      `
    )};
`;

const Root = styled.div<RootProps>`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};

  ${({ height }) => css`
    height: ${height || `${MIN_HEIGHT}px`};
  `};
`;

const Item = styled.div`
  min-width: 200px;
  min-height: 200px;
  background: white;
  box-shadow: 8px 8px 18px 0px rgba(66, 68, 90, 1);
  padding: ${Spacings.md};

  &:before {
    content: '';
    display: block;
    left: ${Spacings.sm};
    top: ${Spacings.sm};
    position: absolute;
    width: 20px;
    height: 20px;

    background: url(${skeinIconSrc});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    transition: all 150ms ease-int-out;
  }
`;

const getVisibleIndexes = (middleIndex: number): VisibleIndex[] => [
  { index: middleIndex - 2, left: 0, opacity: 0, pointerEvents: 'none', translateXZ: [-100, 0] },
  { index: middleIndex - 1, left: 0, opacity: 1, pointerEvents: 'none', translateXZ: [0, -400] },
  { index: middleIndex - 0, left: 50, opacity: 1, pointerEvents: 'initial', translateXZ: [-50, 500], zIndex: 1 },
  { index: middleIndex + 1, left: 100, opacity: 1, pointerEvents: 'none', translateXZ: [-100, -400] },
  { index: middleIndex + 2, left: 100, opacity: 0, pointerEvents: 'none', translateXZ: [0, 0] }
];

export interface CarouselgeProps extends Pick<RootProps, 'width'> {
  className?: string;
  onChange: (index: number) => void;
  selectedIndex: number;
  children: ReactNode;
  indicators?: boolean;
}

const MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE = 100;

export const Carouselge = Object.assign(
  ({ onChange, indicators, selectedIndex, children, ...rest }: CarouselgeProps) => {
    const childrenCount = useMemo(() => React.Children.count(children), [children]);
    const childrenWrapperRef = useRef<HTMLDivElement>(null);
    const sizeRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
    const updateSize = useCallback(() => {
      if (childrenWrapperRef.current) {
        const { left, height, width, top } = childrenWrapperRef.current.getBoundingClientRect();
        sizeRef.current = { height, width, left, top };
      }
    }, []);
    const visibleIndexes = useMemo(() => getVisibleIndexes(selectedIndex), [selectedIndex]);

    useEffect(() => {
      updateSize();

      window.addEventListener('resize', updateSize);

      return () => {
        window.removeEventListener('resize', updateSize);
      };
    }, [updateSize]);

    const mouseDownDataRef = useRef({ x: 0, y: 0 });
    const onMouseUp = useCallback(
      (e: React.MouseEvent) => {
        if (e.button !== 0) {
          return;
        }

        if (mouseDownDataRef.current.x - e.screenX > MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE) {
          if (selectedIndex < childrenCount - 1) {
            onChange(selectedIndex + 1);
            return;
          }
          return;
        }

        if (mouseDownDataRef.current.x - e.screenX < -MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE) {
          if (selectedIndex > 0) {
            onChange(selectedIndex - 1);
          }
          return;
        }

        if (sizeRef.current.left + sizeRef.current.width / 2 < e.screenX && selectedIndex < childrenCount - 1) {
          onChange(selectedIndex + 1);
        }

        if (sizeRef.current.left + sizeRef.current.width / 2 > e.screenX && selectedIndex > 0) {
          onChange(selectedIndex - 1);
        }
      },
      [sizeRef, selectedIndex, mouseDownDataRef, childrenCount, onChange]
    );

    return (
      <Root {...rest}>
        <ChildrenWrapper
          ref={childrenWrapperRef}
          onMouseDown={(e) => {
            e.preventDefault();
            mouseDownDataRef.current = { x: e.screenX, y: e.screenY };
          }}
          onMouseUp={onMouseUp}
          visibleIndexes={visibleIndexes}>
          {children}
        </ChildrenWrapper>
        {indicators && (
          <Footer>
            {Array(childrenCount)
              .fill(0)
              .map((value, index) => (
                <Indicator key={index} active={index === selectedIndex} />
              ))}
          </Footer>
        )}
      </Root>
    );
  },
  { Item }
);
