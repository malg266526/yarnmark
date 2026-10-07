import styled, { css } from 'styled-components';
import Modal from 'react-modal';
import { Button } from '../../../../components/Button';
import { Radius, DropShadow } from '../../../../styles/cards';
import { FontSize } from '../../../../styles/font-size';
import { ScreenSize } from '../../../../styles/screeen-size';
import { RedesignSpacings } from '../../../../styles/spacings';
import {
  BackgroundColors,
  BorderColors,
  Colors,
  FontFamilies,
  GrayScale,
  TextColors,
  WarningColors
} from '../../../../styles/theme';

export const WorkshopsApplicationsPageStyled = styled.div`
  width: 100%;
`;

export const ApplicationsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

export const ApplicationsMeta = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;

export const ApplicationsToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

const CONTROL_HEIGHT = '38px';
const CONTROL_INLINE_PADDING = '12px';
const BADGE_SIZE = '24px';

const controlStyles = css`
  width: 100%;
  height: ${CONTROL_HEIGHT};
  padding: 0 ${CONTROL_INLINE_PADDING};
  border: 1px solid ${BackgroundColors.green.medium};
  border-radius: ${Radius.lg};
  background: ${Colors.white};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  line-height: 1;
  color: ${TextColors.primary};

  &:focus-visible {
    outline: 2px solid ${BackgroundColors.green.strong};
    outline-offset: -1px;
  }

  &:disabled {
    border-color: ${GrayScale[300]};
    background: ${GrayScale[100]};
    color: ${GrayScale[700]};
    cursor: default;
  }
`;

const selectArrow = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8"><path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="${TextColors.secondary}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
);

const selectControlStyles = css`
  appearance: none;
  padding-right: 34px;
  background-image: url('data:image/svg+xml,${selectArrow}');
  background-repeat: no-repeat;
  background-position: right ${CONTROL_INLINE_PADDING} center;
  background-size: 12px auto;
  cursor: pointer;
`;

const filterInputStyles = css`
  &::placeholder {
    color: ${GrayScale[600]};
  }
`;

export const ApplicationsFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
  padding: ${RedesignSpacings.sm};
  border: 1px solid ${BorderColors.subtleGreen};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
`;

export const ApplicationsStatusFilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xxs};
`;

export const ApplicationsStatusFilterCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${BADGE_SIZE};
  min-width: ${BADGE_SIZE};
  padding: 1.5px 7px 0;
  border-radius: ${Radius.xxl};
  background: ${BackgroundColors.green.medium};
  font-size: ${FontSize.sm};
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

export const ApplicationsFilterRow = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

export const ApplicationsFilterField = styled.div`
  display: flex;
  flex: 1 1 200px;
  min-width: 200px;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
`;

export const ApplicationsFilterLabel = styled.label`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.xs};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${TextColors.secondary};
`;

export const ApplicationsFilterInput = styled.input`
  ${controlStyles}
  ${filterInputStyles}
`;

export const ApplicationsFilterSelect = styled.select`
  ${controlStyles}
  ${selectControlStyles}
`;

export const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${RedesignSpacings.md};

  @media (max-width: ${ScreenSize.tablet}) {
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

export const ApplicationActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

export const ApplicationActionButton = styled(Button)`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${RedesignSpacings.xxs} ${RedesignSpacings.xs};
  border: 1px solid ${BackgroundColors.green.medium};
  border-radius: ${Radius.lg};
  background: ${Colors.white};
  color: ${TextColors.secondary};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};

  &:focus-visible {
    outline: 2px solid ${BackgroundColors.green.strong};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &[aria-pressed='true'] {
    border-color: ${BackgroundColors.green.strong};
    background: ${BackgroundColors.green.light};
  }
`;

export const ApplicationsStatusFilterButton = styled(ApplicationActionButton)`
  height: ${CONTROL_HEIGHT};
  padding: 0 ${CONTROL_INLINE_PADDING};
  gap: ${RedesignSpacings.xxs};
  line-height: 1;
`;

export const ApplicationsFilterResetButton = styled(ApplicationActionButton)`
  height: ${CONTROL_HEIGHT};
  padding: 0 ${CONTROL_INLINE_PADDING};
  line-height: 1;
`;

export const ApplicationsTableScroller = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${BorderColors.subtleGreen};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
`;

export const ApplicationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.primary};
`;

export const ApplicationsTableHeaderCell = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: ${RedesignSpacings.xs};
  border-bottom: 2px solid ${BackgroundColors.green.medium};
  background: ${Colors.white};
  text-align: left;
  font-size: ${FontSize.xs};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${TextColors.secondary};
  white-space: nowrap;
`;

export const ApplicationsTableRow = styled.tr<{ $isOpen: boolean }>`
  cursor: pointer;
  border-bottom: 1px solid ${BorderColors.subtleGreen};
  background: ${({ $isOpen }) => ($isOpen ? BackgroundColors.green.light : 'transparent')};

  &:hover {
    background: ${BackgroundColors.green.light};
  }
`;

export const ApplicationsTableCell = styled.td`
  padding: ${RedesignSpacings.xs};
  vertical-align: middle;
`;

export const ApplicationsTableDateCell = styled(ApplicationsTableCell)`
  color: ${TextColors.secondary};
  white-space: nowrap;
`;

export const ApplicationsRowTitleButton = styled(Button)`
  box-sizing: border-box;
  display: inline-block;
  max-width: 320px;
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
  text-align: left;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:focus-visible {
    outline: 2px solid ${BackgroundColors.green.strong};
    outline-offset: 2px;
    border-radius: ${Radius.md};
  }
`;

export const ApplicationsStatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  height: ${BADGE_SIZE};
  padding: 0 7px;
  border: 1px solid ${BackgroundColors.green.medium};
  border-radius: ${Radius.xxl};
  background: ${BackgroundColors.green.light};
  line-height: 1;
  white-space: nowrap;
`;

export const ApplicationWarningList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xxs};
`;

export const ApplicationWarningTag = styled.span`
  display: inline-flex;
  align-items: center;
  height: ${BADGE_SIZE};
  padding: 0 7px;
  border: 1px solid ${WarningColors.border};
  border-radius: ${Radius.xxl};
  background: ${WarningColors.background};
  color: ${WarningColors.text};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.xs};
  line-height: 1;
  white-space: nowrap;
`;

export const DRAWER_OVERLAY_STYLE = {
  overlay: {
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
} as const;

export const ApplicationDrawer = styled(Modal)`
  display: flex;
  flex-direction: column;
  width: 560px;
  max-width: 100vw;
  height: 100vh;
  border: none;
  outline: none;
  background: ${Colors.white};
  box-shadow: ${DropShadow.md};
  font-family: ${FontFamilies.primary};
`;

export const ApplicationDrawerHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.sm};
  border-bottom: 2px solid ${BackgroundColors.green.medium};
`;

export const ApplicationDrawerCloseButton = styled(ApplicationActionButton)`
  flex: 0 0 auto;
  height: ${CONTROL_HEIGHT};
  padding: 0 ${CONTROL_INLINE_PADDING};
`;

export const ApplicationDrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.sm};
  overflow-y: auto;
`;

export const ApplicationsEmpty = styled.div`
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  font-family: ${FontFamilies.primary};
`;
