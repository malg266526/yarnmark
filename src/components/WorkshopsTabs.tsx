import React, { ReactNode, useState } from 'react';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { Link } from './Link';
import { RowLayout } from './RowLayout';
import { Tabs } from './Tabs';
import { WorkshopsTimeline } from './WorkshopsTimeline';
import { Text } from '../pages/MainPage.styled';

import PierwszaPomocUrl from './../assets/images/workshops/pierwszapomoc.jpg';
import PierwszaPomocUrlAvif from './../assets/images/workshops/pierwszapomoc.avif';
import PierwszaPomocUrlWebp from './../assets/images/workshops/pierwszapomoc.webp';

import WoolankaUrl from './../assets/images/workshops/woolanka.jpg';
import WoolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import WoolankaUrlWebp from './../assets/images/workshops/woolanka.webp';

import HaftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import HaftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import HaftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';

import LudArtUrl from './../assets/images/workshops/ludart.jpg';
import LudArtUrlAvif from './../assets/images/workshops/ludart.avif';
import LudArtUrlWebp from './../assets/images/workshops/ludart.webp';

type WorkshopRoom = 1 | 2 | 3;

export const WorkshopsTabs = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopTime="10:00 - 12:30">
          <WorkshopsTimeline.Text>{t('workshops.firstAid')}</WorkshopsTimeline.Text>

          <RowLayout>
            <WorkshopsTimeline.Image
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
            />
            <WorkshopsTimeline.Description>
              <Text>{t('workshops.firstAidDescription')}</Text>
            </WorkshopsTimeline.Description>
          </RowLayout>

          <WorkshopsTimeline.Price>{t('workshops.freeAdmission')}</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:30 - 15:30">
          <WorkshopsTimeline.Text>Haftowa Baba</WorkshopsTimeline.Text>

          <RowLayout>
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
            <WorkshopsTimeline.Description>
              <Text>{t('workshops.haftowaBabaDescription1')}</Text>
              <Text>{t('workshops.haftowaBabaDescription2')}</Text>
              <Text>{t('workshops.haftowaBabaDescription3')}</Text>
              <Text>{t('workshops.haftowaBabaDescription4')}</Text>
              <Text>{t('workshops.haftowaBabaDescription5')}</Text>
              <Text>{t('workshops.haftowaBabaDescription6')}</Text>
            </WorkshopsTimeline.Description>
          </RowLayout>

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="15:30 - 18:30">
          <WorkshopsTimeline.Text>LudArt - {t('workshops.colorfulEmbroidery')}</WorkshopsTimeline.Text>

          <RowLayout>
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
            <WorkshopsTimeline.Description>
              <Text>{t('workshops.colorfulEmbroideryDescription')}</Text>
            </WorkshopsTimeline.Description>
          </RowLayout>

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>
      </WorkshopsTimeline>
    ),
    2: (
      <WorkshopsTimeline>
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
            <WorkshopsTimeline.Description>
              {t('workshops.decorativeKnittingDescription')}
            </WorkshopsTimeline.Description>
          </RowLayout>

          <WorkshopsTimeline.Price>{t('workshops.price')}: 65zł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>
      </WorkshopsTimeline>
    ),
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
              alt="woolanka n"
            />
            <WorkshopsTimeline.Description>
              {t('workshops.decorativeKnittingDescription')}
            </WorkshopsTimeline.Description>
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
