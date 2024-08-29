import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { BackgroundColors } from '../../styles/theme';
import { ScreenSize } from '../../styles/screeen-size';

export const Ribbon = styled.div`
  color: #fff;

  --r: 36px; /* control the ribbon shape */

  padding-inline: calc(var(--r) + ${RedesignSpacings.md});
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--r)) 50%, 100% 100%, 0 100%, var(--r) 50%);
  background: ${BackgroundColors.greenStrong}; /* the main color */
  width: 85%;

  padding: ${RedesignSpacings.xs} 0;
  text-align: center;

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
  }
`;
