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
