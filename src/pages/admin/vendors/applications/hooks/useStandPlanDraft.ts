import { useEffect, useMemo, useState } from 'react';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import type { VendorsApplicationsStandPlan } from '../components/vendorsApplicationsViewContracts';
import { VENDOR_APPLICATIONS_FILTER_ALL } from '../vendorsApplicationsConstants';
import { buildVendorMapAssignments } from '../utils/vendorMapAssignmentsUtils';
import {
  addVendorToStand,
  applyStandPlanDraft,
  buildStandPlanVendorOptions,
  EMPTY_STAND_PLAN_DRAFT,
  getStandPlanChanges,
  getStandVendors,
  getUnassignedApplications,
  pruneStandPlanDraft,
  removeVendorFromStand,
  type StandPlanDraft
} from '../utils/standPlanUtils';

const showEveryAssignment = () => true;

export const useStandPlanDraft = (
  applications: VendorApplication[],
  assignStands: (applicationId: string, standIds: string[]) => Promise<void>
) => {
  const [draft, setDraft] = useState<StandPlanDraft>(EMPTY_STAND_PLAN_DRAFT);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedStandId, setSelectedStandId] = useState<string>(VENDOR_APPLICATIONS_FILTER_ALL);
  const [highlightedApplicationId, setHighlightedApplicationId] = useState<string | null>(null);

  const plannedApplications = useMemo(() => applyStandPlanDraft(applications, draft), [applications, draft]);
  const changes = useMemo(() => getStandPlanChanges(applications, draft), [applications, draft]);
  const assignments = useMemo(
    () => buildVendorMapAssignments(plannedApplications, showEveryAssignment),
    [plannedApplications]
  );
  const hasChanges = changes.length > 0;

  useEffect(() => {
    setDraft((current) => pruneStandPlanDraft(applications, current));
  }, [applications]);

  useEffect(() => {
    if (!hasChanges) return;

    const warnAboutUnsavedPlan = (event: BeforeUnloadEvent) => event.preventDefault();

    window.addEventListener('beforeunload', warnAboutUnsavedPlan);

    return () => window.removeEventListener('beforeunload', warnAboutUnsavedPlan);
  }, [hasChanges]);

  const addVendor = (applicationId: string) => {
    if (isSaving || selectedStandId === VENDOR_APPLICATIONS_FILTER_ALL) return;
    setDraft((current) => addVendorToStand(applications, current, applicationId, selectedStandId));
  };

  const removeVendor = (applicationId: string) => {
    if (isSaving) return;
    setDraft((current) => removeVendorFromStand(applications, current, applicationId, selectedStandId));
  };

  const save = async () => {
    setIsSaving(true);

    for (const { applicationId, standIds } of changes) {
      await assignStands(applicationId, standIds);
    }

    setIsSaving(false);
  };

  const standPlan: VendorsApplicationsStandPlan = {
    addVendor,
    assignments,
    changeCount: changes.length,
    discard: () => setDraft(EMPTY_STAND_PLAN_DRAFT),
    highlightedApplication: plannedApplications.find(({ id }) => id === highlightedApplicationId) ?? null,
    isSaving,
    removeVendor,
    save,
    selectedStandId,
    selectStand: setSelectedStandId,
    standVendors: getStandVendors(plannedApplications, selectedStandId),
    toggleHighlightedApplication: (applicationId) =>
      setHighlightedApplicationId((current) => (current === applicationId ? null : applicationId)),
    unassignedApplications: getUnassignedApplications(plannedApplications),
    vendorOptions: buildStandPlanVendorOptions(plannedApplications, selectedStandId)
  };

  return { plannedApplications, standPlan };
};
