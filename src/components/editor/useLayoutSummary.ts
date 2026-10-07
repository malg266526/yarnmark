import { useMemo } from 'react';
import { useEditor } from './EditorContext';
import { HALL_PRESETS } from './utils/hallPresets';
import { parseHallStands } from './utils/parseHallStands';
import { summarizeLayout, type LayoutSummary } from './utils/layoutSummaryUtils';

const HALL_2026_SUMMARY: LayoutSummary = summarizeLayout(parseHallStands(HALL_PRESETS.hall2026) ?? []);

export const useLayoutSummary = () => {
  const { stands } = useEditor();
  const current = useMemo(() => summarizeLayout(stands), [stands]);

  return { current, baseline: HALL_2026_SUMMARY };
};
