import { useEffect, useState } from 'react';
import {
  fetchAssignedStandVendorsFromApi,
  type AssignedStandVendors
} from '../domain/vendorApplications/assignedStandsApi';

const NO_ASSIGNED_STAND_VENDORS: AssignedStandVendors = new Map();

export const useAssignedStandVendors = (): AssignedStandVendors => {
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

  return assignedVendors;
};
