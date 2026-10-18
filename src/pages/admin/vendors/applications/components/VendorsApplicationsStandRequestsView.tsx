import React, { useMemo } from 'react';
import {
  ApplicationsMapHint,
  StandGroupCard,
  ApplicationsStandAssignmentButton,
  StandGroupTitle,
  StandRequestItem,
  StandRequestList,
  StandRequestMeta,
  StandRequestPair,
  StandRequestVendor
} from '../VendorsApplicationsPage.styled';
import { formatCompactDateTime } from '../utils/vendorsApplicationsFormatters';
import { groupApplicationsByStand } from '../utils/standGroupingUtils';
import { formatStandGroup } from '../utils/standChoiceUtils';
import { VENDOR_APPLICATIONS_FILTER_ALL } from '../vendorsApplicationsConstants';
import { VendorsApplicationsStandRequestsViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsStandRequestsView = ({
  applications,
  locale,
  resolvePriorityLabel,
  selectedStandId,
  standAssignment,
  translate
}: VendorsApplicationsStandRequestsViewProps) => {
  const { acceptStand, assignStands, savingStandApplicationId } = standAssignment;
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
        {selectedStandGroup.requests.map((request) => {
          const assignedStands = applications.find(({ id }) => id === request.applicationId)?.assignedStands ?? [];
          const isAssigned = assignedStands.includes(selectedStandGroup.standId);
          const isSaving = savingStandApplicationId === request.applicationId;

          return (
            <StandRequestItem $hasAction key={`${selectedStandGroup.standId}-${request.applicationId}`}>
              <StandRequestVendor>
                {request.storeName}
                {request.pairStandIds.length > 0 ? (
                  <StandRequestPair>{formatStandGroup(request.pairStandIds)}</StandRequestPair>
                ) : null}
              </StandRequestVendor>
              <StandRequestMeta>{formatCompactDateTime(request.submittedAt, locale)}</StandRequestMeta>
              <StandRequestMeta>{resolvePriorityLabel(request.priority)}</StandRequestMeta>
              {isAssigned ? (
                <ApplicationsStandAssignmentButton
                  type="button"
                  disabled={isSaving}
                  aria-label={translate('vendorsApplicationsPage.standAssignment.remove', {
                    standId: selectedStandGroup.standId
                  })}
                  onClick={() =>
                    void assignStands(
                      request.applicationId,
                      assignedStands.filter((standId) => standId !== selectedStandGroup.standId)
                    )
                  }
                >
                  {translate('vendorsApplicationsPage.standAssignment.selectedStand', {
                    standId: selectedStandGroup.standId
                  })}
                </ApplicationsStandAssignmentButton>
              ) : (
                <ApplicationsStandAssignmentButton
                  type="button"
                  disabled={isSaving}
                  aria-label={translate('vendorsApplicationsPage.standAssignment.assignLabel', {
                    name: request.storeName,
                    standId: selectedStandGroup.standId
                  })}
                  onClick={() => void acceptStand(request.applicationId, selectedStandGroup.standId)}
                >
                  {translate('vendorsApplicationsPage.standAssignment.assign')}
                </ApplicationsStandAssignmentButton>
              )}
            </StandRequestItem>
          );
        })}
      </StandRequestList>
    </StandGroupCard>
  );
};
