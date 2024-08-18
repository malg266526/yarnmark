import React, {
  CSSProperties,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import styled, { css } from 'styled-components';
import { Icon as IconifyIcon } from '@iconify/react';
import skeinIconSrc from '../assets/images/skein3.svg';
import { Spacings } from '../styles/spacings';

type VisibleIndex = {
  index: number;
  translateXZ: [number, number];
  left?: number;
  opacity: string;
  pointerEvents: 'none' | 'initial';
  zIndex?: string;
};

interface RootProps {
  width?: `${number}${'px' | '%'}`;
  height?: `${number}${'px' | '%'}`;
}

const MIN_HEIGHT = 260;
const INACTIVE_INDICATOR_SIZE = 12;
const ACTIVE_INDICATOR_SCALE = 3;

const ACTIVE_ITEM_ELEMENT_WIDTH_PERCENTAGE = 75;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Spacings.sm};
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

  display: flex;
  justify-content: ${({ side }) => (side === 'left' ? 'flex-end' : 'flex-start')};
  align-items: center;
  opacity: ${({ visible }) => (visible ? 0.4 : 0)};
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
        top: -2px;
        left: 0;
        width: 100%;
        height: calc(100% + 2px);
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

type IndicatorColor = 'black' | 'white' | 'beige';

const colorToFilter: Record<IndicatorColor, string> = {
  black: 'none',
  white: 'invert(1)',
  beige: 'invert(95%) sepia(5%) saturate(1345%) hue-rotate(318deg) brightness(91%) contrast(87%)'
};

const IndicatorBall = styled.div`
  display: block;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  border: 2px solid black;
  opacity: 1;
  transition: all 150ms ease-in-out;
`;

interface IndicatorRootProps {
  active?: boolean;
  color: IndicatorColor;
}

const IndicatorRoot = styled.div<IndicatorRootProps>`
  cursor: pointer;
  padding: 12px;
  width: ${INACTIVE_INDICATOR_SIZE}px;
  height: ${INACTIVE_INDICATOR_SIZE}px;
  flex: 0 0 auto;
  transition: all 150ms ease-in-out;
  transform: scale(1);
  box-sizing: content-box;
  position: relative;

  ${({ color }) => css`
    filter: ${colorToFilter[color]};
  `};

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background: url(${skeinIconSrc});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    transition: all 150ms ease-in-out;
  }

  ${({ active }) =>
    active &&
    css`
      ${IndicatorBall} {
        transform: scale(3);
        opacity: 0;
      }

      background: transparent;
      border-color: transparent;

      &:before {
        opacity: 1;
      }
    `};
`;

const Indicator = (props: IndicatorRootProps & { className?: string; onClick?: () => void }) => (
  <IndicatorRoot {...props}>
    <IndicatorBall />
  </IndicatorRoot>
);

const OuterWrapper = styled.div`
  position: relative;
  height: calc(100% - ${INACTIVE_INDICATOR_SIZE * ACTIVE_INDICATOR_SCALE}px - 20px);
  width: 100%;
`;

const ITEM_HEIGHT_OFFSET = 30;

const ChildrenWrapper = styled.div<{ transition: number | 'none' }>`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 10000cm;

  > * {
    height: calc(100% - ${ITEM_HEIGHT_OFFSET}px);
    position: absolute;
    width: ${ACTIVE_ITEM_ELEMENT_WIDTH_PERCENTAGE}%;
    left: ${(100 - ACTIVE_ITEM_ELEMENT_WIDTH_PERCENTAGE) / 2}%;
    top: ${ITEM_HEIGHT_OFFSET / 2}px;
    opacity: 0;
    ${({ transition }) =>
      transition !== 'none' &&
      css`
        transition: all ${transition}ms ease-in-out;
      `}
  }
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

const ItemRoot = styled.div<{ icon?: boolean }>`
  min-width: 200px;
  min-height: 200px;
  background: white;
  box-shadow: 8px 8px 14px 0 rgba(66, 68, 90, 1);
  padding: ${Spacings.md};
  word-break: break-word;
  -webkit-backface-visibility: hidden;

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
        transition: all 150ms ease-in-out;
      }
    `};
`;

const ItemDataContext = createContext<
  | undefined
  | {
      getStyle: (index: number) => VisibleIndex;
      activeIndex: number;
    }
>(undefined);
const useItemDataContext = () => {
  const getStyle = useContext(ItemDataContext);

  if (!getStyle) {
    throw new Error('Missing ItemDataContext');
  }

  return getStyle;
};

