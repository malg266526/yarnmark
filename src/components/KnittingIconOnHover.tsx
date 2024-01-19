import React from 'react';
import styled from 'styled-components';
import knittingImageUrl from '../assets/images/skein3.svg';
import { Icon } from './Icon';

const KnittingIconWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
`;

export const KnittingIconOnHover = () => (
  <KnittingIconWrapper>
    <Icon size="xl" src={knittingImageUrl} />
  </KnittingIconWrapper>
);
