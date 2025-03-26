import { Picture } from '../../../../components/Picture';
import { Typography } from '../../../../components/Typography';
import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../../../styles/spacings';
import { WorkshopsEntry } from '../workshopsConfig';
import { Ribbon } from './Ribbon';
import { CtaButton } from '../../../../components/Button';
import { CardLayout } from './CardLayout';
import { WorkshopPrice } from './WorkshopPrice';

const InfoSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  gap: ${RedesignSpacings.sm};
  padding-top: ${RedesignSpacings.md};
  text-align: center;
`;

interface RibbonCardProps {
  workshop: WorkshopsEntry;
  onClick?: (workshop: WorkshopsEntry) => void;
}

export const RibbonCard = ({ workshop, onClick }: RibbonCardProps) => {
  const t = useTypedTranslation();

  return (
    <CardLayout onClick={() => onClick?.(workshop)}>
      <Ribbon>
        <Typography size="lg">{workshop.time}</Typography>
      </Ribbon>

      <Picture
        picture={{
          fallbackUrl: workshop.picture.fallback,
          sources: workshop.picture.sources
        }}
        alt={t(workshop.topicKey)}
        width={150}
        height={150}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />

      <CtaButton
        disabled={workshop.isSoldOut}
        onClick={() => window.open(workshop.ticketUrl, '_blank')}
        aria-label="open workshops tickets">
        {t('workshops.buyTicket')}
      </CtaButton>

      <InfoSection>
        <Typography size="lg">{t(workshop.topicKey)}</Typography>

        <WorkshopPrice workshop={workshop} size="md" />
      </InfoSection>
    </CardLayout>
  );
};
