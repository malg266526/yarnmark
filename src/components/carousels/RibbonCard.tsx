import { Picture } from '../Picture';
import { Typography } from '../Typography';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings, Spacings } from '../../styles/spacings';
import { Colors } from '../../styles/theme';
import { Link } from '../Link';
import { FontSize } from '../../styles/font-size';
import { ScheduleEntry } from '../../pages/main-page/workshops/scheduleConfig';
import { Ribbon } from './Ribbon';
import { DropShadow, Radius } from '../../styles/cards';
import { FlexColumnLayout } from '../FlexColumnLayout';

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: 356px;
  min-width: 356px;
  height: 440px;

  padding: ${RedesignSpacings.md} ${RedesignSpacings.xs};

  border-radius: ${Radius.lg};
  align-items: center;
  position: relative;
  box-shadow: ${DropShadow.sm};
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  gap: ${Spacings.sm};
`;

const SoldOutInfo = styled.div`
  color: ${Colors.soldOutRed};
`;

const WorkshopLink = styled(Link)`
  font-size: ${FontSize.sm};
  padding: 0;
`;

interface RibbonCard {
  scheduleEntry: ScheduleEntry;
}

export const RibbonCard = ({ scheduleEntry }: RibbonCard) => {
  const t = useTypedTranslation();

  return (
    <CardLayout>
      <FlexColumnLayout gap="lg" padding="none" width="100%">
        <Ribbon>
          <Typography size="xl">{scheduleEntry.time}</Typography>
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

        <Typography size="lg">{t(scheduleEntry.topicKey)}</Typography>
      </FlexColumnLayout>

      <TextContent>
        {scheduleEntry.isSoldOut ? (
          <SoldOutInfo>
            <Typography size="sm">{t('scheduleBand.soldOut')}</Typography>
          </SoldOutInfo>
        ) : (
          <>
            <Typography size="sm">
              {t('workshops.price')}: {scheduleEntry.price}zł
            </Typography>
            <WorkshopLink to={scheduleEntry.ticketUrl} target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </>
        )}
      </TextContent>
    </CardLayout>
  );
};
