import React, { ReactNode, useState } from 'react';
import { Link } from '../components/Link';
import { Picture } from '../components/Picture';
import { Tabs } from '../components/Tabs';
import { WorkshopsTimeline } from '../components/WorkshopsTimeline';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import PierwszaPomocUrlAvif from './../assets/images/workshops/pierwszapomoc.avif';
import PierwszaPomocUrl from './../assets/images/workshops/pierwszapomoc.jpg';
import PierwszaPomocUrlWebp from './../assets/images/workshops/pierwszapomoc.webp';

import WoolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import WoolankaUrl from './../assets/images/workshops/woolanka.jpg';
import WoolankaUrlWebp from './../assets/images/workshops/woolanka.webp';

import HaftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import HaftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import HaftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';

import KnitologUrlAvif from './../assets/images/workshops/knitolog.avif';
import KnitologUrl from './../assets/images/workshops/knitolog.jpg';
import KnitologUrlWebp from './../assets/images/workshops/knitolog.webp';

import RaffiaUrlAvif from './../assets/images/workshops/rafia.avif';
import RaffiaUrl from './../assets/images/workshops/rafia.jpg';
import RaffiaUrlWebp from './../assets/images/workshops/rafia.webp';

import LudArtUrlAvif from './../assets/images/workshops/ludart.avif';
import LudArtUrl from './../assets/images/workshops/ludart.jpg';
import LudArtUrlWebp from './../assets/images/workshops/ludart.webp';

import UwolnijPomyslyUrlAvif from './../assets/images/workshops/uwolnijpomysly.avif';
import UwolnijPomyslyUrl from './../assets/images/workshops/uwolnijpomysly.jpg';
import UwolnijPomyslyWebp from './../assets/images/workshops/uwolnijpomysly.webp';

import DoRanyPrzylozUrlAvif from './../assets/images/workshops/doranyprzyloz.avif';
import DoRanyPrzylozUrl from './../assets/images/workshops/doranyprzyloz.jpg';
import DoRanyPrzylozUrlWebp from './../assets/images/workshops/doranyprzyloz.webp';

type WorkshopRoom = 1 | 2 | 3;

export const WorkshopsTabs = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopTime="9:00 - 12:00">
          <WorkshopsTimeline.Text>{t('workshops.ewa.topic')}</WorkshopsTimeline.Text>
          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:00 - 15:30">
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

          <WorkshopsTimeline.Price>
            {t('workshops.price')}: {t('workshops.freeAdmission')}
          </WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="15:40 - 18:40">
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
    2: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopTime="9:00 - 12:00">
          <WorkshopsTimeline.Text>{t('workshops.knitolog.topic')}</WorkshopsTimeline.Text>
          <Picture
            picture={{
              fallbackUrl: KnitologUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: KnitologUrlWebp
                },
                {
                  type: 'image/avif',
                  url: KnitologUrlAvif
                }
              ]
            }}
            alt="knitolog"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:10 - 15:10">
          <WorkshopsTimeline.Text>{t('workshops.freeYourIdeas.topic')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: UwolnijPomyslyUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: UwolnijPomyslyWebp
                },
                {
                  type: 'image/avif',
                  url: UwolnijPomyslyUrlAvif
                }
              ]
            }}
            alt="uwolnijpomysly"
            width={100}
          />

          <WorkshopsTimeline.Price>
            {t('workshops.price')}: {t('workshops.freeAdmission')}
          </WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="15:20 - 18:20">
          <WorkshopsTimeline.Text>{t('workshops.doRanyPrzyloz.topic')}</WorkshopsTimeline.Text>

          <WorkshopsTimeline.Image
            picture={{
              fallbackUrl: DoRanyPrzylozUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: DoRanyPrzylozUrlWebp
                },
                {
                  type: 'image/avif',
                  url: DoRanyPrzylozUrlAvif
                }
              ]
            }}
            alt="doranyprzyloz"
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>
      </WorkshopsTimeline>
    ),
    3: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopTime="9:15 - 25:15">
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
            alt="haftowababa_logo"
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:25 - 15:25">
          <WorkshopsTimeline.Text>{t('workshops.decorativeKnitting')}</WorkshopsTimeline.Text>

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

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="15:35 - 18:45">
          <WorkshopsTimeline.Text>{t('workshops.raffia')}</WorkshopsTimeline.Text>

          <WorkshopsTimeline.Image
            picture={{
              fallbackUrl: RaffiaUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: RaffiaUrlWebp
                },
                {
                  type: 'image/avif',
                  url: RaffiaUrlAvif
                }
              ]
            }}
            alt="woolanka"
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

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
