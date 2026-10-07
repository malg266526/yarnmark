import type { StandColor, StandProps, StandType } from '../StandProps.ts';

export const CUSTOM_STAND_INDEX_PREFIX = 'c';
export const CUSTOM_STAND_COLOR: StandColor = 'normal3';

const ALTERNATING_TYPE_COLORS: Record<StandType, readonly StandColor[]> = {
  premium: ['premium'],
  standard: ['normal1', 'normal2'],
  mini: ['small1', 'small2'],
  c: [CUSTOM_STAND_COLOR],
  other: ['taken']
};

export const isCustomStandIndex = (index: string) => index.trim().toLowerCase().startsWith(CUSTOM_STAND_INDEX_PREFIX);

export const getSuggestedStandColor = (
  stand: Pick<StandProps, 'index' | 'type'>,
  existingStands: readonly StandProps[]
): StandColor => {
  if (isCustomStandIndex(stand.index)) {
    return CUSTOM_STAND_COLOR;
  }

  const typeColors = ALTERNATING_TYPE_COLORS[stand.type];
  const previousStandOfType = [...existingStands]
    .reverse()
    .find(
      (existingStand) =>
        existingStand.type === stand.type &&
        !isCustomStandIndex(existingStand.index) &&
        existingStand.color !== undefined &&
        typeColors.includes(existingStand.color)
    );

  if (!previousStandOfType?.color) {
    return typeColors[0];
  }

  const previousColorPosition = typeColors.indexOf(previousStandOfType.color);

  return typeColors[(previousColorPosition + 1) % typeColors.length];
};
