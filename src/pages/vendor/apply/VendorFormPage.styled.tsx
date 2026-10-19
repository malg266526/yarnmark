import styled from 'styled-components';
import { FieldHint } from '../../../components/form/FormField.styled';
import { DropShadow, Radius } from '../../../styles/cards';
import { FontSize } from '../../../styles/font-size';
import { ScreenSize } from '../../../styles/screeen-size';
import { RedesignSpacings } from '../../../styles/spacings';
import {
  BackgroundColors,
  BrownScale,
  Colors,
  FontFamilies,
  GrayScale,
  TextColors,
  WarningColors
} from '../../../styles/theme';

export const FormCard = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.sm};
  }
`;

export const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

export const FormSection = styled.section<{ $isFirst?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  padding-top: ${({ $isFirst }) => ($isFirst ? 0 : RedesignSpacings.md)};
  border-top: ${({ $isFirst }) => ($isFirst ? 'none' : `2px solid ${BackgroundColors.green.medium}`)};
`;

export const HallLayout = styled.div`
  display: flex;
  gap: ${RedesignSpacings.md};
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const HallMapColumn = styled.div`
  flex: 1 1 320px;
  min-width: 0;
`;

export const LegendCard = styled.aside`
  flex: 0 0 auto;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
  padding: ${RedesignSpacings.sm};
  border: 1px solid ${GrayScale[300]};
  border-radius: ${Radius.lg};
  background: white;
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.xs};
  font-family: ${FontFamilies.primary};
`;

export const LegendBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${Radius.md};
  background: ${BackgroundColors.green.light};
  border: 1px solid ${BackgroundColors.green.medium};
  color: ${TextColors.secondary};
  font-weight: 700;
  font-size: ${FontSize.sm};
`;

export const LegendSwatch = styled.span<{
  $color: string;
  $borderColor?: string;
  $hasNoInterestFrame?: boolean;
}>`
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: ${Radius.md};
  background: ${({ $color }) => $color};
  border: 1px solid ${({ $borderColor }) => $borderColor ?? GrayScale[300]};
  box-shadow: ${({ $hasNoInterestFrame }) => ($hasNoInterestFrame ? `inset 0 0 0 2px ${BrownScale[700]}` : 'none')};
`;

export const LegendText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FontSize.sm};
`;

export const LegendSize = styled.span`
  color: ${TextColors.secondary};
  font-size: ${FontSize.xs};
`;

export const HallSideColumn = styled.div`
  flex: 0 1 300px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

export const StandOptionsList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const StandOptionItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
  padding: ${RedesignSpacings.xxs} 0;
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  text-align: start;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

export const StandOptionSeparator = styled.span`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.xs};
  margin-bottom: ${RedesignSpacings.xxs};
  color: ${TextColors.secondary};

  &::before,
  &::after {
    content: '';
    flex: 1 1 auto;
    height: 1px;
    background: ${GrayScale[100]};
  }
`;

export const StandOptionLabel = styled.span`
  color: ${TextColors.primary};
  font-weight: 600;
`;

export const StandOptionsEmpty = styled.p`
  margin: 0;
  color: ${TextColors.secondary};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
`;

export const WarningCard = styled.div`
  padding: ${RedesignSpacings.sm};
  border: 1px solid ${WarningColors.border};
  border-radius: ${Radius.lg};
  background: ${WarningColors.background};
  color: ${WarningColors.text};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  line-height: 1.5;
`;

export const StandStatusList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

export const StandStatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${RedesignSpacings.xxs};
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid ${BackgroundColors.green.medium};
  background: ${Colors.white};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.primary};
`;

export const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  border: 1px solid ${GrayScale[300]};
  border-radius: ${Radius.lg};
  font-size: ${FontSize.md};
  font-family: ${FontFamilies.primary};
  background: white;
  resize: vertical;

  &:focus {
    outline: 2px solid ${BackgroundColors.green.medium};
    border-color: ${BackgroundColors.green.strong};
  }
`;

export const DisclaimerText = styled(FieldHint)`
  font-size: ${FontSize.sm};
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.xs};
  padding: 14px 16px;
  border: 1px solid ${GrayScale[300]};
  border-radius: ${Radius.lg};
  background: white;
  cursor: pointer;
  font-family: ${FontFamilies.primary};
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: baseline;
  gap: ${RedesignSpacings.xs};
  font-family: ${FontFamilies.primary};
  line-height: 1.4;
`;

export const StandOptionPairToggle = styled(CheckboxRow)<{ $disabled: boolean }>`
  color: ${({ $disabled }) => ($disabled ? GrayScale[500] : TextColors.primary)};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${RedesignSpacings.sm};
  flex-wrap: wrap;
`;

export const ActionsSpacer = styled.span`
  min-width: 1px;
`;

export const InlineLink = styled.a`
  color: ${TextColors.accent};
`;

export const HintEmphasis = styled.span`
  color: ${TextColors.accent};
`;

export const DownloadActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

export const SummaryList = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  margin: 0;
  font-family: ${FontFamilies.primary};

  dt {
    font-weight: 700;
  }

  dd {
    margin: 0;
  }
`;

export { TextInput } from '../../../components/form/FormField.styled';
