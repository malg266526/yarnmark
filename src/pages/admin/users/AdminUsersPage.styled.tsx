import styled, { keyframes } from 'styled-components';
import { Button } from '../../../components/Button';
import { Radius, DropShadow } from '../../../styles/cards';
import { FontSize } from '../../../styles/font-size';
import { ScreenSize } from '../../../styles/screeen-size';
import { RedesignSpacings } from '../../../styles/spacings';
import { BackgroundColors, BorderColors, Colors, FontFamilies, GrayScale, TextColors } from '../../../styles/theme';

export const AdminUsersPageStyled = styled.div`
  width: 100%;
`;

export const UsersSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

export const UsersMeta = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;

export const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${RedesignSpacings.md};

  @media (max-width: ${ScreenSize.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const UserCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  border: 1px solid ${BorderColors.subtleGreen};
`;

export const UserHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
  padding-bottom: ${RedesignSpacings.xs};
  border-bottom: 2px solid ${BackgroundColors.green.medium};
`;

export const UserTitle = styled.h2`
  margin: 0;
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.lg};
  color: ${TextColors.primary};
  overflow-wrap: anywhere;
`;

export const UserField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
`;

export const UserFieldLabel = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;

export const UserFieldValue = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.md};
  color: ${TextColors.primary};
  overflow-wrap: anywhere;
`;

export const UserPermissionOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.xxs};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.md};
  color: ${TextColors.primary};
`;

export const UserActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const UserActionSpinner = styled.span`
  width: 0.9em;
  height: 0.9em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 700ms linear infinite;
`;

export const UserActionButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${RedesignSpacings.xxs};
  padding: ${RedesignSpacings.xxs} ${RedesignSpacings.xs};
  border: 1px solid ${BackgroundColors.green.medium};
  border-radius: ${Radius.lg};
  background: ${Colors.white};
  color: ${TextColors.secondary};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};

  &:disabled {
    cursor: default;
    border-color: ${GrayScale[300]};
    color: ${GrayScale[600]};
  }
`;

export const UsersEmpty = styled.div`
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  font-family: ${FontFamilies.primary};
`;
