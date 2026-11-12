import { useMemo } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { parseHallStands } from './hallStands';
import { getHallSvgMapLayout, type HallSvgMapLayout } from './hallSvgMapUtils';

export const useHallSvgMap = (): HallSvgMapLayout | null => {
  const t = useTypedTranslation();
  const language = t.i18n.language;

  return useMemo(() => {
    const parsedStands = parseHallStands();

    return parsedStands.success ? getHallSvgMapLayout(parsedStands.data, language) : null;
  }, [language]);
};
