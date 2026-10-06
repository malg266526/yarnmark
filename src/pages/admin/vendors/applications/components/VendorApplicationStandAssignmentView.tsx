import React, { useMemo, useState } from 'react';
import {
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationsFieldHint,
  ApplicationsFilterSelect,
  ApplicationsStandAssignmentButton,
  ApplicationsStandAssignmentRow
} from '../VendorsApplicationsPage.styled';
import { buildStandAssignmentOptions, type StandAssignmentOption } from '../utils/standAssignmentUtils';
import { VendorApplicationStandAssignmentViewProps } from './vendorsApplicationsViewContracts';

const NO_STAND_VALUE = '';

export const VendorApplicationStandAssignmentView = ({
  application,
  standAssignment,
  translate
}: VendorApplicationStandAssignmentViewProps) => {
  const { allApplications, assignStand, savingStandApplicationId, vendorStandIds } = standAssignment;
  const assignedStandId = application.assignedStands[0] ?? NO_STAND_VALUE;
  const [selectedStandId, setSelectedStandId] = useState(assignedStandId);
  const options = useMemo(
    () => buildStandAssignmentOptions(application, allApplications, vendorStandIds),
    [application, allApplications, vendorStandIds]
  );
  const isSaving = savingStandApplicationId === application.id;
  const fieldId = `vendor-application-stand-${application.id}`;

  const renderOption = ({ preferenceOrder, standId, takenBy }: StandAssignmentOption) => {
    const standLabel = preferenceOrder
      ? translate('vendorsApplicationsPage.standAssignment.preferredStand', { order: preferenceOrder, standId })
      : standId;

    return (
      <option key={standId} value={standId} disabled={takenBy !== null}>
        {takenBy
          ? translate('vendorsApplicationsPage.standAssignment.takenStand', { name: takenBy, stand: standLabel })
          : standLabel}
      </option>
    );
  };

  return (
    <ApplicationField>
      <ApplicationFieldLabel as="label" htmlFor={fieldId}>
        {translate('vendorsApplicationsPage.fields.allocatedStand')}
      </ApplicationFieldLabel>
      <ApplicationsStandAssignmentRow>
        <ApplicationsFilterSelect
          id={fieldId}
          disabled={isSaving}
          value={selectedStandId}
          onChange={(event) => setSelectedStandId(event.target.value)}
        >
          <option value={NO_STAND_VALUE}>{translate('vendorsApplicationsPage.standAssignment.none')}</option>
          {options.preferredStands.length > 0 ? (
            <optgroup label={translate('vendorsApplicationsPage.standAssignment.preferredGroup')}>
              {options.preferredStands.map(renderOption)}
            </optgroup>
          ) : null}
          <optgroup label={translate('vendorsApplicationsPage.standAssignment.otherGroup')}>
            {options.otherStands.map(renderOption)}
          </optgroup>
        </ApplicationsFilterSelect>
        <ApplicationsStandAssignmentButton
          type="button"
          disabled={isSaving || selectedStandId === assignedStandId}
          onClick={() => {
            void assignStand(application.id, selectedStandId || null);
          }}
        >
          {translate('vendorsApplicationsPage.standAssignment.save')}
        </ApplicationsStandAssignmentButton>
      </ApplicationsStandAssignmentRow>
      {isSaving ? (
        <ApplicationsFieldHint>{translate('vendorsApplicationsPage.statusField.saving')}</ApplicationsFieldHint>
      ) : null}
    </ApplicationField>
  );
};
