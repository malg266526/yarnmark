import { useState } from 'react';
import type { StandProps } from './StandProps';
import { HALL_PRESETS, type HallPresetId } from './utils/hallPresets';
import { parseHallStands } from './utils/parseHallStands';

export const useHallPresetImport = (onImport: (stands: StandProps[]) => void) => {
  const [pendingPresetId, setPendingPresetId] = useState<HallPresetId | null>(null);

  const requestImport = (presetId: HallPresetId) => {
    setPendingPresetId(presetId);
  };

  const confirmImport = () => {
    if (pendingPresetId) {
      const stands = parseHallStands(HALL_PRESETS[pendingPresetId]);

      if (stands) {
        onImport(stands);
      }
    }

    setPendingPresetId(null);
  };

  const cancelImport = () => {
    setPendingPresetId(null);
  };

  return { pendingPresetId, requestImport, confirmImport, cancelImport };
};
