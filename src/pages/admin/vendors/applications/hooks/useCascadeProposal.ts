import { useMemo } from 'react';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission';
import { getCascadeChoiceReservations } from '../utils/standAllocationUtils';
import { buildCascadeProposalCsv, type CascadeExportLabels } from '../utils/cascadeExportUtils';

export const CASCADE_PROPOSAL_FILE_NAME = 'yarnmark-stand-proposal.csv';

export const useCascadeProposal = (applications: VendorApplication[], exportLabels: CascadeExportLabels) => {
  const reservations = useMemo(() => getCascadeChoiceReservations(applications), [applications]);
  const csv = buildCascadeProposalCsv(reservations, exportLabels);

  return {
    reservations,
    manualNegotiationReservations: reservations.filter(({ reservedStandId }) => reservedStandId === null),
    exportUrl: reservations.length > 0 ? `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}` : undefined
  };
};
