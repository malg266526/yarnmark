import React, { useState } from 'react';
import styled from 'styled-components';
import { resolveApiAssetUrl } from '../../domain/apiClient.ts';
import { BorderColors, Colors } from '../../styles/theme';

const VendorSlot = styled.div`
  text-align: center;
  font-size: 14px;
`;

const VendorLogoFrame = styled.span`
  container-type: size;
  display: grid;
  place-items: center;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  height: 100%;
`;

const VendorLogo = styled.img`
  box-sizing: border-box;
  display: block;
  width: min(70cqw, 70cqh);
  height: min(70cqw, 70cqh);
  padding: 2px;
  border: 1px solid ${BorderColors.subtleGreen};
  border-radius: 50%;
  object-fit: contain;
  background: ${Colors.white};
`;

interface HallStandVendorProps {
  vendor?: string;
  vendorLogoUrl?: string;
}

export const HallStandVendor = ({ vendor, vendorLogoUrl }: HallStandVendorProps) => {
  const [hasFailedLogo, setHasFailedLogo] = useState(false);
  const logoSource = hasFailedLogo ? null : resolveApiAssetUrl(vendorLogoUrl);

  if (logoSource) {
    return (
      <VendorLogoFrame>
        <VendorLogo src={logoSource} alt={vendor ?? ''} title={vendor} onError={() => setHasFailedLogo(true)} />
      </VendorLogoFrame>
    );
  }

  return vendor ? <VendorSlot>{vendor}</VendorSlot> : null;
};
