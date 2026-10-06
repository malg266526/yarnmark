import React from 'react';
import {
  ApplicationsUndoToast,
  ApplicationsUndoToastButton,
  ApplicationsUndoToastMessage
} from '../VendorsApplicationsPage.styled';
import { VendorsApplicationsUndoToastProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsUndoToast = ({
  actionLabel,
  dismissLabel,
  message,
  onAction,
  onDismiss
}: VendorsApplicationsUndoToastProps) => (
  <ApplicationsUndoToast role="status">
    <ApplicationsUndoToastMessage>{message}</ApplicationsUndoToastMessage>
    <ApplicationsUndoToastButton type="button" onClick={onAction}>
      {actionLabel}
    </ApplicationsUndoToastButton>
    <ApplicationsUndoToastButton type="button" onClick={onDismiss}>
      {dismissLabel}
    </ApplicationsUndoToastButton>
  </ApplicationsUndoToast>
);
