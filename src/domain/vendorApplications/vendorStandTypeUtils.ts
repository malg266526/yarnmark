export type VendorStandType = 'mini' | 'premium' | 'standard';

// Stand index prefixes used by src/assets/hall.json: S/C are standard, P premium, M mini.
// Entrances and technical areas (a0, a1, A2, A3) have no vendor stand type.
const STAND_TYPE_BY_INDEX_PREFIX: Record<string, VendorStandType> = {
  C: 'standard',
  M: 'mini',
  P: 'premium',
  S: 'standard'
};

export const resolveStandType = (standId: string): VendorStandType | null =>
  STAND_TYPE_BY_INDEX_PREFIX[standId.trim().charAt(0).toUpperCase()] ?? null;
