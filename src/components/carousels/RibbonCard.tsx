import { Picture } from '../Picture';
import { Typography } from '../Typography';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { TextColors } from '../../styles/theme';
import { ScheduleEntry } from '../../pages/main-page/workshops/scheduleConfig';
import { Ribbon } from './Ribbon';
import { DropShadow, Radius } from '../../styles/cards';
import { CtaButton } from '../Button';

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: 356px;
  min-width: 356px;
  height: 475px;

  padding: ${RedesignSpacings.md} ${RedesignSpacings.xs};

  gap: ${RedesignSpacings.lg};

  border-radius: ${Radius.lg};
  align-items: center;
  position: relative;
  box-shadow: ${DropShadow.sm};
`;

const TicketSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  gap: ${RedesignSpacings.sm};
`;

const PriceInfo = styled.div`
  color: ${TextColors.link};
`;

interface RibbonCardProps {
  scheduleEntry: ScheduleEntry;
}

export const RibbonCard = ({ scheduleEntry }: RibbonCardProps) => {
  const t = useTypedTranslation();

  return (
    <CardLayout>
      <Ribbon>
        <Typography size="lg">{scheduleEntry.time}</Typography>
      </Ribbon>

      <Picture
        picture={{
          fallbackUrl: scheduleEntry.picture.fallback,
          sources: scheduleEntry.picture.sources
        }}
        alt={t(scheduleEntry.topicKey)}
        width={160}
        height={160}
      />

      <TicketSection>
        <Typography size="lg">{t(scheduleEntry.topicKey)}</Typography>

        {scheduleEntry.isSoldOut ? (
          <PriceInfo>
            <Typography size="md">{t('scheduleBand.soldOut')}</Typography>
          </PriceInfo>
        ) : (
          <>
            <PriceInfo>
              <Typography size="md">
                {t('workshops.price')}: {scheduleEntry.price}zł
              </Typography>
            </PriceInfo>
            <CtaButton onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}>
              {t('workshops.buyTicket')}
            </CtaButton>
          </>
        )}
      </TicketSection>
    </CardLayout>
  );
};
