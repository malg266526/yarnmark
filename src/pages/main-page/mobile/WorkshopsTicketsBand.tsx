import React from 'react';
import { Band } from '../../../components/bands/Band';
import { WorkshopsSchedule } from '../workshops/WorkshopsSchedule';

export const WorkshopsTicketsBand = () => {
  return (
    <Band.Empty id="workshopsTickets" padding="xs">
      <WorkshopsSchedule />
    </Band.Empty>
  );
};
