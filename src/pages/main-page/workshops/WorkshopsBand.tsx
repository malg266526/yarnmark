import { WorkshopsCarousel } from './WorkshopsCarousel';
import React from 'react';
import { Band } from '../../../components/bands/Band';

const gradient = `linear-gradient(182deg, #EBEAEA 1.4%, #EBEAEA 100.83%, rgba(235, 234, 234, 0.30) 100.84%);`;

type WorkshopsBandType = {
  id: string;
};

export const WorkshopsBand = ({ id }: WorkshopsBandType) => {
  return (
    <Band.CenteredColumn id={id} size="lg" justify="center" padding="xl" color={gradient}>
      <WorkshopsCarousel />
    </Band.CenteredColumn>
  );
};
