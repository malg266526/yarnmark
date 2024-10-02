import { Picture } from '../Picture';
import { Typography } from '../Typography';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { TextColors } from '../../styles/theme';
import { WorkshopsEntry } from '../../pages/main-page/workshops/workshopsConfig';
import { Ribbon } from './Ribbon';
import { DropShadow, Radius } from '../../styles/cards';
import { CtaButton } from '../Button';
import { ScreenSize } from '../../styles/screeen-size';

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: 320px;
  min-width: 320px;
  height: 470px;

  padding: ${RedesignSpacings.md} ${RedesignSpacings.xs};

  gap: ${RedesignSpacings.sm};

  border-radius: ${Radius.lg};
  align-items: center;
  position: relative;
  box-shadow: ${DropShadow.sm};

  cursor: pointer;

  @media (max-width: ${ScreenSize.phone}) {
    width: 280px;
    min-width: 280px;

    padding: ${RedesignSpacings.sm} ${RedesignSpacings.xs};
  }
`;

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

const PriceInfo = styled.div`
  color: ${TextColors.accent};
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
      />

      <CtaButton
        onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}
        aria-label="open workshops tickets">
        {t('workshops.buyTicket')}
      </CtaButton>

      <InfoSection>
        <Typography size="lg">{t(workshop.topicKey)}</Typography>

        {workshop.isSoldOut ? (
          <PriceInfo>
            <Typography size="md">{t('workshops.soldOut')}</Typography>
          </PriceInfo>
        ) : (
          <>
            <PriceInfo>
              <Typography size="md">
                {t('workshops.price')}: {workshop.price}zł
              </Typography>
            </PriceInfo>
          </>
        )}
      </InfoSection>
    </CardLayout>
  );
};
