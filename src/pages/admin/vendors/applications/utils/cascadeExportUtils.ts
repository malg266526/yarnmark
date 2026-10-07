import type { CascadeChoiceReservation } from './standAllocationUtils.ts';
import { buildCsv } from './csvUtils.ts';

export interface CascadeExportLabels {
  applicationId: string;
  storeName: string;
  email: string;
  preferredStands: string;
  proposedStand: string;
  result: string;
  suggested: string;
  manualNegotiation: string;
}

export const buildCascadeProposalCsv = (reservations: CascadeChoiceReservation[], labels: CascadeExportLabels) => {
  const rows = [
    [labels.applicationId, labels.storeName, labels.email, labels.preferredStands, labels.proposedStand, labels.result],
    ...reservations.map(({ application, reservedStandId }) => [
      application.id,
      application.storeName,
      application.email,
      application.preferredStands.join(', '),
      reservedStandId ?? '',
      reservedStandId ? labels.suggested : labels.manualNegotiation
    ])
  ];

  return buildCsv(rows);
};
