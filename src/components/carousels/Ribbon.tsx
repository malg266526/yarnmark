import styled from 'styled-components';
import { RedesignSpacings, Spacings } from '../../styles/spacings';
import { BrownScale } from '../../styles/theme';

export const Ribbon = styled.div`
  color: #fff;

  --r: 36px; /* control the ribbon shape */

  padding-inline: calc(var(--r) + ${Spacings.md});
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--r)) 50%, 100% 100%, 0 100%, var(--r) 50%);
  background: ${BrownScale[900]}; /* the main color */
  width: 85%;

  padding: ${RedesignSpacings.sm} 0;
  text-align: center;
`;
