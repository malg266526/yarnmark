import styled from 'styled-components';
import { Radius, DropShadow } from '../../styles/cards';
import { FontSize } from '../../styles/font-size';
import { ScreenSize } from '../../styles/screeen-size';
import { RedesignSpacings } from '../../styles/spacings';
import { BackgroundColors, BorderColors, Colors, FontFamilies, TextColors } from '../../styles/theme';

export const VendorsApplicationsPageStyled = styled.div`
  width: 100%;
`;

export const ApplicationsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

export const ApplicationsToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ApplicationsToggleButton = styled.button`
  border: 1px solid ${BackgroundColors.green.medium};
  background: ${Colors.white};
  color: ${TextColors.secondary};
  border-radius: ${Radius.lg};
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  cursor: pointer;
`;

export const ApplicationsMeta = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;

export const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${RedesignSpacings.md};

  @media (max-width: ${ScreenSize.phone}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ApplicationCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  border: 1px solid ${BorderColors.subtleGreen};
`;

export const ApplicationHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
  padding-bottom: ${RedesignSpacings.xs};
  border-bottom: 2px solid ${BackgroundColors.green.medium};
`;

export const ApplicationTitle = styled.h2`
  margin: 0;
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.xl};
  color: ${TextColors.primary};
`;

export const ApplicationField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
`;

export const ApplicationFieldLabel = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;

export const ApplicationFieldValue = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.md};
  color: ${TextColors.primary};
  white-space: pre-wrap;
`;

export const ApplicationsEmpty = styled.div`
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  font-family: ${FontFamilies.primary};
`;

export const StandGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

export const StandGroupCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  border: 1px solid ${BorderColors.subtleGreen};
`;

export const StandGroupTitle = styled.h2`
  margin: 0;
  padding-bottom: ${RedesignSpacings.xs};
  border-bottom: 2px solid ${BackgroundColors.green.medium};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.xl};
  color: ${TextColors.primary};
`;

export const StandRequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
`;

export const StandRequestItem = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content max-content;
  gap: ${RedesignSpacings.sm};
  align-items: baseline;
  padding-bottom: ${RedesignSpacings.xs};
  border-bottom: 1px solid ${BorderColors.subtleGreen};

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  @media (max-width: ${ScreenSize.phone}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const StandRequestVendor = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.md};
  color: ${TextColors.primary};
`;

export const StandRequestMeta = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;
