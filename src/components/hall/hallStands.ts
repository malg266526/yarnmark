import zod from 'zod';
import hallJson from '../../assets/hall.json';

const hallStandTypeSchema = zod.union([
  zod.literal('premium'),
  zod.literal('mini'),
  zod.literal('standard'),
  zod.literal('other')
]);

const hallStandColorSchema = zod.union([
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

const hallStandSchema = zod.object({
  id: zod.string(),
  index: zod.string(),
  vendor: zod.string().optional(),
  description: zod.string().optional(),
  type: hallStandTypeSchema,
  color: hallStandColorSchema,
  width: zod.number(),
  height: zod.number(),
  isHorizontal: zod.boolean(),
  start: zod.object({ row: zod.number(), col: zod.number() }),
  end: zod.object({ row: zod.number(), col: zod.number() })
});

export const hallStandsSchema = zod.array(hallStandSchema);

export type HallStand = zod.infer<typeof hallStandSchema>;

export const parseHallStands = (stands: unknown = hallJson) => hallStandsSchema.safeParse(stands);

export const isVendorStand = (stand: HallStand) =>
  stand.type !== 'other' && stand.color !== 'taken' && stand.color !== 'taken2';
