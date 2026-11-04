import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { getStandChoicePositions } from './standChoiceUtils.ts';

/** Planned `assignedStands` per application id; only entries touched in the planner are present. */
export type StandPlanDraft = Readonly<Record<string, string[]>>;

export interface StandPlanChange {
  applicationId: string;
  standIds: string[];
}

export interface StandPlanVendorOption {
  applicationId: string;
  assignedStands: string[];
  storeName: string;
}

export interface StandPlanVendorOptions {
  otherVendors: StandPlanVendorOption[];
  requestingVendors: StandPlanVendorOption[];
}

export const EMPTY_STAND_PLAN_DRAFT: StandPlanDraft = {};

const isPlannableApplication = ({ status }: VendorApplication) => status !== 'rejected';

const compareStoreNames = (left: StandPlanVendorOption, right: StandPlanVendorOption) =>
  left.storeName.localeCompare(right.storeName, undefined, { sensitivity: 'base' });

const haveSameStands = (left: string[], right: string[]) =>
  left.length === right.length && left.every((standId) => right.includes(standId));

const toVendorOption = ({ assignedStands, id, storeName }: VendorApplication): StandPlanVendorOption => ({
  applicationId: id,
  assignedStands,
  storeName
});

export const applyStandPlanDraft = (applications: VendorApplication[], draft: StandPlanDraft): VendorApplication[] =>
  applications.map((application) =>
    draft[application.id] ? { ...application, assignedStands: draft[application.id] } : application
  );

export const getStandPlanChanges = (applications: VendorApplication[], draft: StandPlanDraft): StandPlanChange[] =>
  applications.flatMap(({ assignedStands, id }) => {
    const standIds = draft[id];

    return standIds && !haveSameStands(standIds, assignedStands) ? [{ applicationId: id, standIds }] : [];
  });

export const pruneStandPlanDraft = (applications: VendorApplication[], draft: StandPlanDraft): StandPlanDraft => {
  const changes = getStandPlanChanges(applications, draft);

  return changes.length === Object.keys(draft).length
    ? draft
    : Object.fromEntries(changes.map(({ applicationId, standIds }) => [applicationId, standIds]));
};

const resolvePlannedStands = (applications: VendorApplication[], draft: StandPlanDraft, applicationId: string) =>
  draft[applicationId] ?? applications.find(({ id }) => id === applicationId)?.assignedStands ?? [];

export const addVendorToStand = (
  applications: VendorApplication[],
  draft: StandPlanDraft,
  applicationId: string,
  standId: string
): StandPlanDraft => {
  const plannedStands = resolvePlannedStands(applications, draft, applicationId);

  return plannedStands.includes(standId) ? draft : { ...draft, [applicationId]: [...plannedStands, standId] };
};

export const removeVendorFromStand = (
  applications: VendorApplication[],
  draft: StandPlanDraft,
  applicationId: string,
  standId: string
): StandPlanDraft => ({
  ...draft,
  [applicationId]: resolvePlannedStands(applications, draft, applicationId).filter((id) => id !== standId)
});

export const getStandVendors = (plannedApplications: VendorApplication[], standId: string): StandPlanVendorOption[] =>
  plannedApplications
    .filter(({ assignedStands }) => assignedStands.includes(standId))
    .map(toVendorOption)
    .sort(compareStoreNames);

export const buildStandPlanVendorOptions = (
  plannedApplications: VendorApplication[],
  standId: string
): StandPlanVendorOptions => {
  const candidates = plannedApplications.filter(
    (application) => isPlannableApplication(application) && !application.assignedStands.includes(standId)
  );
  const choicePositionById = new Map(
    candidates.map((application) => [application.id, getStandChoicePositions(application).get(standId)])
  );
  const requestingVendors = candidates
    .filter(({ id }) => choicePositionById.get(id) !== undefined)
    .map(toVendorOption)
    .sort(
      (left, right) =>
        (choicePositionById.get(left.applicationId) ?? 0) - (choicePositionById.get(right.applicationId) ?? 0) ||
        compareStoreNames(left, right)
    );
  const otherVendors = candidates
    .filter(({ id }) => choicePositionById.get(id) === undefined)
    .map(toVendorOption)
    .sort(compareStoreNames);

  return { otherVendors, requestingVendors };
};

export const getUnassignedApplications = (plannedApplications: VendorApplication[]): VendorApplication[] =>
  plannedApplications
    .filter((application) => isPlannableApplication(application) && application.assignedStands.length === 0)
    .sort((left, right) => left.storeName.localeCompare(right.storeName, undefined, { sensitivity: 'base' }));