const getChildIndex = (element: HTMLElement, child: HTMLElement) => {
  for (let i = 0; i < element.childNodes.length; ++i) {
    if (element.childNodes[i] === child) {
      return i;
    }
  }
  return -1;
};

const isIndexWithinDisplayRange = (activeIndex: number, indexToValidate: number) =>
  [activeIndex - 2, activeIndex - 1, activeIndex, activeIndex + 1, activeIndex + 2].includes(indexToValidate);

const Item = (props: { children?: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(-1);
  const { getStyle, activeIndex } = useItemDataContext();
  const withinDisplayRange = useMemo(() => isIndexWithinDisplayRange(activeIndex, index), [activeIndex, index]);

  useEffect(() => {
    if (ref.current?.parentElement) {
      const result = getChildIndex(ref.current?.parentElement, ref.current);
      setIndex(result);
    }
  }, [ref, setIndex]);

  useEffect(() => {
    if (typeof index === 'number' && ref.current) {
      const styles = getStyle(withinDisplayRange ? index : -1);
      if (styles) {
        ref.current.style.opacity = styles.opacity;
        ref.current.style.pointerEvents = styles.pointerEvents;
        ref.current.style.transform = `translate3d(${styles.translateXZ[0]}px, 0, ${styles.translateXZ[1]}cm)`;
        if (styles.zIndex) {
          ref.current.style.zIndex = styles.zIndex + '';
        }
        ref.current.style.left = styles.left + '';
      }
    }
  }, [index, ref, getStyle, withinDisplayRange]);

  return <ItemRoot ref={ref} {...props} />;
};

const Z_INDEX_CHANGE_ON_DRAG_PERCENTAGE = 0.5;

// -100, 0, -50, -100, 0
const getVisibleIndexes = (middleIndex: number, xDragPercentage: number) =>
  (
    [
      {
        index: middleIndex - 2,
        pointerEvents: 'none',
        opacity: `${xDragPercentage !== 0 ? 1 : 0}`,
        zIndex: '-1',
        translateXZ: [
          -200 + (xDragPercentage > 0 ? 100 * xDragPercentage : 0),
          -6000 + (xDragPercentage > 0 ? 4500 * xDragPercentage : 0)
        ]
      },
      {
        index: middleIndex - 1,
        pointerEvents: 'none',
        opacity: '1',
        translateXZ: [
          -100 + (xDragPercentage > 0 ? 100 * xDragPercentage : -100 * -xDragPercentage),
          -1500 + (xDragPercentage > 0 ? 1500 * xDragPercentage : -4500 * -xDragPercentage)
        ],
        zIndex: `${xDragPercentage > Z_INDEX_CHANGE_ON_DRAG_PERCENTAGE ? 1 : 0}`
      },
      {
        index: middleIndex - 0,
        pointerEvents: 'initial',
        opacity: '1',
        translateXZ: [
          0 + (xDragPercentage > 0 ? 100 * xDragPercentage : -100 * -xDragPercentage),
          0 + (xDragPercentage > 0 ? -1500 * xDragPercentage : -1500 * -xDragPercentage)
        ],
        zIndex: `${Math.abs(xDragPercentage) > Z_INDEX_CHANGE_ON_DRAG_PERCENTAGE ? 0 : 1}`
      },
      {
        index: middleIndex + 1,
        pointerEvents: 'none',
        opacity: '1',
        translateXZ: [
          100 + (xDragPercentage > 0 ? 100 * xDragPercentage : -100 * -xDragPercentage),
          -1500 + (xDragPercentage > 0 ? -4500 * xDragPercentage : 1500 * -xDragPercentage)
        ],
        zIndex: `${-xDragPercentage > Z_INDEX_CHANGE_ON_DRAG_PERCENTAGE ? 1 : 0}`
      },
      {
        index: middleIndex + 2,
        pointerEvents: 'none',
        opacity: `${xDragPercentage !== 0 ? 1 : 0}`,
        zIndex: '-1',
        translateXZ: [
          200 + (xDragPercentage > 0 ? 0 : -100 * -xDragPercentage),
          -6000 + (xDragPercentage > 0 ? 0 : -4500 * xDragPercentage)
        ]
      },
      // used for styling unused cards
      {
        index: -1,
        pointerEvents: 'none',
        opacity: '0',
        zIndex: '-1',
        translateXZ: [
          0 + (xDragPercentage > 0 ? 100 * xDragPercentage : 0),
          -6000 + (xDragPercentage > 0 ? 4500 * xDragPercentage : 0)
        ]
      }
    ] satisfies VisibleIndex[]
  ).reduce<{ [K in number | string]: VisibleIndex }>((acc, obj) => {
    return {
      ...acc,
      [obj.index]: obj
    };
  }, {});

export interface CarouselgeProps extends RootProps {
  className?: string;
  style?: CSSProperties;
  onChange: (index: number) => void;
  selectedIndex: number;
  children: React.ReactNode;
  indicators?: IndicatorColor;
}

const MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE = 100;

// TODO add timer for automatic change
// TODO add linked variant
export const Carouselge = Object.assign(
  styled(({ onChange, indicators, selectedIndex, children, ...rest }: CarouselgeProps) => {
    const childrenCount = useMemo(() => React.Children.count(children), [children]);
    const childrenWrapperRef = useRef<HTMLDivElement>(null);
    const sizeRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
    const [xDragPercentage, setXDragPercentage] = useState(0);
    const updateSize = useCallback(() => {
      if (childrenWrapperRef.current) {
        const { left, height, width, top } = childrenWrapperRef.current.getBoundingClientRect();
        sizeRef.current = { height, width, left, top };
      }
    }, []);
    const visibleIndexes = getVisibleIndexes(selectedIndex, xDragPercentage);

    useEffect(() => {
      updateSize();

      window.addEventListener('resize', updateSize);

      return () => {
        window.removeEventListener('resize', updateSize);
      };
    }, [updateSize]);

    const mouseDownDataRef = useRef<{ x: number; y: number } | undefined>(undefined);
    const areCardBeingDragged = useMemo(() => xDragPercentage !== 0, [xDragPercentage]);
    const transitionTime = useMemo(() => (areCardBeingDragged ? 'none' : 150), [areCardBeingDragged]);
    console.info('xDragPercentage', xDragPercentage);

    const isIndexValid = useCallback((index: number) => index <= childrenCount - 1 && index > -1, [childrenCount]);

    const onMouseUp = useCallback(
      (e: { button: number; screenX: number; screenY: number }) => {
        if (e.button !== 0 || !mouseDownDataRef.current) {
          return;
        }

        if (mouseDownDataRef.current?.x - e.screenX > MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE) {
          if (selectedIndex < childrenCount - 1) {
            onChange(selectedIndex + 1);
          }
        } else if (mouseDownDataRef.current.x - e.screenX < -MINIMUM_MOUSE_MOVE_TO_TRIGGER_CHANGE) {
          if (selectedIndex > 0) {
            onChange(selectedIndex - 1);
          }
        }

        mouseDownDataRef.current = undefined;
        setXDragPercentage(0);
      },
      [selectedIndex, mouseDownDataRef, childrenCount, onChange]
    );

    const onMouseMove = useCallback(
      (e: { screenX: number }) => {
        if (mouseDownDataRef.current) {
          setXDragPercentage(
            (e.screenX - mouseDownDataRef.current.x) /
              (sizeRef.current.width * (ACTIVE_ITEM_ELEMENT_WIDTH_PERCENTAGE / 100))
          );
        }
      },
      [setXDragPercentage, mouseDownDataRef, sizeRef]
    );

    const onTouchMove = useCallback(
      (e: React.TouchEvent) => onMouseMove({ screenX: e.changedTouches[0].screenX }),
      [onMouseMove]
    );

    const getStyle = useCallback((index: number) => visibleIndexes[index], [visibleIndexes]);

    return (
      <Root
        {...rest}
        onMouseDown={(e) => {
          if (e.button === 0) {
            e.preventDefault();
            mouseDownDataRef.current = { x: e.screenX, y: e.screenY };
          }
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          mouseDownDataRef.current = { x: e.touches[0].screenX, y: e.touches[0].screenY };
        }}
        onMouseLeave={onMouseUp}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onTouchEnd={(e) =>
          onMouseUp({ button: 0, screenX: e.changedTouches[0].screenX, screenY: e.changedTouches[0].screenY })
        }>
        <ItemDataContext.Provider value={{ getStyle, activeIndex: selectedIndex }}>
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
            <ChildrenWrapper ref={childrenWrapperRef} transition={transitionTime}>
              {children}
            </ChildrenWrapper>
          </OuterWrapper>
        </ItemDataContext.Provider>
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
              ))}
          </Footer>
        )}
      </Root>
    );
  })``,
  { Item, ItemBackground }
);
