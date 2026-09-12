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

export const AdminLoginCard = styled.form`
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

export const AdminLoginField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
`;

export const AdminLoginInput = styled.input`
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  border-radius: ${Radius.lg};
  border: 1px solid ${BorderColors.subtleGreen};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.md};
  color: ${TextColors.primary};

  &:focus {
    outline: 2px solid ${BackgroundColors.green.medium};
    outline-offset: 1px;
  }
`;

export const AdminLoginError = styled.span`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${WarningColors.text};
`;

export const AdminLoginSubmit = styled.button`
  all: unset;
  cursor: pointer;
  text-align: center;
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  border-radius: ${Radius.lg};
  background: ${BackgroundColors.green.medium};
  color: ${Colors.white};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.md};
`;
