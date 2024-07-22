import React from 'react';
import { SolidBackgroundBand } from '../../components/bands/SolidBackgroundBand';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';

export const LocationAndTicketsBand = () => {
  return (
    <SolidBackgroundBand color="white" padding="xl" size="lg">
      <FlexColumnLayout align="center" width="100%">
        <Typography size="md">27/04/2024r 10:00</Typography>
        <Typography size="md">Hala 100-lecia KS Cracovia</Typography>
      </FlexColumnLayout>
    </SolidBackgroundBand>
  );
};
