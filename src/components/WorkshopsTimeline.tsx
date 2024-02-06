import { Icon as IconifyIcon } from '@iconify/react';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { FlexColumnLayout } from './FlexColumnLayout';
import { WorkshopImage } from './WorkshopImage';

export const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

export const Price = styled(Text)`
  margin: 0;
  align-self: flex-start;
`;

type WorkshopsTimelineProps = {
  children?: ReactNode;
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
`;

const Timeline = styled.div`
  display: flex;
  width: 100%;
  height: 6px;
  background-color: black;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const IconBackground = styled.div`
  background-color: white;
`;

export const Image = styled.img`
  object-fit: contain;
`;

const ArrowRight = styled.div`
  display: flex;
  flex: 1;
  height: 6px;
  background-color: black;
  align-items: center;
  justify-content: flex-end;
  margin-top: 68px;
`;

const ArrowWrapper = styled.div`
  margin-right: -8px;
  margin-top: 4px;
`;

const Description = styled.div`
  max-width: 200px;
`;

const SlotContent = styled.div`
  display: flex;
  padding: ${Spacings.sm} ${Spacings.sm};
  align-items: center;
  justify-content: center;
  min-width: 400px;
`;

type WorkshopInfo = {
  workshopTime: string;
  children: ReactNode;
};

const Slot = ({ workshopTime, children }: WorkshopInfo) => (
  <div>
    <SlotContent>
      <Text>{workshopTime}</Text>
    </SlotContent>

    <Timeline>
      <IconBackground>
        <IconifyIcon icon="fluent:clock-alarm-24-regular" width={24} enableBackground="white" />
      </IconBackground>
    </Timeline>

    <SlotContent>
      <FlexColumnLayout padding="none" gap="sm">
        {children}
      </FlexColumnLayout>
    </SlotContent>
  </div>
);

export const WorkshopsTimeline = Object.assign(
  ({ children }: WorkshopsTimelineProps) => {
    return (
      <Root>
        {children}

        <ArrowRight>
          <ArrowWrapper>
            <IconifyIcon icon="bxs:right-arrow" width={24} />
          </ArrowWrapper>
        </ArrowRight>
      </Root>
    );
  },
  { Slot, Image: WorkshopImage, Text, Description, Price }
);
