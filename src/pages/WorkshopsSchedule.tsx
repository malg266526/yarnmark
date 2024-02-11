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

import doRanyPrzylozUrlAvif from './../assets/images/workshops/doranyprzyloz.avif';
import doRanyPrzylozUrl from './../assets/images/workshops/doranyprzyloz.jpg';
import doRanyPrzylozUrlWebp from './../assets/images/workshops/doranyprzyloz.webp';

import Carousel from 'react-multi-carousel';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import ewaUrlAvif from './../assets/images/workshops/ewa.avif';
import ewaUrl from './../assets/images/workshops/ewa.jpg';
import { ScreenSize } from '../styles/screeen-size';

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

const PlannerCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  align-items: center;
  border: 2px solid darkgray;
  margin-top: ${Spacings.md};
  position: relative;
  box-shadow: 2px 2px 15px 0px rgba(121, 59, 59, 0.25);
  width: 300px;
  height: 360px;
  justify-content: space-between;

  @media (max-width: ${ScreenSize.phone}) {
    height: 358px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  background: linear-gradient(to top, ${Colors.veryLightWarm}, #fff);
  justify-content: space-around;
  width: 100%;
  padding-bottom: ${Spacings.md};
  align-items: center;
`;

export const TextH2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-top: ${Spacings.md};
  margin-bottom: 0;
  text-align: center;
`;

const SmallTextH2 = styled(TextH2)`
  font-size: 18px;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 0;
`;

/* const WorkshopLink = styled(Link)`
  font-size: 18px;
  padding: 0;
`; */

const Ribbon = styled.div`
  position: absolute;
  top: -28px;

  font-size: 18px;
  font-weight: bold;
  color: #fff;

  --r: 18px; /* control the ribbon shape */

  padding-inline: calc(var(--r) + ${Spacings.md});
  // line-height: 1.8;
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--r)) 50%, 100% 100%, 0 100%, var(--r) 50%);
  background: ${Colors.chocolate}; /* the main color */
  width: 75%;

  padding-top: ${Spacings.sm};
  padding-bottom: ${Spacings.sm};
  text-align: center;
`;

const ImageWrapper = styled.div`
  height: 50%;
  padding-top: 32px;
`;

export const WorkshopsSchedule = () => {
  const t = useTypedTranslation();

  const [activeRoom, setActiveRoom] = useState<WorkshopRoom>(1);

  const activeRoomToContent: Record<WorkshopRoom, ReactNode> = {
    1: (
      <Carousel responsive={reponsiveWhenMoreItems} keyBoardControl infinite>
        <PlannerCard>
          <Ribbon>
            <Text>9:00 - 10:30</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.ewa.topic')}</TextH2>
            <Text>{t('workshops.price')}: 30zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>10:30 - 12:00</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.ewa.topic')}</TextH2>
            <Text>{t('workshops.price')}: 30zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>12:00 - 13:00</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.firstAid')}</TextH2>
            <Text>{t('workshops.price')}: 10zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>13:15 - 14:15</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>
          <TextContent>
            <TextH2>{t('workshops.firstAid')}</TextH2>
            <Text>{t('workshops.price')}: 10zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>14:30 - 15:30</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.firstAid')}</TextH2>
            <Text>{t('workshops.price')}: 10zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>15:40 - 18:40</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.colorfulEmbroidery')}</TextH2>
            <Text>{t('workshops.price')}: 70zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>
      </Carousel>
    ),
    2: (
      <Carousel responsive={responsive} keyBoardControl rewindWithAnimation infinite>
        <PlannerCard>
          <Ribbon>
            <Text>9:00 - 12:00</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.knitolog.topic')}</TextH2>
            <Text>{t('workshops.price')}: 150zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>12:10 - 15:10</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <SmallTextH2>{t('workshops.freeYourIdeas.topic')}</SmallTextH2>
            <Text>{t('workshops.price')}: 150zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>15:20 - 18:20</Text>
          </Ribbon>

          <ImageWrapper>
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
              width={120}
            />
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.doRanyPrzyloz.topic')}</TextH2>
            <Text>{t('workshops.price')}: 130zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>
      </Carousel>
    ),
    3: (
      <Carousel responsive={responsive} keyBoardControl rewindWithAnimation infinite>
        <PlannerCard>
          <Ribbon>
            <Text>9:15 - 12:15</Text>
          </Ribbon>
          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.decorativeKnitting')}</TextH2>
            <Text>{t('workshops.price')}: 100zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>12:25 - 15:25</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.woolEmbroidery')}</TextH2>
            <Text>{t('workshops.price')}: 150zł</Text>
            {/*           <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
          </TextContent>
        </PlannerCard>

        <PlannerCard>
          <Ribbon>
            <Text>15:35 - 18:45</Text>
          </Ribbon>

          <ImageWrapper>
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
          </ImageWrapper>

          <TextContent>
            <TextH2>{t('workshops.raffia')}</TextH2>
            <Text>{t('workshops.price')}: 150zł</Text>
            {/*             <WorkshopLink to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">
              {t('workshops.buyTicket')}
            </WorkshopLink> */}
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
