import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Picture } from '../../../components/Picture';
import { Tabs } from '../../../components/Tabs';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import Carousel from 'react-multi-carousel';
import { Link } from '../../../components/Link';
import { PlannerCard } from '../../../components/PlannerCard';
import { FontSize } from '../../../styles/font-size';
import { Spacings } from '../../../styles/spacings';
import { Colors } from '../../../styles/theme';
import { ScheduleConfig } from './scheduleConfig';
import { Typography } from '../../../components/Typography';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 2000, min: 1155 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1155, min: 640 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1
  }
};

const reponsiveWhenMoreItems = {
  ...responsive,
  desktop: {
    breakpoint: { max: 1400, min: 1155 },
    items: 3
  },
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 4
  }
};

type WorkshopRoom = 1 | 2 | 3;

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

export const WorkshopsSchedule = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <Carousel responsive={reponsiveWhenMoreItems} keyBoardControl infinite>
        {ScheduleConfig.mirrorsRoom.map((scheduleEntry, index) => (
          <PlannerCard key={`mirrorsRoom_${index}`} time={scheduleEntry.time}>
            <Picture
              picture={{
                fallbackUrl: scheduleEntry.picture.fallback,
                sources: scheduleEntry.picture.sources
              }}
              alt={t(scheduleEntry.topicKey)}
              width={120}
              height={120}
            />

            <TextContent>
              <Typography size="lg">{t(scheduleEntry.topicKey)}</Typography>
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
          </PlannerCard>
        ))}
      </Carousel>
    ),
    2: (
      <Carousel responsive={responsive} keyBoardControl rewindWithAnimation infinite>
        {ScheduleConfig.fencingRoom.map((scheduleEntry, index) => (
          <PlannerCard key={`fencingRoom_${index}`} time={scheduleEntry.time}>
            <Picture
              picture={{
                fallbackUrl: scheduleEntry.picture.fallback,
                sources: scheduleEntry.picture.sources
              }}
              alt={t(scheduleEntry.topicKey)}
              width={120}
              height={120}
            />

            <TextContent>
              <Typography size="lg">{t(scheduleEntry.topicKey)}</Typography>
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
          </PlannerCard>
        ))}
      </Carousel>
    ),
    3: (
      <Carousel responsive={responsive} keyBoardControl rewindWithAnimation infinite>
        {ScheduleConfig.conferenceRoom.map((scheduleEntry, index) => (
          <PlannerCard key={`conferenceRoom_${index}`} time={scheduleEntry.time}>
            <Picture
              picture={{
                fallbackUrl: scheduleEntry.picture.fallback,
                sources: scheduleEntry.picture.sources
              }}
              alt={t(scheduleEntry.topicKey)}
              width={120}
              height={120}
            />

            <TextContent>
              <Typography size="lg">{t(scheduleEntry.topicKey)}</Typography>
              {scheduleEntry.isSoldOut ? (
                <SoldOutInfo>
                  <Typography size="sm">{t('scheduleBand.soldOut')}</Typography>
                </SoldOutInfo>
              ) : (
                <>
                  <Typography size="lg">
                    {t('workshops.price')}: {scheduleEntry.price}zł
                  </Typography>
                  <WorkshopLink to={scheduleEntry.ticketUrl} target="_blank">
                    {t('workshops.buyTicket')}
                  </WorkshopLink>
                </>
              )}
            </TextContent>
          </PlannerCard>
        ))}
      </Carousel>
    )
  };

  return (
    <>
      <Tabs id="tabs">
        <Tabs.Tab onClick={() => setActiveRoom(1)} active={activeRoom === 1}>
          {t('scheduleBand.room1')}
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setActiveRoom(2)} active={activeRoom === 2}>
          {t('scheduleBand.room2')}
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setActiveRoom(3)} active={activeRoom === 3}>
          {t('scheduleBand.room3')}
        </Tabs.Tab>
      </Tabs>

      <Tabs.Content>{activeRoomToContent[activeRoom]}</Tabs.Content>
    </>
  );
};
