import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles/theme';
import { Spacings } from '../styles/spacings';

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

export const TimelineEvent = styled.div`
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

type Event = {
  date: number | string;
  icon: ReactNode;
  content: ReactNode;
};

export interface TimelineProps {
  events: Event[];
}

const isEven = (index: number) => index % 2 === 0;

export const Timeline = ({ events }: TimelineProps) => {
  return (
    <Root>
      {events.map(({ date, icon, content }: Event, index) => (
        <TimelineRow key={`${date}_${index}`}>
          {isEven(index) ? (
            <TimelineBox>
              <TimelineEvent>
                <StyledH2>{date}</StyledH2>
                {content}
              </TimelineEvent>
            </TimelineBox>
          ) : (
            <TimelineBox />
          )}

          <TimelineIcon>{icon}</TimelineIcon>

          {!isEven(index) ? (
            <TimelineBox>
              <TimelineEvent>
                <StyledH2>{date}</StyledH2>
                {content}
              </TimelineEvent>
            </TimelineBox>
          ) : (
            <TimelineBox />
          )}
        </TimelineRow>
      ))}
    </Root>
  );
};
