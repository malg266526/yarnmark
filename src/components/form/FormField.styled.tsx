import styled from 'styled-components';
import { Button } from '../Button';
import { Radius } from '../../styles/cards';
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

export const FieldRequirementMark = styled.span`
  display: inline-flex;
  color: ${TextColors.accent};
  font-family: ${FontFamilies.primary};
  font-weight: 600;
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

export const LogoPreviewRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.sm};
`;

export const LogoPreviewImage = styled.img`
  max-width: 160px;
  max-height: 120px;
  object-fit: contain;
  border: 1px solid ${GrayScale[300]};
  border-radius: ${Radius.lg};
  background: white;
`;

export const LogoActionButton = styled(Button)`
  padding: 8px 14px;
  border: 1px solid ${BackgroundColors.green.strong};
  border-radius: ${Radius.lg};
  color: ${BackgroundColors.green.strong};
  font-size: ${FontSize.sm};
  font-family: ${FontFamilies.primary};

  &:focus-visible {
    outline: 2px solid ${BackgroundColors.green.medium};
    outline-offset: 2px;
  }

  &:disabled {
    border-color: ${GrayScale[600]};
    color: ${GrayScale[600]};
    cursor: default;
  }
`;
