import React, { useState } from 'react';
import {
  ApplicationsMapStandLogo,
  ApplicationsMapStandLogoFrame,
  ApplicationsMapStandVendorName
} from '../VendorsApplicationsPage.styled';
import type { VendorMapAssignment } from '../utils/vendorMapAssignmentsUtils';

export const VendorApplicationMapLogo = ({ vendor }: { vendor: VendorMapAssignment }) => {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  return vendor.logoSource && vendor.logoSource !== failedSource ? (
    <ApplicationsMapStandLogoFrame>
      <ApplicationsMapStandLogo
        src={vendor.logoSource}
        alt={vendor.storeName}
        title={vendor.storeName}
        onError={() => setFailedSource(vendor.logoSource)}
      />
    </ApplicationsMapStandLogoFrame>
  ) : (
    <ApplicationsMapStandVendorName title={vendor.storeName}>{vendor.storeName}</ApplicationsMapStandVendorName>
  );
};
