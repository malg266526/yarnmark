import { Coordinate, StandColor, StandProps, StandType } from '../StandProps';

export type StandsJsonFile = {
  index: string;
  vendor?: string | null;
  description: string | null;
  type: StandType;
  color: StandColor | null;
  width: number | null;
  height: number | null;
  isHorizontal: boolean;
  start: Coordinate | null;
  end?: Coordinate | null;
};

export const generateStandsJSON = (stands: StandProps[]) => {
  // FIXME this name should be more meaningful
  const cleaned: StandsJsonFile[] = stands.map((stand) => ({
    index: stand.index,
    vendor: stand.vendor ?? null,
    description: stand.description ?? null,
    type: stand.type,
    color: stand.color ?? null,
    width: stand.width ?? null,
    height: stand.height ?? null,
    isHorizontal: stand.isHorizontal ?? false,
    start: stand.start ?? null,
    end: stand.end ?? null
  }));

  return JSON.stringify(cleaned, null, 2);
};
