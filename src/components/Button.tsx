import styled from 'styled-components';
import { TextColors } from '../styles/theme';
import { FontSize } from '../styles/font-size';
import { RedesignSpacings } from '../styles/spacings';
import { Radius } from '../styles/cards';

export const Button = styled.button`
  all: unset;
  padding-top: 2px;
  cursor: pointer;
`;

export const CtaButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${TextColors.accent};
  padding: ${RedesignSpacings.xxs} ${RedesignSpacings.sm} 3px ${RedesignSpacings.sm};
  border-radius: ${Radius.xxl};
  color: white;
  text-transform: uppercase;
  font-size: ${FontSize.md};
`;
