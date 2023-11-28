import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles/theme';
import { Spacings } from '../styles/spacings';
import { RowLayout } from './RowLayout';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledH2 = styled.h2`
  margin: ${Spacings.xs};
`;

export const TimelineBox = styled.div`
  width: 43%;
`;

export const TimelineRow = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: -40px;
  }
`;

export const EventLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: ${Spacings.sm};
  border: 2px solid ${Colors.pinball};
`;

export const TimelineIcon = styled.div`
  display: flex;
  border-radius: 100%;
  background-color: ${Colors.gold};
  align-items: center;
  padding: ${Spacings.sm};
`;

export type Event = {
  date: number | string;
  icon: ReactNode;
  content: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  bottomSlot?: ReactNode;
};

const isEven = (index: number) => index % 2 === 0;

export type TimelineEventProps = {
  event: Event;
  index: number;
};

const TimelineEvent = ({ event, index }: TimelineEventProps) => (
  <TimelineRow key={`${event.date}_${index}`}>
    {isEven(index) ? (
      <TimelineBox>
        <EventLayout>
          <StyledH2>{event.date}</StyledH2>
          <RowLayout>
            {event.leftSlot}
            {event.content}
            {event.rightSlot}
          </RowLayout>
        </EventLayout>
      </TimelineBox>
    ) : (
      <TimelineBox />
    )}

    <TimelineIcon>{event.icon}</TimelineIcon>

    {!isEven(index) ? (
      <TimelineBox>
        <EventLayout>
          <StyledH2>{event.date}</StyledH2>
          <RowLayout>
            {event.leftSlot}
            {event.content}
            {event.rightSlot}
          </RowLayout>
          {event.bottomSlot}
        </EventLayout>
      </TimelineBox>
    ) : (
      <TimelineBox />
    )}
  </TimelineRow>
);

export interface TimelineProps {
  children?: ReactNode;
}

export const Timeline = ({ children }: TimelineProps) => {
  return <Root>{children}</Root>;
};

Timeline.Event = TimelineEvent;
