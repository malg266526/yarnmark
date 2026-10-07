import type { StandProps } from '../StandProps.ts';

export const isExistingStand = (stands: readonly StandProps[], stand: StandProps) =>
  stands.some((existingStand) => existingStand.id === stand.id);
