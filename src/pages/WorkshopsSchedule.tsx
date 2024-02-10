import React, { ReactNode, useState } from 'react';
import { Link } from '../components/Link';
import { Picture } from '../components/Picture';
import { Tabs } from '../components/Tabs';
import { WorkshopsTimeline } from '../components/WorkshopsTimeline';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import pierwszaPomocUrlAvif from './../assets/images/workshops/pierwszapomoc.avif';
import pierwszaPomocUrl from './../assets/images/workshops/pierwszapomoc.jpg';
import pierwszaPomocUrlWebp from './../assets/images/workshops/pierwszapomoc.webp';

import woolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import woolankaUrl from './../assets/images/workshops/woolanka.jpg';
import woolankaUrlWebp from './../assets/images/workshops/woolanka.webp';

import haftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import haftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import haftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';

import knitologUrlAvif from './../assets/images/workshops/knitolog.avif';
import knitologUrl from './../assets/images/workshops/knitolog.jpg';
import knitologUrlWebp from './../assets/images/workshops/knitolog.webp';

import raffiaUrlAvif from './../assets/images/workshops/rafia.avif';
import raffiaUrl from './../assets/images/workshops/rafia.jpg';
import raffiaUrlWebp from './../assets/images/workshops/rafia.webp';

import ludArtUrlAvif from './../assets/images/workshops/ludart.avif';
import ludArtUrl from './../assets/images/workshops/ludart.jpg';
import ludArtUrlWebp from './../assets/images/workshops/ludart.webp';

import uwolnijPomyslyUrlAvif from './../assets/images/workshops/uwolnijpomysly.avif';
import uwolnijPomyslyUrl from './../assets/images/workshops/uwolnijpomysly.jpg';
import uwolnijPomyslyWebp from './../assets/images/workshops/uwolnijpomysly.webp';

import doRanyPrzylozUrlAvif from './../assets/images/workshops/doranyprzyloz.avif';
import doRanyPrzylozUrl from './../assets/images/workshops/doranyprzyloz.jpg';
import doRanyPrzylozUrlWebp from './../assets/images/workshops/doranyprzyloz.webp';

import ewaUrlAvif from './../assets/images/workshops/ewa.avif';
import ewaUrl from './../assets/images/workshops/ewa.jpg';

type WorkshopRoom = 1 | 2 | 3;

export const WorkshopsSchedule = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <WorkshopsTimeline>
        <WorkshopsTimeline.Slot workshopTime="9:00 - 10:30">
          <WorkshopsTimeline.Text>{t('workshops.ewa.topic')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: ewaUrl,
              sources: [
                {
                  type: 'image/avif',
                  url: ewaUrlAvif
                }
              ]
            }}
            alt="ewa"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="10:30 - 12:00">
          <WorkshopsTimeline.Text>{t('workshops.ewa.topic')}</WorkshopsTimeline.Text>
          <Picture
            picture={{
              fallbackUrl: ewaUrl,
              sources: [
                {
                  type: 'image/avif',
                  url: ewaUrlAvif
                }
              ]
            }}
            alt="ewa"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:00 - 13:00">
          <WorkshopsTimeline.Text>{t('workshops.firstAid')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: pierwszaPomocUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: pierwszaPomocUrlWebp
                },
                {
                  type: 'image/avif',
                  url: pierwszaPomocUrlAvif
                }
              ]
            }}
            alt="firstAid"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="13:15 - 14:15">
          <WorkshopsTimeline.Text>{t('workshops.firstAid')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: pierwszaPomocUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: pierwszaPomocUrlWebp
                },
                {
                  type: 'image/avif',
                  url: pierwszaPomocUrlAvif
                }
              ]
            }}
            alt="firstAid"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="14:30 - 15:30">
          <WorkshopsTimeline.Text>{t('workshops.firstAid')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: pierwszaPomocUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: pierwszaPomocUrlWebp
                },
                {
                  type: 'image/avif',
                  url: pierwszaPomocUrlAvif
                }
              ]
            }}
            alt="firstAid"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="15:40 - 18:40">
          <WorkshopsTimeline.Text>{t('workshops.colorfulEmbroidery')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: ludArtUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: ludArtUrlWebp
                },
                {
                  type: 'image/avif',
                  url: ludArtUrlAvif
                }
              ]
            }}
            alt="ludart"
            width={110}
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
              fallbackUrl: knitologUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: knitologUrlWebp
                },
                {
                  type: 'image/avif',
                  url: knitologUrlAvif
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
              fallbackUrl: uwolnijPomyslyUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: uwolnijPomyslyWebp
                },
                {
                  type: 'image/avif',
                  url: uwolnijPomyslyUrlAvif
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

          <Picture
            picture={{
              fallbackUrl: doRanyPrzylozUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: doRanyPrzylozUrlWebp
                },
                {
                  type: 'image/avif',
                  url: doRanyPrzylozUrlAvif
                }
              ]
            }}
            alt="doranyprzyloz"
            width={100}
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

          <Picture
            picture={{
              fallbackUrl: haftowaBabaUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: haftowaBabaUrlWebp
                },
                {
                  type: 'image/avif',
                  url: haftowaBabaUrlAvif
                }
              ]
            }}
            alt="haftowababa_logo"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="12:25 - 15:25">
          <WorkshopsTimeline.Text>{t('workshops.decorativeKnitting')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: woolankaUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: woolankaUrlWebp
                },
                {
                  type: 'image/avif',
                  url: woolankaUrlAvif
                }
              ]
            }}
            alt="woolanka"
            width={100}
          />

          <WorkshopsTimeline.Price>{t('workshops.price')}: XXzł</WorkshopsTimeline.Price>

          <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('workshops.buyTicket')}</Link>
        </WorkshopsTimeline.Slot>

        <WorkshopsTimeline.Slot workshopTime="15:35 - 18:45">
          <WorkshopsTimeline.Text>{t('workshops.raffia')}</WorkshopsTimeline.Text>

          <Picture
            picture={{
              fallbackUrl: raffiaUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: raffiaUrlWebp
                },
                {
                  type: 'image/avif',
                  url: raffiaUrlAvif
                }
              ]
            }}
            alt="woolanka"
            width={100}
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
