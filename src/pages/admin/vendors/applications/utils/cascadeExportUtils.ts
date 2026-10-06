import type { CascadeChoiceReservation } from './standAllocationUtils.ts';

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

const escapeCsvCell = (value: string) => {
  const safeValue = /^[\s]*[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replaceAll('"', '""')}"`;
};

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

  return `\uFEFF${rows.map((row) => row.map(escapeCsvCell).join(';')).join('\r\n')}`;
};
