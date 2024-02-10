import React, { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Icon as IconifyIcon } from '@iconify/react';
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

const ACTIVE_ITEM_ELEMENT_WIDTH_PERCENTAGE = 65;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Spacings.md};
  flex: 1 0;
`;

const ClickElement = styled.div<{ side: 'left' | 'right'; visible?: boolean }>`
  position: absolute;
  ${({ side }) =>
    side === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};
  top: 0;
  width: ${(100 - ACTIVE_ITEM_ELEMENT_WIDTH_PERCENTAGE) / 2}%;
  height: 100%;
  z-index: 1;
  padding: ${Spacings.md};

  display: flex;
  justify-content: ${({ side }) => (side === 'left' ? 'flex-end' : 'flex-start')};
  align-items: center;
  opacity: ${({ visible }) => (visible ? 0.35 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  cursor: pointer;
  transition: all 150ms ease-in-out;
`;

const ItemBackground = styled.picture<{ opacity?: number; background?: string; variant?: 'covering' | 'bottom' }>`
  z-index: -1;
  position: absolute;
  left: 0;
  width: 100%;

  ${({ variant = 'covering' }) =>
    variant === 'covering'
      ? css`
          height: 100%;
          top: 0;
        `
      : css`
          height: 50%;
          bottom: 0;
        `}

  ${({ background }) =>
    background &&
    css`
      &:after {
        content: '';
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        background: ${background};
      }
    `};

  > img {
    ${({ opacity }) =>
    Number.isFinite(opacity) &&
    css`
        opacity: ${opacity};
      `}
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Indicator = styled.div<{ active?: boolean; color: 'black' | 'white' }>`
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;

  width: ${INACTIVE_INDICATOR_SIZE}px;
  height: ${INACTIVE_INDICATOR_SIZE}px;
  flex: 0 0 auto;
  transition: all 150ms ease-in-out;
  transform: scale(1);
  box-sizing: content-box;

  ${({ color }) =>
    color === 'white' &&
    css`
      filter: invert(1);
    `};

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

const OuterWrapper = styled.div`
  position: relative;
  height: calc(100% - ${INACTIVE_INDICATOR_SIZE * ACTIVE_INDICATOR_SCALE}px - 20px);
  width: 100%;
`;

const ChildrenWrapper = styled.div<{ visibleIndexes: VisibleIndex[] }>`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 10000cm;

  > * {
    height: calc(100% - 30px);
    position: absolute;
    width: ${ACTIVE_ITEM_ELEMENT_WIDTH_PERCENTAGE}%;
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

const Item = styled.div<{ icon?: boolean }>`
  min-width: 200px;
  min-height: 200px;
  background: white;
  box-shadow: 8px 8px 18px 0px rgba(66, 68, 90, 1);
  padding: ${Spacings.md};
  word-break: break-word;

  ${({ icon }) =>
    icon &&
    css`
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
    `};
`;

const getVisibleIndexes = (middleIndex: number): VisibleIndex[] => [
  { index: middleIndex - 2, left: 0, opacity: 0, pointerEvents: 'none', translateXZ: [-100, -6000] },
  { index: middleIndex - 1, left: 0, opacity: 1, pointerEvents: 'none', translateXZ: [0, -1500] },
  { index: middleIndex - 0, left: 50, opacity: 1, pointerEvents: 'initial', translateXZ: [-50, 0], zIndex: 1 },
  { index: middleIndex + 1, left: 100, opacity: 1, pointerEvents: 'none', translateXZ: [-100, -1500] },
  { index: middleIndex + 2, left: 100, opacity: 0, pointerEvents: 'none', translateXZ: [0, -6000] }
];

export interface CarouselgeProps extends RootProps {
  className?: string;
  style?: CSSProperties;
  onChange: (index: number) => void;
  selectedIndex: number;
  children: ReactNode;
  indicators?: 'black' | 'white';
}

const MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE = 100;

// TODO add motion to drag
// TODO add timer for automatic change
// TODO add linked variant
export const Carouselge = Object.assign(
  styled(({ onChange, indicators, selectedIndex, children, ...rest }: CarouselgeProps) => {
    const childrenCount = useMemo(() => React.Children.count(children), [children]);
    const childrenWrapperRef = useRef<HTMLDivElement>(null);
    const sizeRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
    const updateSize = useCallback(() => {
      if (childrenWrapperRef.current) {
        const { left, height, width, top } = childrenWrapperRef.current.getBoundingClientRect();
        sizeRef.current = { height, width, left, top };
      }
    }, []);
    const visibleIndexes = getVisibleIndexes(selectedIndex);

    useEffect(() => {
      updateSize();

      window.addEventListener('resize', updateSize);

      return () => {
        window.removeEventListener('resize', updateSize);
      };
    }, [updateSize]);

    const mouseDownDataRef = useRef<{ x: number; y: number } | undefined>(undefined);

    const isIndexValid = useCallback((index: number) => index <= childrenCount - 1 && index > -1, [childrenCount]);

    const onMouseUp = useCallback(
      (e: React.MouseEvent) => {
        if (e.button !== 0 || !mouseDownDataRef.current) {
          return;
        }

        if (mouseDownDataRef.current?.x - e.screenX > MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE) {
          if (selectedIndex < childrenCount - 1) {
            onChange(selectedIndex + 1);
          }
          mouseDownDataRef.current = undefined;
          return;
        }

        if (mouseDownDataRef.current.x - e.screenX < -MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE) {
          if (selectedIndex > 0) {
            onChange(selectedIndex - 1);
          }
          mouseDownDataRef.current = undefined;
          return;
        }
        mouseDownDataRef.current = undefined;
      },
      [selectedIndex, mouseDownDataRef, childrenCount, onChange]
    );

    return (
      <Root {...rest}>
        <OuterWrapper>
          <ClickElement
            side="left"
            visible={isIndexValid(selectedIndex - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (isIndexValid(selectedIndex - 1)) {
                onChange(selectedIndex - 1);
              }
            }}>
            <IconifyIcon icon="mdi:arrow-left" width="50" />
          </ClickElement>
          <ClickElement
            side="right"
            visible={isIndexValid(selectedIndex + 1)}
            onClick={(e) => {
              e.preventDefault();
              if (isIndexValid(selectedIndex + 1)) {
                onChange(selectedIndex + 1);
              }
            }}>
            <IconifyIcon icon="mdi:arrow-right" width="50" />
          </ClickElement>
          <ChildrenWrapper
            ref={childrenWrapperRef}
            onMouseDown={(e) => {
              if (e.button === 0) {
                e.preventDefault();
                mouseDownDataRef.current = { x: e.screenX, y: e.screenY };
              }
            }}
            onMouseLeave={onMouseUp}
            onMouseUp={onMouseUp}
            visibleIndexes={visibleIndexes}>
            {children}
          </ChildrenWrapper>
        </OuterWrapper>
        {indicators && (
          <Footer>
            {Array(childrenCount)
              .fill(0)
              .map((value, index) => (
                <Indicator
                  onClick={() => onChange(index)}
                  color={indicators}
                  key={index}
                  active={index === selectedIndex}
                />
              ))}a
          </Footer>
        )}
      </Root>
    );
  })``,
  { Item, ItemBackground }
);
