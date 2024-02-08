import React, { ReactNode, useState } from 'react';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { Link } from '../components/Link';
import { RowLayout } from '../components/RowLayout';
import { Tabs } from '../components/Tabs';
import { WorkshopsTimeline } from '../components/WorkshopsTimeline';

import PierwszaPomocUrlAvif from './../assets/images/workshops/pierwszapomoc.avif';
import PierwszaPomocUrl from './../assets/images/workshops/pierwszapomoc.jpg';
import PierwszaPomocUrlWebp from './../assets/images/workshops/pierwszapomoc.webp';

import WoolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import WoolankaUrl from './../assets/images/workshops/woolanka.jpg';
import WoolankaUrlWebp from './../assets/images/workshops/woolanka.webp';

import HaftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import HaftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import HaftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';

import LudArtUrlAvif from './../assets/images/workshops/ludart.avif';
import LudArtUrl from './../assets/images/workshops/ludart.jpg';
import LudArtUrlWebp from './../assets/images/workshops/ludart.webp';
import { Picture } from '../components/Picture';

type WorkshopRoom = 1 | 2 | 3;

export const WorkshopsTabs = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopTime="10:00 - 12:30">
          <WorkshopsTimeline.Text>{t('workshops.firstAid')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: PierwszaPomocUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: PierwszaPomocUrlWebp
                },
                {
                  type: 'image/avif',
                  url: PierwszaPomocUrlAvif
                }
              ]
            }}
            alt="firstAid"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.freeAdmission')}</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:30 - 15:30">
          <WorkshopsTimeline.Text>Haftowa Baba</WorkshopsTimeline.Text>

          <WorkshopsTimeline.Image
            picture={{
              fallbackUrl: HaftowaBabaUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: HaftowaBabaUrlWebp
                },
                {
                  type: 'image/avif',
                  url: HaftowaBabaUrlAvif
                }
              ]
            }}
            alt="haftowababa"
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="15:30 - 18:30">
          <WorkshopsTimeline.Text>{t('workshops.colorfulEmbroidery')}</WorkshopsTimeline.Text>

          <WorkshopsTimeline.Image
            picture={{
              fallbackUrl: LudArtUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: LudArtUrlWebp
                },
                {
                  type: 'image/avif',
                  url: LudArtUrlAvif
                }
              ]
            }}
            alt="ludart"
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>
      </WorkshopsTimeline>
    ),
    2: <WorkshopsTimeline></WorkshopsTimeline>,
    3: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopTime="9:15 - 12:15">
          <WorkshopsTimeline.Text>TODO</WorkshopsTimeline.Text>

          <WorkshopsTimeline.Price>{t('workshops.price')}: zł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:15 - 15:15">
          <WorkshopsTimeline.Text>{t('workshops.decorativeKnitting')}</WorkshopsTimeline.Text>

          <RowLayout>
            <WorkshopsTimeline.Image
              picture={{
                fallbackUrl: WoolankaUrl,
                sources: [
                  {
                    type: 'image/webp',
                    url: WoolankaUrlWebp
                  },
                  {
                    type: 'image/avif',
                    url: WoolankaUrlAvif
                  }
                ]
              }}
              alt="woolanka"
            />
          </RowLayout>

          <WorkshopsTimeline.Price>{t('workshops.price')}: 65zł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>
      </WorkshopsTimeline>
    )
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
