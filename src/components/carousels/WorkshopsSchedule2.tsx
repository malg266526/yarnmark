import { MultiCarousel } from './MultiCarousel';
import { ScheduleConfig } from '../../pages/main-page/workshops/scheduleConfig';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { RibbonCard } from './RibbonCard';

export const WorkshopsSchedule2 = () => {
  const t = useTypedTranslation();

  return (
    <MultiCarousel>
      {ScheduleConfig.mirrorsRoom.map((scheduleEntry, index) => (
        <RibbonCard key={`mirrorsRoom_${index}`} scheduleEntry={scheduleEntry} />
      ))}
    </MultiCarousel>
  );
};
