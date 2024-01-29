import React, { ReactNode, useState } from 'react';
import uwolnijPomysly from '../assets/images/workshops/uwolnijpomysly.jpg';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { Link } from './Link';
import { RowLayout } from './RowLayout';
import { Tabs } from './Tabs';
import { WorkshopsTimeline } from './WorkshopsTimeline';

type WorkshopRoom = 1 | 2 | 3;

export const WorkshopsTabs = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopTime="10:00 - 12:30">
          <WorkshopsTimeline.Text>Pierwsza pomoc</WorkshopsTimeline.Text>

          <RowLayout>
            <WorkshopsTimeline.Image width={150} src={uwolnijPomysly} />
            <WorkshopsTimeline.Description>
              fdfdfdfdfd gdfgdgdgdgdgdgd gdgdgdgdgd rerererererere sasasasasasa tretrtrtrtr fdfdfdfdf
            </WorkshopsTimeline.Description>
          </RowLayout>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">Kup bilet</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:30 - 15:30">
          <WorkshopsTimeline.Text>Warsztat 1</WorkshopsTimeline.Text>
          <WorkshopsTimeline.Image width={150} src={uwolnijPomysly} />
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="16:00 - 18:30">
          <WorkshopsTimeline.Text>Warsztat 2</WorkshopsTimeline.Text>
          <WorkshopsTimeline.Image width={150} src={uwolnijPomysly} />
        </WorkshopsTimeline.Slot>
      </WorkshopsTimeline>
    ),
    2: <WorkshopsTimeline />,
    3: <WorkshopsTimeline />
  };

  return (
    <>
      <Tabs>
        <Tabs.Tab onClick={() => setActiveRoom(1)} active={activeRoom === 1}>
          {t('scheduleBand.room1')}
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setActiveRoom(2)} active={activeRoom === 2}>
          {t('scheduleBand.room2')}
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setActiveRoom(3)} active={activeRoom === 3}>
          {t('scheduleBand.room3')}
        </Tabs.Tab>
      </Tabs>

      <Tabs.Content>{activeRoomToContent[activeRoom]}</Tabs.Content>
    </>
  );
};
