import React from 'react';
import { SQUARE_SIZE_M } from './utils/hallGeometry';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

interface StandInfoProps {
  start: { row: number; col: number } | undefined;
  end: { row: number; col: number } | undefined;
}

export const StandInfo = ({ start, end }: StandInfoProps) => {
  const t = useTypedTranslation();

  if (!start || !end) {
    return <div style={{ minWidth: 120 }}>{t('editorPage.standInfo.noSelection')}</div>;
  }

  const rowCount = Math.abs(end.row - start.row) + 1;
  const colCount = Math.abs(end.col - start.col) + 1;
  const heightM = rowCount * SQUARE_SIZE_M;
  const widthM = colCount * SQUARE_SIZE_M;
  const sizeM2 = heightM * widthM;

  return (
    <div style={{ minWidth: 120, padding: 8, background: '#f5f5f5', border: '1px solid #bbb', borderRadius: 4 }}>
      <div>
        <strong>{t('editorPage.standInfo.title')}</strong>
      </div>
      <div>{t('editorPage.standInfo.height', { value: heightM })}</div>
      <div>{t('editorPage.standInfo.width', { value: widthM })}</div>
      <div>{t('editorPage.standInfo.size', { value: sizeM2 })}</div>
    </div>
  );
};
