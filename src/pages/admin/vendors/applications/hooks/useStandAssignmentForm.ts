import { useState } from 'react';
import { normalizeStandIds } from '../../../../../domain/vendorApplications/vendorFormStandIds.ts';
import type { VendorApplicationStandAssignmentViewProps } from '../components/vendorsApplicationsViewContracts';
import { buildStandAssignmentOptions } from '../utils/standAssignmentUtils';

export const useStandAssignmentForm = (
  application: VendorApplicationStandAssignmentViewProps['application'],
  {
    allApplications,
    assignStands,
    savingStandApplicationId,
    vendorStandIds
  }: VendorApplicationStandAssignmentViewProps['standAssignment']
) => {
  const [selectedStandIds, setSelectedStandIds] = useState(application.assignedStands);
  const isSaving = savingStandApplicationId === application.id;
  const options = buildStandAssignmentOptions(application, allApplications, vendorStandIds);
  const hasChanges =
    selectedStandIds.length !== application.assignedStands.length ||
    selectedStandIds.some((standId) => !application.assignedStands.includes(standId));

  const addStand = (standId: string) => {
    if (!standId || isSaving) return;
    setSelectedStandIds((current) => normalizeStandIds([...current, standId]));
  };

  const removeStand = (standId: string) => {
    if (isSaving) return;
    setSelectedStandIds((current) => current.filter((id) => id !== standId));
  };

  return {
    addStand,
    hasChanges,
    isSaving,
    options,
    removeStand,
    save: () => assignStands(application.id, selectedStandIds),
    selectedStandIds
  };
};
