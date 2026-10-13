import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { HallMap } from '../../../../components/hall/HallMap';
import { isVendorStand, parseHallStands, type HallStand } from '../../../../components/hall/hallStands';
import { isReservedStand, resolveStandColorKey } from '../../../../components/hall/standReservationUtils';
import { HallStandVendor } from '../../../../components/hall/HallStandVendor';
import { getPairableStandIndexes } from '../../../../components/hall/standAdjacencyUtils';
import { StandColorsMap } from '../../../../components/editor/StandProps';
import { Typography } from '../../../../components/Typography';
import { usePhone } from '../../../../hooks/usePhone';
import { BackgroundColors, WarningColors } from '../../../../styles/theme';

const SELECTED_COLOR = '#FF8C00';

const Scroller = styled.div`
  width: 100%;
  overflow: auto;
`;

const BLOCKED_STAND_OPACITY = 0.35;

const standElementLayout = css`
  all: unset;
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px solid white;
  font-size: 12px;
  color: #111;

  &:focus-visible {
    outline: 2px solid #111;
    outline-offset: 1px;
  }
`;

const selectableStand = css`
  cursor: pointer;
  opacity: 1;
`;

const blockedStand = css`
  cursor: default;
  opacity: ${BLOCKED_STAND_OPACITY};
`;

const plainStand = css`
  cursor: default;
  opacity: 1;
`;

const highInterestBadgeLayout = css`
  position: absolute;
  top: 2px;
  right: 2px;
  align-items: center;
  justify-content: center;
  padding: 1px 5px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
`;

const highInterestBadgeVisible = css`
  content: 'HI';
  display: inline-flex;
  background: ${WarningColors.badgeBackground};
  color: ${WarningColors.badgeText};
`;

const highInterestBadgeHidden = css`
  content: none;
  display: none;
`;

const StandElement = styled.button<{
  $left: number;
  $top: number;
  $color: string;
  $width: number;
  $height: number;
  $isHighInterest: boolean;
  $isBlocked: boolean;
  $selectable: boolean;
}>`
  ${standElementLayout}
  ${({ $isBlocked, $selectable }) => ($selectable ? selectableStand : $isBlocked ? blockedStand : plainStand)}
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ $color }) => $color};

  &::after {
    ${highInterestBadgeLayout}
    ${({ $isHighInterest }) => ($isHighInterest ? highInterestBadgeVisible : highInterestBadgeHidden)}
  }
`;

type LoadState = { status: 'pending' } | { status: 'error'; error: Error } | { status: 'success'; stands: HallStand[] };

interface SelectableHallProps {
  highInterestStandIds?: string[];
  isPairMode?: boolean;
  pairAnchorStandId?: string | null;
  selectedStandIds: string[];
  onToggleStand: (standId: string) => void;
  multiplier?: number;
}

export const SelectableHall = ({
  highInterestStandIds = [],
  isPairMode = false,
  pairAnchorStandId = null,
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

  const pairableStandIds = useMemo(() => {
    if (!isPairMode || loadState.status !== 'success') {
      return null;
    }

    return getPairableStandIndexes(loadState.stands.filter(isVendorStand), pairAnchorStandId);
  }, [isPairMode, loadState, pairAnchorStandId]);

  if (loadState.status === 'pending') {
    return <Typography size="sm">Loading…</Typography>;
  }

  if (loadState.status === 'error') {
    return <Typography size="sm">Failed to load hall layout.</Typography>;
  }

  const resolveColor = (stand: HallStand): string => {
    if (!isVendorStand(stand) || isReservedStand(stand)) {
      return StandColorsMap[resolveStandColorKey(stand)];
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
          const selectable =
            isVendorStand(stand) &&
            !isReservedStand(stand) &&
            (!pairableStandIds || selectedStandIds.includes(stand.index) || pairableStandIds.includes(stand.index));
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
              $isBlocked={isVendorStand(stand) && !isReservedStand(stand) && !selectable}
              $selectable={selectable}
              disabled={!selectable}
              aria-pressed={selectable ? selectedStandIds.includes(standSelectionId) : undefined}
              aria-label={`${stand.description ?? `Stand ${stand.index}`}${isHighInterest ? ', High Interest' : ''}`}
              onClick={selectable ? () => onToggleStand(standSelectionId) : undefined}
            >
              {stand.type !== 'other' ? stand.index : stand.description}
              <HallStandVendor vendor={stand.vendor} vendorLogoUrl={stand.vendorLogoUrl} />
            </StandElement>
          );
        }}
      />
    </Scroller>
  );
};
