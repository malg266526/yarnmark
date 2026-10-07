import { z } from 'zod';
import { StandColorsMap, type StandProps } from '../StandProps.ts';
import { generateId } from './generateId.ts';

const coordinateSchema = z.object({ row: z.number().int(), col: z.number().int() });

const standColorKeys = Object.keys(StandColorsMap) as [keyof typeof StandColorsMap, ...(keyof typeof StandColorsMap)[]];

const hallStandSchema = z.object({
  id: z.string().nullish(),
  index: z.string(),
  vendor: z.string().nullish(),
  description: z.string().nullish(),
  type: z.enum(['premium', 'mini', 'standard', 'c', 'other']),
  width: z.number().nullish(),
  height: z.number().nullish(),
  color: z.enum(standColorKeys).nullish(),
  isHorizontal: z.boolean().nullish(),
  start: coordinateSchema.nullish(),
  end: coordinateSchema.nullish()
});

const hallSchema = z.array(hallStandSchema);

export const parseHallStands = (data: unknown, createId: () => string = generateId): StandProps[] | null => {
  const result = hallSchema.safeParse(data);

  if (!result.success) {
    return null;
  }

  return result.data.map((stand) => ({
    id: stand.id ?? createId(),
    index: stand.index,
    vendor: stand.vendor ?? undefined,
    description: stand.description ?? undefined,
    type: stand.type,
    width: stand.width ?? undefined,
    height: stand.height ?? undefined,
    color: stand.color ?? undefined,
    isHorizontal: stand.isHorizontal ?? undefined,
    start: stand.start ?? undefined,
    end: stand.end ?? undefined
  }));
};
