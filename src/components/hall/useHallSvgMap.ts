import { useEffect, useMemo, useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import {
  fetchAssignedStandVendorsFromApi,
  type AssignedStandVendors
} from '../../domain/vendorApplications/assignedStandsApi';
import { parseHallStands } from './hallStands';
import { applyAssignedStandVendors, getHallSvgMapLayout, type HallSvgMapLayout } from './hallSvgMapUtils';

const NO_ASSIGNED_STAND_VENDORS: AssignedStandVendors = new Map();

export const useHallSvgMap = (): HallSvgMapLayout | null => {
  const t = useTypedTranslation();
  const language = t.i18n.language;
  const [assignedVendors, setAssignedVendors] = useState<AssignedStandVendors>(NO_ASSIGNED_STAND_VENDORS);

  useEffect(() => {
    let isActive = true;

    fetchAssignedStandVendorsFromApi()
      .then((vendors) => {
        if (isActive) {
          setAssignedVendors(vendors);
        }
      })
      .catch((error: unknown) => {
        console.error('Assigned stand vendors could not be loaded', error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return useMemo(() => {
    const parsedStands = parseHallStands();

    return parsedStands.success
      ? getHallSvgMapLayout(applyAssignedStandVendors(parsedStands.data, assignedVendors), language)
      : null;
  }, [assignedVendors, language]);
};
