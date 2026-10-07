import { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useLayoutSummary } from './useLayoutSummary';
import type { SellableStandType } from './utils/layoutSummaryUtils';
import {
  DEFAULT_STAND_PRICES_2027,
  STAND_PRICES_2027_STORAGE_KEY,
  parseStandPriceInput,
  parseStoredStandPrices,
  summarizeFinances,
  type StandPrices
} from './utils/layoutFinanceUtils';

export const useLayoutFinance = () => {
  const { current, baseline } = useLayoutSummary();
  const [prices, setPrices] = useLocalStorage<StandPrices>(
    STAND_PRICES_2027_STORAGE_KEY,
    DEFAULT_STAND_PRICES_2027,
    parseStoredStandPrices
  );
  const finances = useMemo(() => summarizeFinances(current, baseline, prices), [current, baseline, prices]);

  const setPrice = (type: SellableStandType, value: string) => {
    setPrices({ ...prices, [type]: parseStandPriceInput(value) });
  };

  return { finances, prices, setPrice };
};
