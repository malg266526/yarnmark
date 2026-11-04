import React from 'react';
import {
  ApplicationActionRow,
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationsFieldHint,
  ApplicationsFilterSelect,
  ApplicationsMapHint,
  ApplicationsMapLayout,
  ApplicationsMapPanelSlot,
  ApplicationsMapSide,
  ApplicationsMeta,
  ApplicationsStandAssignmentButton,
  ApplicationsStandAssignmentRow,
  StandGroupCard,
  StandGroupTitle
} from '../VendorsApplicationsPage.styled';
import { buildStandPairHighlights, buildStandPriorityHighlights } from '../utils/vendorApplicationRowsUtils';
import type { StandPlanVendorOption } from '../utils/standPlanUtils';
import { VENDOR_APPLICATIONS_FILTER_ALL } from '../vendorsApplicationsConstants';
import { VendorsApplicationsMapView } from './VendorsApplicationsMapView';
import type { VendorsApplicationsPlannerViewProps } from './vendorsApplicationsViewContracts';

const NO_VENDOR_VALUE = '';
const PLANNER_VENDOR_FIELD_ID = 'vendor-applications-planner-vendor';

export const VendorsApplicationsPlannerView = ({
  mapMultiplier,
  plannedApplications,
  standPlan,
  translate
}: VendorsApplicationsPlannerViewProps) => {
  const {
    addVendor,
    assignments,
    changeCount,
    discard,
    highlightedApplication,
    isSaving,
    removeVendor,
    save,
    selectedStandId,
    selectStand,
    standVendors,
    toggleHighlightedApplication,
    unassignedApplications,
    vendorOptions
  } = standPlan;
  const hasSelectedStand = selectedStandId !== VENDOR_APPLICATIONS_FILTER_ALL;

  const renderVendorOption = ({ applicationId, assignedStands, storeName }: StandPlanVendorOption) => (
    <option key={applicationId} value={applicationId}>
      {assignedStands.length > 0
        ? translate('vendorsApplicationsPage.planner.vendorWithStands', {
            name: storeName,
            stands: assignedStands.join(', ')
          })
        : storeName}
    </option>
  );

  return (
    <>
      <ApplicationsMapHint>{translate('vendorsApplicationsPage.planner.description')}</ApplicationsMapHint>
      <ApplicationsStandAssignmentRow>
        <ApplicationsMeta>
          {translate('vendorsApplicationsPage.planner.unsavedCount', { count: changeCount })}
        </ApplicationsMeta>
        <ApplicationsStandAssignmentButton
          type="button"
          disabled={isSaving || changeCount === 0}
          onClick={() => {
            void save();
          }}
        >
          {translate('vendorsApplicationsPage.planner.save')}
        </ApplicationsStandAssignmentButton>
        <ApplicationsStandAssignmentButton type="button" disabled={isSaving || changeCount === 0} onClick={discard}>
          {translate('vendorsApplicationsPage.planner.discard')}
        </ApplicationsStandAssignmentButton>
        {isSaving ? (
          <ApplicationsFieldHint>{translate('vendorsApplicationsPage.statusField.saving')}</ApplicationsFieldHint>
        ) : null}
      </ApplicationsStandAssignmentRow>
      <ApplicationsMapLayout>
        <ApplicationsMapPanelSlot>
          <VendorsApplicationsMapView
            applications={plannedApplications}
            assignments={assignments}
            highlightedStandPairs={buildStandPairHighlights(highlightedApplication)}
            highlightedStands={buildStandPriorityHighlights(highlightedApplication)}
            multiplier={mapMultiplier}
            selectStand={selectStand}
            selectedStandId={selectedStandId}
            translate={translate}
          />
        </ApplicationsMapPanelSlot>
        <ApplicationsMapSide>
          <StandGroupCard>
            {hasSelectedStand ? (
              <>
                <StandGroupTitle>{selectedStandId}</StandGroupTitle>
                <ApplicationField>
                  <ApplicationFieldLabel>{translate('vendorsApplicationsPage.planner.assigned')}</ApplicationFieldLabel>
                  {standVendors.length > 0 ? (
                    <ApplicationActionRow>
                      {standVendors.map(({ applicationId, storeName }) => (
                        <ApplicationsStandAssignmentButton
                          key={applicationId}
                          type="button"
                          disabled={isSaving}
                          aria-label={translate('vendorsApplicationsPage.planner.removeVendor', {
                            name: storeName,
                            standId: selectedStandId
                          })}
                          onClick={() => removeVendor(applicationId)}
                        >
                          {translate('vendorsApplicationsPage.standAssignment.selectedStand', { standId: storeName })}
                        </ApplicationsStandAssignmentButton>
                      ))}
                    </ApplicationActionRow>
                  ) : (
                    <ApplicationsFieldHint>
                      {translate('vendorsApplicationsPage.standAssignment.none')}
                    </ApplicationsFieldHint>
                  )}
                </ApplicationField>
                <ApplicationField>
                  <ApplicationFieldLabel as="label" htmlFor={PLANNER_VENDOR_FIELD_ID}>
                    {translate('vendorsApplicationsPage.planner.addVendor')}
                  </ApplicationFieldLabel>
                  <ApplicationsStandAssignmentRow>
                    <ApplicationsFilterSelect
                      id={PLANNER_VENDOR_FIELD_ID}
                      disabled={isSaving}
                      value={NO_VENDOR_VALUE}
                      onChange={(event) => addVendor(event.target.value)}
                    >
                      <option value={NO_VENDOR_VALUE}>
                        {translate('vendorsApplicationsPage.planner.chooseVendor')}
                      </option>
                      {vendorOptions.requestingVendors.length > 0 ? (
                        <optgroup label={translate('vendorsApplicationsPage.planner.requestingGroup')}>
                          {vendorOptions.requestingVendors.map(renderVendorOption)}
                        </optgroup>
                      ) : null}
                      {vendorOptions.otherVendors.length > 0 ? (
                        <optgroup label={translate('vendorsApplicationsPage.planner.otherGroup')}>
                          {vendorOptions.otherVendors.map(renderVendorOption)}
                        </optgroup>
                      ) : null}
                    </ApplicationsFilterSelect>
                  </ApplicationsStandAssignmentRow>
                </ApplicationField>
              </>
            ) : (
              <ApplicationsMapHint>{translate('vendorsApplicationsPage.planner.selectHint')}</ApplicationsMapHint>
            )}
          </StandGroupCard>
          <StandGroupCard>
            <StandGroupTitle>
              {translate('vendorsApplicationsPage.planner.unassignedTitle', { count: unassignedApplications.length })}
            </StandGroupTitle>
            {unassignedApplications.length > 0 ? (
              <>
                <ApplicationsFieldHint>
                  {translate('vendorsApplicationsPage.planner.unassignedHint')}
                </ApplicationsFieldHint>
                <ApplicationActionRow>
                  {unassignedApplications.map(({ id, storeName }) => (
                    <ApplicationsStandAssignmentButton
                      key={id}
                      type="button"
                      aria-pressed={highlightedApplication?.id === id}
                      onClick={() => toggleHighlightedApplication(id)}
                    >
                      {storeName}
                    </ApplicationsStandAssignmentButton>
                  ))}
                </ApplicationActionRow>
              </>
            ) : (
              <ApplicationsMapHint>{translate('vendorsApplicationsPage.planner.allAssigned')}</ApplicationsMapHint>
            )}
          </StandGroupCard>
        </ApplicationsMapSide>
      </ApplicationsMapLayout>
    </>
  );
};
