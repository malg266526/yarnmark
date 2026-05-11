import styled from 'styled-components';
import { CtaButton } from '../../components/Button';
import { DropShadow, Radius } from '../../styles/cards';
import { FontSize } from '../../styles/font-size';
import { ScreenSize } from '../../styles/screeen-size';
import { RedesignSpacings } from '../../styles/spacings';
import { BackgroundColors, Colors, GrayScale, TextColors } from '../../styles/theme';

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

export const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
`;

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
  font-size: ${FontSize.sm};
  font-family: 'Questrial', sans-serif;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${GrayScale[300]};
  border-radius: ${Radius.lg};
  font-size: ${FontSize.md};
  font-family: 'Questrial', sans-serif;
  background: white;

  &:focus {
    outline: 2px solid ${BackgroundColors.green.medium};
    border-color: ${BackgroundColors.green.strong};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  border: 1px solid ${GrayScale[300]};
  border-radius: ${Radius.lg};
  font-size: ${FontSize.md};
  font-family: 'Questrial', sans-serif;
  background: white;
  resize: vertical;

  &:focus {
    outline: 2px solid ${BackgroundColors.green.medium};
    border-color: ${BackgroundColors.green.strong};
  }
`;

export const FieldHint = styled.div`
  color: ${TextColors.secondary};
  font-size: ${FontSize.xs};
  font-family: 'Questrial', sans-serif;
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
  font-family: 'Questrial', sans-serif;
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${RedesignSpacings.xs};
  font-family: 'Questrial', sans-serif;
  line-height: 1.4;
`;

export const ErrorText = styled.div`
  color: ${TextColors.accent};
  font-size: ${FontSize.sm};
  font-family: 'Questrial', sans-serif;
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${RedesignSpacings.sm};
  flex-wrap: wrap;
`;

export const InlineLink = styled.a`
  color: ${TextColors.accent};
`;

export const SummaryList = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  margin: 0;
  font-family: 'Questrial', sans-serif;

  dt {
    font-weight: 700;
  }

  dd {
    margin: 0;
  }
`;

export const PrimaryButton = CtaButton;
