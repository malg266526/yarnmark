import { useMemo } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useAssignedStandVendors } from '../../hooks/useAssignedStandVendors';
import { parseHallStands } from './hallStands';
import { applyAssignedStandVendors, getHallSvgMapLayout, type HallSvgMapLayout } from './hallSvgMapUtils';

export const useHallSvgMap = (): HallSvgMapLayout | null => {
  const t = useTypedTranslation();
  const language = t.i18n.language;
  const assignedVendors = useAssignedStandVendors();

  return useMemo(() => {
    const parsedStands = parseHallStands();

    return parsedStands.success
      ? getHallSvgMapLayout(applyAssignedStandVendors(parsedStands.data, assignedVendors), language)
      : null;
  }, [assignedVendors, language]);
};
