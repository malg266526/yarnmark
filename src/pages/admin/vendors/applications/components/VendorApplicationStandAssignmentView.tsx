import React from 'react';
import {
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationActionRow,
  ApplicationsFieldHint,
  ApplicationsFilterSelect,
  ApplicationsStandAssignmentButton,
  ApplicationsStandAssignmentRow
} from '../VendorsApplicationsPage.styled';
import type { StandAssignmentOption } from '../utils/standAssignmentUtils';
import { VendorApplicationStandAssignmentViewProps } from './vendorsApplicationsViewContracts';
import { useStandAssignmentForm } from '../hooks/useStandAssignmentForm';

const NO_STAND_VALUE = '';

export const VendorApplicationStandAssignmentView = ({
  application,
  standAssignment,
  translate
}: VendorApplicationStandAssignmentViewProps) => {
  const { addStand, hasChanges, isSaving, options, removeStand, save, selectedStandIds } = useStandAssignmentForm(
    application,
    standAssignment
  );
  const fieldId = `vendor-application-stand-${application.id}`;

  const renderOption = ({ preferenceOrder, standId, assignedVendors }: StandAssignmentOption) => {
    const standLabel = preferenceOrder
      ? translate('vendorsApplicationsPage.standAssignment.preferredStand', { order: preferenceOrder, standId })
      : standId;

    return (
      <option key={standId} value={standId} disabled={selectedStandIds.includes(standId)}>
        {assignedVendors.length > 0
          ? translate('vendorsApplicationsPage.standAssignment.sharedStand', {
              names: assignedVendors.map(({ storeName }) => storeName).join(', '),
              stand: standLabel
            })
          : standLabel}
      </option>
    );
  };

  return (
    <ApplicationField>
      <ApplicationFieldLabel>{translate('vendorsApplicationsPage.fields.allocatedStand')}</ApplicationFieldLabel>
      {selectedStandIds.length > 0 ? (
        <ApplicationActionRow>
          {selectedStandIds.map((standId) => (
            <ApplicationsStandAssignmentButton
              key={standId}
              type="button"
              disabled={isSaving}
              aria-label={translate('vendorsApplicationsPage.standAssignment.remove', { standId })}
              onClick={() => removeStand(standId)}
            >
              {translate('vendorsApplicationsPage.standAssignment.selectedStand', { standId })}
            </ApplicationsStandAssignmentButton>
          ))}
        </ApplicationActionRow>
      ) : (
        <ApplicationsFieldHint>{translate('vendorsApplicationsPage.standAssignment.none')}</ApplicationsFieldHint>
      )}
      <ApplicationsFieldHint>{translate('vendorsApplicationsPage.standAssignment.sharingHint')}</ApplicationsFieldHint>
      <ApplicationFieldLabel as="label" htmlFor={fieldId}>
        {translate('vendorsApplicationsPage.standAssignment.add')}
      </ApplicationFieldLabel>
      <ApplicationsStandAssignmentRow>
        <ApplicationsFilterSelect
          id={fieldId}
          disabled={isSaving}
          value={NO_STAND_VALUE}
          onChange={(event) => addStand(event.target.value)}
        >
          <option value={NO_STAND_VALUE}>{translate('vendorsApplicationsPage.standAssignment.choose')}</option>
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
          disabled={isSaving || !hasChanges}
          onClick={() => {
            void save();
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
