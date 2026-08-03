import React from 'react';
import styled from 'styled-components';
import { Coordinate, StandColorsMap } from './StandProps';
import { Button, CtaButton } from '../Button';
import { useEditor } from './EditorContext';
import { useStandForm } from './useStandForm';
import { RedesignSpacings } from '../../styles/spacings';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

// Extra styled container for layout and background
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 16px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Label = styled.label`
  min-width: 110px;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: ${RedesignSpacings.md};
`;

const Select = styled.select`
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
`;

const ColorOption = styled.option<{ color?: string }>`
  background-color: ${({ color }) => color || 'white'};
  color: ${({ color }) => (color ? '#fff' : '#000')};
`;

const colorOptions = Object.keys(StandColorsMap) as (keyof typeof StandColorsMap)[];

const StandTypes: Array<'premium' | 'mini' | 'standard' | 'other'> = ['premium', 'mini', 'standard', 'other'];

interface StandFormProps {
  start: Coordinate | undefined;
  end: Coordinate | undefined;
}

export const StandForm = ({ start, end }: StandFormProps) => {
  const t = useTypedTranslation();
  const { addStand, currentStand, updateStand, stands } = useEditor();

  const { stand, handleTypeChange, handleOrientationChange, updateField, submit, isValid } = useStandForm(() =>
    addStand({ ...stand, start, end })
  );

  const isEditMode = !!stands.find((stand) => stand.id === currentStand.id);

  console.log('isEditMode', isEditMode);

  return (
    <Container>
      <Form onSubmit={submit}>
        <FieldRow>
          <Label htmlFor="stand-index">{t('editorPage.standForm.indexLabel')}</Label>
          <Input
            id="stand-index"
            type="text"
            value={stand.index}
            required
            onChange={(e) => updateField('index', e.target.value)}
          />
        </FieldRow>
        <FieldRow>
          <Label htmlFor="stand-vendor">{t('editorPage.standForm.vendorLabel')}</Label>
          <Input
            id="stand-vendor"
            type="text"
            value={stand.vendor || ''}
            onChange={(e) => updateField('vendor', e.target.value)}
          />
        </FieldRow>
        <FieldRow>
          <Label htmlFor="stand-description">{t('editorPage.standForm.descriptionLabel')}</Label>
          <Input
            id="stand-description"
            type="text"
            value={stand.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
          />
        </FieldRow>
        <FieldRow>
          <Label>{t('editorPage.standForm.typeLabel')}</Label>
          <div style={{ display: 'flex', gap: 16 }}>
            {StandTypes.map((type) => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  name="stand-type"
                  value={type}
                  required
                  checked={stand.type === type}
                  onChange={() => handleTypeChange(type)}
                />
                {t(`editorPage.standForm.types.${type}` as const)}
              </label>
            ))}
          </div>
        </FieldRow>
        <FieldRow>
          <Label htmlFor="stand-horizontal">{t('editorPage.standForm.horizontalLabel')}</Label>
          <input
            id="stand-horizontal"
            type="checkbox"
            checked={!!stand.isHorizontal}
            onChange={(e) => handleOrientationChange(e.target.checked)}
          />
        </FieldRow>

        <FieldRow>
          <Label htmlFor="stand-width">{t('editorPage.standForm.widthLabel')}</Label>
          <Input
            id="stand-width"
            type="number"
            min={0}
            step={0.5}
            value={stand.width ?? ''}
            onChange={(e) => updateField('width', e.target.value === '' ? undefined : Number(e.target.value))}
          />
        </FieldRow>

        <FieldRow>
          <Label htmlFor="stand-height">{t('editorPage.standForm.heightLabel')}</Label>
          <Input
            id="stand-height"
            type="number"
            min={0}
            value={stand.height ?? ''}
            step={0.5}
            onChange={(e) => updateField('height', e.target.value === '' ? undefined : Number(e.target.value))}
          />
        </FieldRow>

        <FieldRow>
          <Label htmlFor="stand-color">{t('editorPage.standForm.colorLabel')}</Label>
          <Select
            id="stand-color"
            value={stand.color || ''}
            onChange={(e) =>
              updateField('color', e.target.value === '' ? undefined : (e.target.value as keyof typeof StandColorsMap))
            }
            style={{
              backgroundColor: stand.color ? StandColorsMap[stand.color] : '#fff',
              color: stand.color ? '#fff' : '#000'
            }}
          >
            <option value="">{t('editorPage.standForm.selectColor')}</option>
            {colorOptions.map((key) => (
              <ColorOption key={key} color={StandColorsMap[key]} value={key}>
                {key}
              </ColorOption>
            ))}
          </Select>
        </FieldRow>
        <ButtonRow>
          {isEditMode && (
            <Button type="button" onClick={() => updateStand(currentStand)}>
              {t('editorPage.standForm.update')}
            </Button>
          )}

          <CtaButton type="submit" disabled={!isValid}>
            {t('editorPage.standForm.addStand')}
          </CtaButton>
        </ButtonRow>
      </Form>
    </Container>
  );
};
