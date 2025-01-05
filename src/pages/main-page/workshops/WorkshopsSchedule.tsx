import React from 'react';
import { WorkshopsConfig } from './workshopsConfig';
import { RibbonCard } from '../../../components/carousels/RibbonCard';
import { MultiCarousel } from '../../../components/carousels/MultiCarousel';

export const WorkshopsSchedule = () => {
  return (
    <MultiCarousel
      items={WorkshopsConfig.map((workshop, index) => (
        <RibbonCard key={`mirrorsRoom_${index}`} workshop={workshop} />
      ))}></MultiCarousel>
  );
};
