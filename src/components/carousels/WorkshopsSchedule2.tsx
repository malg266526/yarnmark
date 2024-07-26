import { MultiCarousel } from './MultiCarousel';
import { ScheduleConfig } from '../../pages/main-page/workshops/scheduleConfig';
import React from 'react';
import { RibbonCard } from './RibbonCard';

export const WorkshopsSchedule2 = () => {
  return (
    <MultiCarousel>
      {ScheduleConfig.mirrorsRoom.map((scheduleEntry, index) => (
        <RibbonCard key={`mirrorsRoom_${index}`} scheduleEntry={scheduleEntry} />
      ))}
    </MultiCarousel>
  );
};
