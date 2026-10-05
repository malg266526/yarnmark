import styled from 'styled-components';
import { FontSize } from '../../styles/font-size';
import { RedesignSpacings } from '../../styles/spacings';
import { BackgroundColors, FontFamilies, GrayScale, TextColors } from '../../styles/theme';

export type FieldRequirementType = 'required' | 'optional';

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
  font-size: ${FontSize.sm};
  font-family: ${FontFamilies.primary};
`;

export const FieldHeading = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

export const FieldLabelText = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

export const FieldRequirementBadge = styled.span<{ $requirement: FieldRequirementType }>`
  display: inline-flex;
  padding: 3px 8px;
  border-radius: 999px;
  background: ${({ $requirement }) => ($requirement === 'required' ? BackgroundColors.green.light : GrayScale[100])};
  color: ${TextColors.secondary};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.xs};
  font-weight: 600;
  line-height: 1.2;
`;

export const FieldHint = styled.div`
  color: ${TextColors.secondary};
  font-size: ${FontSize.xs};
  line-height: 1.5;
  font-family: ${FontFamilies.primary};
`;

export const ErrorText = styled.div`
  color: ${TextColors.accent};
  font-size: ${FontSize.sm};
  font-family: ${FontFamilies.primary};
`;
