import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { Radius, DropShadow } from '../../styles/cards';
import { FontSize } from '../../styles/font-size';
import { BackgroundColors, BorderColors, Colors, FontFamilies, TextColors, WarningColors } from '../../styles/theme';

export const AdminLoginRoot = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${BackgroundColors.navigationBand};
  padding: ${RedesignSpacings.md};
`;

export const AdminLoginCard = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
  padding: ${RedesignSpacings.xl};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  border: 1px solid ${BorderColors.subtleGreen};
`;

export const AdminLoginError = styled.span`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${WarningColors.text};
`;
