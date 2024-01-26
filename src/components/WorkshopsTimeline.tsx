import React, { ReactNode } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import { RowLayout } from './RowLayout';
import { FlexColumnLayout } from './FlexColumnLayout';
import styled from 'styled-components';

export const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

type WorkshopInfo = {
  workshopTime: string;
  workshopName: string;
};

const Slot = ({ workshopTime, workshopName }: WorkshopInfo) => (
  <RowLayout>
    <IconifyIcon icon="fluent:clock-alarm-24-regular" width={24}></IconifyIcon>
    <Text>{workshopTime}</Text>
    <Text>{workshopName}</Text>
  </RowLayout>
);

type WorkshopsTimelineProps = {
  children: ReactNode;
};

export const WorkshopsTimeline = Object.assign(
  ({ children }: WorkshopsTimelineProps) => {
    return <FlexColumnLayout>{children}</FlexColumnLayout>;
  },
  { Slot }
);
