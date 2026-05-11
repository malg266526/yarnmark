import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import zod from 'zod';
import hallJson from '../../assets/hall.json';
import { StandColorsMap } from '../../components/editor/StandProps';
import { Typography } from '../../components/Typography';
import { usePhone } from '../../hooks/usePhone';
import { BackgroundColors, HallColors } from '../../styles/theme';

const SELECTED_COLOR = '#FF8C00';

const standTypeSchema = zod.union([
  zod.literal('premium'),
  zod.literal('mini'),
  zod.literal('standard'),
  zod.literal('other')
]);

const standColorSchema = zod.union([
  zod.literal('premium'),
  zod.literal('normal1'),
  zod.literal('normal2'),
  zod.literal('normal3'),
  zod.literal('small1'),
  zod.literal('small2'),
  zod.literal('taken'),
  zod.literal('taken2'),
  zod.literal('tech')
]);

const hallSchema = zod.array(
  zod.object({
    id: zod.string(),
    index: zod.string(),
    vendor: zod.string().optional(),
    description: zod.string().optional(),
    type: standTypeSchema,
    color: standColorSchema,
    width: zod.number(),
    height: zod.number(),
    isHorizontal: zod.boolean(),
    start: zod.object({ row: zod.number(), col: zod.number() }),
    end: zod.object({ row: zod.number(), col: zod.number() })
  })
);

type Stand = zod.infer<typeof hallSchema>[number];

const isStandSelectable = (stand: Stand): boolean =>
  stand.type !== 'other' && stand.color !== 'taken' && stand.color !== 'taken2';

const SIZE_MULTIPLIER_FOR_NORMALIZATION = 2;

const Scroller = styled.div`
  width: 100%;
  overflow: auto;
`;

const Container = styled.div<{ width: number; height: number }>`
  position: relative;
  background-color: ${HallColors.empty};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const StandElement = styled.button<{
  $left: number;
  $top: number;
  $color: string;
  $width: number;
  $height: number;
  $isHighInterest: boolean;
  $selectable: boolean;
}>`
  all: unset;
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ $color }) => $color};
  border: 2px solid white;
  box-sizing: border-box;
  cursor: ${({ $selectable }) => ($selectable ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  color: #111;

  &:focus-visible {
    outline: 2px solid #111;
    outline-offset: 1px;
  }

  &::after {
    content: ${({ $isHighInterest }) => ($isHighInterest ? "'HI'" : 'none')};
    display: ${({ $isHighInterest }) => ($isHighInterest ? 'inline-flex' : 'none')};
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2px;
    right: 2px;
    padding: 1px 5px;
    border-radius: 999px;
    background: #fff7ed;
    color: #9a3412;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
  }
`;

type LoadState = { status: 'pending' } | { status: 'error'; error: Error } | { status: 'success'; stands: Stand[] };

interface SelectableHallProps {
  highInterestStandIds?: string[];
  selectedStandIds: string[];
  onToggleStand: (standId: string) => void;
  multiplier?: number;
}

export const SelectableHall = ({
  highInterestStandIds = [],
  selectedStandIds,
  onToggleStand,
  multiplier
}: SelectableHallProps) => {
  const isPhone = usePhone();
  const resolvedMultiplier = multiplier ?? (isPhone ? 7 : 12);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'pending' });

  useEffect(() => {
    const parsed = hallSchema.safeParse(hallJson);

    if (parsed.success) {
      setLoadState({ status: 'success', stands: parsed.data });
    } else {
      setLoadState({ status: 'error', error: parsed.error });
    }
  }, []);

  const containerSize = useMemo(() => {
    if (loadState.status !== 'success') {
      return { width: 0, height: 0 };
    }

    return loadState.stands.reduce(
      (size, stand) => {
        const rightEdge = stand.start.col + stand.width * SIZE_MULTIPLIER_FOR_NORMALIZATION;
        const bottomEdge = stand.start.row + stand.height * SIZE_MULTIPLIER_FOR_NORMALIZATION;

        return {
          width: Math.max(size.width, rightEdge),
          height: Math.max(size.height, bottomEdge)
        };
      },
      { width: 0, height: 0 }
    );
  }, [loadState]);

  if (loadState.status === 'pending') {
    return <Typography size="sm">Loading…</Typography>;
  }

  if (loadState.status === 'error') {
    return <Typography size="sm">Failed to load hall layout.</Typography>;
  }

  const resolveColor = (stand: Stand): string => {
    if (!isStandSelectable(stand)) {
      return StandColorsMap[stand.color];
    }

    if (selectedStandIds.includes(stand.index)) {
      return SELECTED_COLOR;
    }

    return BackgroundColors.green.medium;
  };

  return (
    <Scroller>
      <Container width={containerSize.width * resolvedMultiplier} height={containerSize.height * resolvedMultiplier}>
        {loadState.stands.map((stand) => {
          const selectable = isStandSelectable(stand);
          const standSelectionId = stand.index;
          const isHighInterest = highInterestStandIds.includes(standSelectionId);
          const left = stand.start.col * resolvedMultiplier;
          const top = stand.start.row * resolvedMultiplier;
          const width = stand.width * resolvedMultiplier * SIZE_MULTIPLIER_FOR_NORMALIZATION;
          const height = stand.height * resolvedMultiplier * SIZE_MULTIPLIER_FOR_NORMALIZATION;

          return (
            <StandElement
              key={stand.id}
              type="button"
              $left={left}
              $top={top}
              $width={width}
              $height={height}
              $color={resolveColor(stand)}
              $isHighInterest={isHighInterest}
              $selectable={selectable}
              disabled={!selectable}
              aria-pressed={selectable ? selectedStandIds.includes(standSelectionId) : undefined}
              aria-label={`${stand.description ?? `Stand ${stand.index}`}${isHighInterest ? ', High Interest' : ''}`}
              onClick={selectable ? () => onToggleStand(standSelectionId) : undefined}
            >
              {stand.type !== 'other' ? stand.index : stand.description}
            </StandElement>
          );
        })}
      </Container>
    </Scroller>
  );
};
