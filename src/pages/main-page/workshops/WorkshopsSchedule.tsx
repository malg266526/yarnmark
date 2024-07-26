import React, { ReactNode, useState } from 'react';
import { Tabs } from '../../../components/Tabs';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import Carousel from 'react-multi-carousel';
import { ScheduleConfig } from './scheduleConfig';
import { RibbonCard } from '../../../components/carousels/RibbonCard';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 2000, min: 1155 },
    items: 4
    //slidesToSlide: 3,
    // partialVisibilityGutter: 40
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

type WorkshopRoom = 1 | 2 | 3;

export const WorkshopsSchedule = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <Carousel
        responsive={responsive}
        keyBoardControl
        infinite
        removeArrowOnDeviceType={['tablet', 'mobile']}
        swipeable>
        {ScheduleConfig.mirrorsRoom.map((scheduleEntry, index) => (
          <RibbonCard key={`mirrorsRoom_${index}`} scheduleEntry={scheduleEntry} />
        ))}
      </Carousel>
    ),
    2: (
      <Carousel responsive={responsive} keyBoardControl rewindWithAnimation infinite>
        {ScheduleConfig.fencingRoom.map((scheduleEntry, index) => (
          <RibbonCard key={`fencingRoom_${index}`} scheduleEntry={scheduleEntry} />
        ))}
      </Carousel>
    ),
    3: (
      <Carousel responsive={responsive} keyBoardControl rewindWithAnimation infinite>
        {ScheduleConfig.conferenceRoom.map((scheduleEntry, index) => (
          <RibbonCard key={`conferenceRoom_${index}`} scheduleEntry={scheduleEntry} />
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
