import { isHighInterestStand } from '../../../../../domain/vendorApplications/vendorFormStandInterestUtils.ts';

export const STAND_DEMAND_LEVELS = ['none', 'low', 'medium', 'high'] as const;

export type StandDemandLevel = (typeof STAND_DEMAND_LEVELS)[number];

export const resolveStandDemandLevel = (requestCount: number): StandDemandLevel => {
  if (requestCount <= 0) {
    return 'none';
  }

  if (isHighInterestStand(requestCount)) {
    return 'high';
  }

  return requestCount === 1 ? 'low' : 'medium';
};

export interface HallCoverage {
  freeStandIds: string[];
  requestedStandCount: number;
  totalStandCount: number;
}

export const buildHallCoverage = (
  vendorStandIds: string[],
  requestCounts: ReadonlyMap<string, number>
): HallCoverage => {
  const freeStandIds = vendorStandIds.filter((standId) => (requestCounts.get(standId) ?? 0) === 0);

  return {
    freeStandIds,
    requestedStandCount: vendorStandIds.length - freeStandIds.length,
    totalStandCount: vendorStandIds.length
  };
};
