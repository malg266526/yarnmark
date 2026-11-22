import React, { useMemo, type CSSProperties } from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import { Picture } from '../../components/Picture';
import { useAssignedStandVendors } from '../../hooks/useAssignedStandVendors';
import { getVendorLogos } from '../../domain/vendorApplications/assignedStandVendorsUtils';
import { Tooltip } from '../../components/tooltip/Tooltip';
import { useVendorLogoTooltip } from './useVendorLogoTooltip';

const VENDOR_LOGO_SIZE = 100;
const VENDOR_LOGO_STYLE: CSSProperties = { display: 'block', objectFit: 'contain' };

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 40px;
  padding-top: ${RedesignSpacings.sm};
  flex-shrink: 0;

  @media (max-width: ${ScreenSize.phone}) {
    gap: 20px;
    padding: 40px 20px;
  }
`;

const VendorLogoFrame = styled.div`
  position: relative;
`;

export const VendorsList = () => {
  const assignedVendors = useAssignedStandVendors();
  const vendorLogos = useMemo(() => getVendorLogos(assignedVendors), [assignedVendors]);
  const { tooltip, showLogoTooltip, hideLogoTooltip } = useVendorLogoTooltip();

  return (
    <Grid>
      {vendorLogos.map(({ storeName, logoUrl }) => (
        <VendorLogoFrame
          key={logoUrl}
          onMouseEnter={(event) => showLogoTooltip(logoUrl, event.currentTarget)}
          onMouseLeave={() => hideLogoTooltip(logoUrl)}
        >
          <Picture
            width={VENDOR_LOGO_SIZE}
            height={VENDOR_LOGO_SIZE}
            alt={storeName}
            picture={{ fallbackUrl: logoUrl }}
            style={VENDOR_LOGO_STYLE}
          />
          {tooltip?.logoUrl === logoUrl && <Tooltip text={storeName} position={tooltip.position} />}
        </VendorLogoFrame>
      ))}
    </Grid>
  );
};
