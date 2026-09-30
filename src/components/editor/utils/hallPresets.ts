import hall2026Json from '../../../../docs/hall-2026.json';
import hall2027ProposalJson from '../../../../docs/hall-2027-proposal.json';

export const HALL_PRESETS = {
  hall2026: hall2026Json,
  proposal2027: hall2027ProposalJson
} as const;

export type HallPresetId = keyof typeof HALL_PRESETS;

export const HALL_PRESET_IDS = Object.keys(HALL_PRESETS) as HallPresetId[];
