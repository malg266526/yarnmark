import React from 'react';
import { ScheduleConfig } from './scheduleConfig';
import { RibbonCard } from '../../../components/carousels/RibbonCard';
import { MultiCarousel } from '../../../components/carousels/MultiCarousel';

export const WorkshopsSchedule = () => {
  return (
    <MultiCarousel>
      {ScheduleConfig.map((scheduleEntry, index) => (
        <RibbonCard key={`mirrorsRoom_${index}`} scheduleEntry={scheduleEntry} />
      ))}
    </MultiCarousel>
  );
};
