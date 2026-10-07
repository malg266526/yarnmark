import React from 'react';
import { ApplicationFlagList, ApplicationFlagTag } from '../VendorsApplicationsPage.styled';
import { VendorApplicationFlagsViewProps } from './vendorsApplicationsViewContracts';

export const VendorApplicationFlagsView = ({ emptyLabel, flags, translate }: VendorApplicationFlagsViewProps) => {
  if (flags.length === 0) {
    return <>{emptyLabel}</>;
  }

  return (
    <ApplicationFlagList>
      {flags.map((flag) => (
        <ApplicationFlagTag key={flag} title={translate(`vendorsApplicationsPage.flags.descriptions.${flag}`)}>
          {translate(`vendorsApplicationsPage.flags.labels.${flag}`)}
        </ApplicationFlagTag>
      ))}
    </ApplicationFlagList>
  );
};
