import styled, { css } from 'styled-components';
import { Button } from '../../../../components/Button';
import { Radius, DropShadow } from '../../../../styles/cards';
import { FontSize } from '../../../../styles/font-size';
import { ScreenSize } from '../../../../styles/screeen-size';
import { RedesignSpacings } from '../../../../styles/spacings';
import { BackgroundColors, BorderColors, Colors, FontFamilies, GrayScale, TextColors } from '../../../../styles/theme';

export const VendorsApplicationsPageStyled = styled.div`
  width: 100%;
`;

export const ApplicationsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

export const AcceptedApplicationsQueue = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  border: 1px solid ${BorderColors.subtleGreen};
`;

export const AcceptedApplicationsQueueTitle = styled.h2`
  margin: 0;
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.lg};
  color: ${TextColors.primary};
`;

export const AcceptedApplicationsQueueDescription = styled.ol`
  margin: 0;
  padding-left: ${RedesignSpacings.md};
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
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

const FILTER_CONTROL_HEIGHT = '38px';
const FILTER_COUNT_SIZE = '24px';
const FILTER_COUNT_INLINE_PADDING = '7px';
const FILTER_COUNT_FONT_BASELINE_CORRECTION = '1.5px';
const FILTER_CONTROL_INLINE_PADDING = '12px';
const FILTER_SELECT_ARROW_WIDTH = '12px';
const FILTER_SELECT_ARROW_GAP = '34px';

const filterSelectArrow = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8"><path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="${TextColors.secondary}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
);

export const ApplicationsFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
  padding: ${RedesignSpacings.sm};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  border: 1px solid ${BorderColors.subtleGreen};
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
  height: ${FILTER_COUNT_SIZE};
  min-width: ${FILTER_COUNT_SIZE};
  padding: ${FILTER_COUNT_FONT_BASELINE_CORRECTION} ${FILTER_COUNT_INLINE_PADDING} 0;
  border-radius: ${Radius.xxl};
  background: ${BackgroundColors.green.medium};
  color: ${TextColors.primary};
  font-size: ${FontSize.sm};
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

export const ApplicationsFilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
  align-items: flex-end;
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

const filterControlStyles = css`
  width: 100%;
  height: ${FILTER_CONTROL_HEIGHT};
  padding: 0 ${FILTER_CONTROL_INLINE_PADDING};
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
`;

export const ApplicationsFilterInput = styled.input`
  ${filterControlStyles}

  &::placeholder {
    color: ${GrayScale[600]};
  }
`;

const filterSelectStyles = css`
  appearance: none;
  padding-right: ${FILTER_SELECT_ARROW_GAP};
  background-image: url('data:image/svg+xml,${filterSelectArrow}');
  background-repeat: no-repeat;
  background-position: right ${FILTER_CONTROL_INLINE_PADDING} center;
  background-size: ${FILTER_SELECT_ARROW_WIDTH} auto;
  cursor: pointer;
`;

export const ApplicationsFilterSelect = styled.select`
  ${filterControlStyles}
  ${filterSelectStyles}
`;

export const ApplicationsMeta = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;

export const ApplicationsMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.sm};
  align-items: baseline;
`;

export const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${RedesignSpacings.md};

  @media (max-width: ${ScreenSize.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ApplicationsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
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

  &[aria-pressed='true'] {
    border-color: ${BackgroundColors.green.strong};
    background: ${BackgroundColors.green.light};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const ApplicationsStatusFilterButton = styled(ApplicationActionButton)`
  height: ${FILTER_CONTROL_HEIGHT};
  padding: 0 ${FILTER_CONTROL_INLINE_PADDING};
  gap: ${RedesignSpacings.xxs};
  line-height: 1;
`;

export const ApplicationsFilterResetButton = styled(ApplicationActionButton)`
  height: ${FILTER_CONTROL_HEIGHT};
  padding: 0 ${FILTER_CONTROL_INLINE_PADDING};
  line-height: 1;
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
