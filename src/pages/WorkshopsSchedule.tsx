import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Picture } from '../components/Picture';
import { Tabs } from '../components/Tabs';
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

import labolensUrlAvif from './../assets/images/workshops/labolens.avif';
import labolensUrl from './../assets/images/workshops/labolens.jpg';
import labolensUrlWebp from './../assets/images/workshops/labolens.webp';

import Carousel from 'react-multi-carousel';
import { Link } from '../components/Link';
import { PlannerCard } from '../components/PlannerCard';
import { FontSize } from '../styles/font-size';
import { Spacings } from '../styles/spacings';
import { Colors, TextColors } from '../styles/theme';
import ewaUrlAvif from './../assets/images/workshops/ewa.avif';
import ewaUrl from './../assets/images/workshops/ewa.jpg';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 2000, min: 1155 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1155, min: 640 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1
  }
};

const reponsiveWhenMoreItems = {
  ...responsive,
  desktop: {
    breakpoint: { max: 1400, min: 1155 },
    items: 3
  },
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 4
  }
};

type WorkshopRoom = 1 | 2 | 3;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  gap: ${Spacings.sm};
`;

export const TextH2 = styled.h2`
  font-size: ${FontSize.lg};
  font-weight: 500;
  margin-bottom: 0;
  text-align: center;
`;

const SmallTextH2 = styled(TextH2)`
  font-size: ${FontSize.md};
`;

const Text = styled.p`
  font-size: ${FontSize.md};
  font-weight: 400;
  margin-bottom: 0;
  color: ${TextColors.secondary};
`;

const SoldOutInfo = styled(Text)`
  color: ${Colors.soldOutRed};
`;

const WorkshopLink = styled(Link)`
  font-size: ${FontSize.md};
  padding: 0;
`;

export const WorkshopsSchedule = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <Carousel responsive={reponsiveWhenMoreItems} keyBoardControl infinite>
        <PlannerCard time="9:00 - 10:30">
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
            width={120}
            style={{ borderRadius: '100%' }}
          />

          <TextContent>
            <TextH2>{t('workshops.ewa.topic')}</TextH2>
            <Text>{t('workshops.price')}: 30zł</Text>
            <WorkshopLink to="https://wloczykijki.pl/pl/p/Warsztaty-Zielone-druty-/2835" target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="10:30 - 12:00">
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
            width={120}
            style={{ borderRadius: '100%' }}
          />

          <TextContent>
            <TextH2>{t('workshops.ewa.topic')}</TextH2>
            <Text>{t('workshops.price')}: 30zł</Text>
            <WorkshopLink to="https://wloczykijki.pl/pl/p/Warsztaty-Zielone-druty-/2835" target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="12:00 - 13:00">
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
            width={120}
          />

          <TextContent>
            <TextH2>{t('workshops.firstAid')}</TextH2>
            <SoldOutInfo>{t('scheduleBand.soldOut')}</SoldOutInfo>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="13:15 - 14:15">
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
            width={120}
          />

          <TextContent>
            <TextH2>{t('workshops.firstAid')}</TextH2>
            <Text>{t('workshops.price')}: 10zł</Text>
            <WorkshopLink to="https://wloczykijki.pl/pl/p/Warsztaty-Pierwsza-pomoc-/2834" target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="14:30 - 15:30">
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
            width={120}
          />

          <TextContent>
            <TextH2>{t('workshops.firstAid')}</TextH2>
            <Text>{t('workshops.price')}: 10zł</Text>
            <WorkshopLink to="https://wloczykijki.pl/pl/p/Warsztaty-Pierwsza-pomoc-/2834" target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="15:40 - 18:40">
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
            height={120}
          />

          <TextContent>
            <TextH2>{t('workshops.colorfulEmbroidery')}</TextH2>
            <Text>{t('workshops.price')}: 70zł</Text>
            <WorkshopLink to="https://wloczykijki.pl/pl/p/Warsztaty-Haft-krakowski-kolorowy/2836" target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>
      </Carousel>
    ),
    2: (
      <Carousel responsive={responsive} keyBoardControl rewindWithAnimation infinite>
        <PlannerCard time="9:00 - 12:00">
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
            width={120}
          />

          <TextContent>
            <TextH2>{t('workshops.knitolog.topic')}</TextH2>
            <SoldOutInfo>{t('scheduleBand.soldOut')}</SoldOutInfo>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="12:10 - 15:10">
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
            width={120}
          />

          <TextContent>
            <SmallTextH2>{t('workshops.freeYourIdeas.topic')}</SmallTextH2>
            <Text>{t('workshops.price')}: 150zł</Text>
            <WorkshopLink to="https://wloczykijki.pl/pl/p/Warsztaty-Uwolnij-pomysly-/2840" target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="15:20 - 18:20">
          <Picture
            picture={{
              fallbackUrl: labolensUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: labolensUrlWebp
                },
                {
                  type: 'image/avif',
                  url: labolensUrlAvif
                }
              ]
            }}
            alt="labolens"
            width={120}
          />

          <TextContent>
            <SmallTextH2>{t('workshops.labolens.title')}</SmallTextH2>
            <Text>{t('workshops.price')}: 130zł</Text>
            <WorkshopLink
              to="https://wloczykijki.pl/pl_PL/p/Warsztaty-Uchwyc-piekno-rekodziela-w-obiektywie-warsztaty-z-fotografii-produktowej/2838?preview=true"
              target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>
      </Carousel>
    ),
    3: (
      <Carousel responsive={responsive} keyBoardControl rewindWithAnimation infinite>
        <PlannerCard time="9:15 - 12:15">
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
            width={120}
          />

          <TextContent>
            <TextH2>{t('workshops.decorativeKnitting')}</TextH2>
            <Text>{t('workshops.price')}: 100zł</Text>
            <WorkshopLink to="https://wloczykijki.pl/pl/p/Warsztaty-Dzianiny-ozdobne/2842" target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="12:25 - 15:25">
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
            width={120}
          />

          <TextContent>
            <TextH2>{t('workshops.woolEmbroidery')}</TextH2>
            <SoldOutInfo>{t('scheduleBand.soldOut')}</SoldOutInfo>
          </TextContent>
        </PlannerCard>

        <PlannerCard time="15:35 - 18:45">
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
            width={120}
          />

          <TextContent>
            <TextH2>{t('workshops.raffia')}</TextH2>
            <Text>{t('workshops.price')}: 150zł</Text>
            <WorkshopLink to="https://wloczykijki.pl/pl/p/Warsztaty-Szydelkowanie-z-rafii-/2841" target="_blank">
              {t('workshops.buyTicket')}
            </WorkshopLink>
          </TextContent>
        </PlannerCard>
      </Carousel>
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
