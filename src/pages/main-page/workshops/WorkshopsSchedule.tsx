import React, { ReactNode, useState } from 'react';
import { Tabs } from '../../../components/Tabs';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { ScheduleConfig } from './scheduleConfig';
import { RibbonCard } from '../../../components/carousels/RibbonCard';
import { MultiCarousel } from '../../../components/carousels/MultiCarousel';

type WorkshopRoom = 1 | 2 | 3;

export const WorkshopsSchedule = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <MultiCarousel>
        {ScheduleConfig.mirrorsRoom.map((scheduleEntry, index) => (
          <RibbonCard key={`mirrorsRoom_${index}`} scheduleEntry={scheduleEntry} />
        ))}
      </MultiCarousel>
    ),
    2: (
      <MultiCarousel>
        {ScheduleConfig.fencingRoom.map((scheduleEntry, index) => (
          <RibbonCard key={`fencingRoom_${index}`} scheduleEntry={scheduleEntry} />
        ))}
      </MultiCarousel>
    ),
    3: (
      <MultiCarousel>
        {ScheduleConfig.conferenceRoom.map((scheduleEntry, index) => (
          <RibbonCard key={`conferenceRoom_${index}`} scheduleEntry={scheduleEntry} />
        ))}
      </MultiCarousel>
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
