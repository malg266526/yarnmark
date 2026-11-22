import { useCallback, useMemo, useState } from 'react';
import { getHallSvgMapTooltipPosition, type HallSvgMapLayout, type HallSvgMapTooltipPosition } from './hallSvgMapUtils';

export interface HallSvgMapTooltipState {
  text: string;
  position: HallSvgMapTooltipPosition;
}

export const useHallSvgMapTooltip = (layout: HallSvgMapLayout) => {
  const [hoveredStandId, setHoveredStandId] = useState<string | null>(null);

  const showStandTooltip = useCallback((standId: string) => setHoveredStandId(standId), []);
  const hideStandTooltip = useCallback(
    (standId: string) => setHoveredStandId((currentStandId) => (currentStandId === standId ? null : currentStandId)),
    []
  );

  const tooltip = useMemo((): HallSvgMapTooltipState | null => {
    const stand = layout.stands.find(({ id }) => id === hoveredStandId);

    if (!stand?.logo) {
      return null;
    }

    const { name, y, size } = stand.logo;

    return {
      text: name,
      position: getHallSvgMapTooltipPosition({ top: y, bottom: y + size, centerX: stand.centerX }, layout)
    };
  }, [hoveredStandId, layout]);

  return { tooltip, showStandTooltip, hideStandTooltip };
};
