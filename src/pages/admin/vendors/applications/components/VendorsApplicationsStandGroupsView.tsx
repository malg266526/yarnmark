import React from 'react';
import {
  StandGroupCard,
  StandGroups,
  StandGroupTitle,
  StandRequestItem,
  StandRequestList,
  StandRequestMeta,
  StandRequestPair,
  StandRequestVendor
} from '../VendorsApplicationsPage.styled';
import { formatDateTime } from '../utils/vendorsApplicationsFormatters';
import { groupApplicationsByStand } from '../utils/standGroupingUtils';
import { formatStandGroup } from '../utils/standChoiceUtils';
import { VendorsApplicationsStandGroupsViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsStandGroupsView = ({
  applications,
  locale,
  resolvePriorityLabel
}: VendorsApplicationsStandGroupsViewProps) => {
  const standGroups = groupApplicationsByStand(applications);

  return (
    <StandGroups>
      {standGroups.map((standGroup) => (
        <StandGroupCard key={standGroup.standId}>
          <StandGroupTitle>{standGroup.standId}</StandGroupTitle>
          <StandRequestList>
            {standGroup.requests.map((request) => (
              <StandRequestItem key={`${standGroup.standId}-${request.applicationId}`}>
                <StandRequestVendor>
                  {request.storeName}
                  {request.pairStandIds.length > 0 ? (
                    <StandRequestPair>{formatStandGroup(request.pairStandIds)}</StandRequestPair>
                  ) : null}
                </StandRequestVendor>
                <StandRequestMeta>{formatDateTime(request.submittedAt, locale)}</StandRequestMeta>
                <StandRequestMeta>{resolvePriorityLabel(request.priority)}</StandRequestMeta>
              </StandRequestItem>
            ))}
          </StandRequestList>
        </StandGroupCard>
      ))}
    </StandGroups>
  );
};
