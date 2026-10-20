import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { DropShadow, Radius } from '../../../styles/cards';
import { FontSize } from '../../../styles/font-size';
import { RedesignSpacings } from '../../../styles/spacings';
import { BackgroundColors, Colors, FontFamilies, TextColors } from '../../../styles/theme';

const SETTINGS_CONTROL_HEIGHT = '36px';
const SETTINGS_CONTROL_INLINE_PADDING = RedesignSpacings.xs;
const SETTINGS_RADIO_SIZE = '18px';

export const AdminSettingsPanel = styled.section`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
`;

export const SoundVariantFieldset = styled.fieldset`
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const SoundVariantLegend = styled.legend`
  float: none;
  width: auto;
  margin: 0 0 ${RedesignSpacings.xs};
  padding: 0;
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  line-height: 1.2;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${TextColors.secondary};
`;

export const SoundVariantList = styled.ul`
  display: grid;
  grid-template-columns: max-content max-content;
  column-gap: ${RedesignSpacings.sm};
  row-gap: ${RedesignSpacings.xxs};
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SoundVariantOption = styled.li`
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  align-items: center;
`;

export const SoundVariantLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${RedesignSpacings.xs};
  height: ${SETTINGS_CONTROL_HEIGHT};
  margin: 0;
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.md};
  color: ${TextColors.primary};
  cursor: pointer;
`;

export const SoundVariantRadio = styled.input`
  flex: 0 0 auto;
  width: ${SETTINGS_RADIO_SIZE};
  height: ${SETTINGS_RADIO_SIZE};
  margin: 0;
  accent-color: ${BackgroundColors.green.strong};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${BackgroundColors.green.strong};
    outline-offset: 2px;
  }
`;

export const SoundPreviewButton = styled(Button)`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${SETTINGS_CONTROL_HEIGHT};
  padding: 0 ${SETTINGS_CONTROL_INLINE_PADDING};
  border: 1px solid ${BackgroundColors.green.medium};
  border-radius: ${Radius.lg};
  background: ${Colors.white};
  color: ${TextColors.secondary};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  line-height: 1;

  &:hover {
    background: ${BackgroundColors.green.light};
  }

  &:focus-visible {
    outline: 2px solid ${BackgroundColors.green.strong};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
