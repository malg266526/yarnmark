import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HallMap } from '../../../../components/hall/HallMap';
import { isVendorStand, parseHallStands, type HallStand } from '../../../../components/hall/hallStands';
import { StandColorsMap } from '../../../../components/editor/StandProps';
import { Typography } from '../../../../components/Typography';
import { usePhone } from '../../../../hooks/usePhone';
import { BackgroundColors, WarningColors } from '../../../../styles/theme';

const SELECTED_COLOR = '#FF8C00';

const Scroller = styled.div`
  width: 100%;
  overflow: auto;
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
    background: ${WarningColors.badgeBackground};
    color: ${WarningColors.badgeText};
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
  }
`;

type LoadState = { status: 'pending' } | { status: 'error'; error: Error } | { status: 'success'; stands: HallStand[] };

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
    const parsed = parseHallStands();

    if (parsed.success) {
      setLoadState({ status: 'success', stands: parsed.data });
    } else {
      setLoadState({ status: 'error', error: parsed.error });
    }
  }, []);

  if (loadState.status === 'pending') {
    return <Typography size="sm">Loading…</Typography>;
  }

  if (loadState.status === 'error') {
    return <Typography size="sm">Failed to load hall layout.</Typography>;
  }

  const resolveColor = (stand: HallStand): string => {
    if (!isVendorStand(stand)) {
      return StandColorsMap[stand.color];
    }

    if (selectedStandIds.includes(stand.index)) {
      return SELECTED_COLOR;
    }

    return BackgroundColors.green.medium;
  };

  return (
    <Scroller>
      <HallMap
        multiplier={resolvedMultiplier}
        stands={loadState.stands}
        renderStand={(stand, box) => {
          const selectable = isVendorStand(stand);
          const standSelectionId = stand.index;
          const isHighInterest = highInterestStandIds.includes(standSelectionId);

          return (
            <StandElement
              key={stand.id}
              type="button"
              $left={box.left}
              $top={box.top}
              $width={box.width}
              $height={box.height}
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
        }}
      />
    </Scroller>
  );
};
