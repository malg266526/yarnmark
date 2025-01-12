import { Typography } from '../../../../components/Typography';
import React from 'react';
import { WorkshopsEntry } from '../workshopsConfig';
import styled from 'styled-components';
import { TextColors } from '../../../../styles/theme';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FontSize } from '../../../../styles/font-size';

const PriceInfo = styled.div`
  color: ${TextColors.accent};
`;

interface WorkshopPriceProps {
  workshop: WorkshopsEntry;
  size?: keyof typeof FontSize;
}

export const WorkshopPrice = ({ workshop, size }: WorkshopPriceProps) => {
  const t = useTypedTranslation();

  const fontSize = size || 'sm';

  return workshop.isSoldOut ? (
    <PriceInfo>
      <Typography size={fontSize}>{t('workshops.soldOut')}</Typography>
    </PriceInfo>
  ) : (
    <>
      <PriceInfo>
        <Typography size={fontSize}>
          {t('workshops.price')}: {workshop.price}zł
        </Typography>
      </PriceInfo>
    </>
  );
};
