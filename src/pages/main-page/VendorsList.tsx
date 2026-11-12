import React from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';

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

export const VendorsList = () => <Grid />;
