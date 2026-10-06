import React, { useMemo } from 'react';
import {
  ApplicationsMapHint,
  StandGroupCard,
  StandGroupTitle,
  StandRequestItem,
  StandRequestList,
  StandRequestMeta,
  StandRequestVendor
} from '../VendorsApplicationsPage.styled';
import { formatCompactDateTime } from '../utils/vendorsApplicationsFormatters';
import { groupApplicationsByStand } from '../utils/standGroupingUtils';
import { VENDOR_APPLICATIONS_FILTER_ALL } from '../vendorsApplicationsConstants';
import { VendorsApplicationsStandRequestsViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsStandRequestsView = ({
  applications,
  locale,
  resolvePriorityLabel,
  selectedStandId,
  translate
}: VendorsApplicationsStandRequestsViewProps) => {
  const selectedStandGroup = useMemo(
    () => groupApplicationsByStand(applications).find(({ standId }) => standId === selectedStandId),
    [applications, selectedStandId]
  );

  if (!selectedStandGroup) {
    return (
      <ApplicationsMapHint>
        {selectedStandId === VENDOR_APPLICATIONS_FILTER_ALL
          ? translate('vendorsApplicationsPage.map.selectHint')
          : translate('vendorsApplicationsPage.map.noRequests', { standId: selectedStandId })}
      </ApplicationsMapHint>
    );
  }

  return (
    <StandGroupCard>
      <StandGroupTitle>{selectedStandGroup.standId}</StandGroupTitle>
      <StandRequestList>
        {selectedStandGroup.requests.map((request) => (
          <StandRequestItem key={`${selectedStandGroup.standId}-${request.applicationId}`}>
            <StandRequestVendor>{request.storeName}</StandRequestVendor>
            <StandRequestMeta>{formatCompactDateTime(request.submittedAt, locale)}</StandRequestMeta>
            <StandRequestMeta>{resolvePriorityLabel(request.priority)}</StandRequestMeta>
          </StandRequestItem>
        ))}
      </StandRequestList>
    </StandGroupCard>
  );
};
