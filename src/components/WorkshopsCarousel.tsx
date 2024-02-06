import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { Text } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { FlexColumnLayout } from './FlexColumnLayout';
import { Picture } from './Picture';
import { Title } from './Title';

import HaftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import HaftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import HaftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';

import WoolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import WoolankaUrl from './../assets/images/workshops/woolanka.jpg';
import WoolankaUrlWebp from './../assets/images/workshops/woolanka.webp';

import RaffiaUrlAvif from './../assets/images/workshops/rafia.avif';
import RaffiaUrl from './../assets/images/workshops/rafia.jpg';
import RaffiaUrlWebp from './../assets/images/workshops/rafia.webp';

import LudArtUrl from './../assets/images/workshops/ludart.jpg';
import LudArtUrlAvif from './../assets/images/workshops/ludart.avif';
import LudArtUrlWebp from './../assets/images/workshops/ludart.webp';

import KnitologUrl from './../assets/images/workshops/knitolog.jpg';
import KnitologUrlAvif from './../assets/images/workshops/knitolog.avif';
import KnitologUrlWebp from './../assets/images/workshops/knitolog.webp';

import UwolnijPomyslyUrl from './../assets/images/workshops/uwolnijpomysly.jpg';
import UwolnijPomyslyUrlAvif from './../assets/images/workshops/uwolnijpomysly.avif';
import UwolnijPomyslyWebp from './../assets/images/workshops/uwolnijpomysly.webp';

import DoRanyPrzylozUrl from './../assets/images/workshops/doranyprzyloz.jpg';
import DoRanyPrzylozUrlAvif from './../assets/images/workshops/doranyprzyloz.avif';
import DoRanyPrzylozUrlWebp from './../assets/images/workshops/doranyprzyloz.webp';

const Root = styled.div`
  width: 100%;
  padding: 0 ${Spacings.xl};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 500px;
  background-color: white;
  color: black;
  border-radius: 2px;
  padding: ${Spacings.sm};
  padding-top: ${Spacings.lg};
  align-items: center;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  //justify-content: space-evenly;
`;

const NoTopMarginText = styled(Text)`
  margin-top: 0;
`;

export const WorkshopsCarousel = () => {
  const t = useTypedTranslation();

  return (
    <Root>
      <Carousel interval={90000} variant="dark">
        <Carousel.Item>
          <Item>
            <Picture
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
              width={180}
            />

            <Carousel.Caption>
              <Title>Haftowa Baba</Title>
              <FlexColumnLayout gap="xs" padding="none">
                <NoTopMarginText>{t('workshops.haftowaBabaDescription1')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.haftowaBabaDescription2')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.haftowaBabaDescription3')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.haftowaBabaDescription4')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.haftowaBabaDescription5')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.haftowaBabaDescription6')}</NoTopMarginText>
              </FlexColumnLayout>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
            <Picture
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
              width={180}
            />

            <Carousel.Caption>
              <Title>LudArt - {t('workshops.colorfulEmbroidery')}</Title>
              <h4>{t('workshops.colorfulEmbroideryInspirations')}</h4>
              <NoTopMarginText>Nulla vitae elit libero, a pharetra augue mollis interdum.</NoTopMarginText>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
            <Picture
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
              width={180}
            />

            <Carousel.Caption>
              <Title>{t('workshops.decorativeKnitting')}</Title>
              <NoTopMarginText>{t('workshops.decorativeKnittingDescription')}</NoTopMarginText>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
            <Picture
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
              alt="raffiaBasics"
              width={180}
            />

            <Carousel.Caption>
              <Title>{t('workshops.raffia')}</Title>
              <FlexColumnLayout gap="xs" padding="none">
                <NoTopMarginText>{t('workshops.raffiaDescription')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.raffiaNeededMaterials')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.raffiaGptex')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.raffiaCrochet')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.raffiaStrap')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.raffiaBifernoDiscount')}</NoTopMarginText>
              </FlexColumnLayout>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
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
              width={180}
            />

            <Carousel.Caption>
              <Title>{t('workshops.knitolog.topic')}</Title>
              <FlexColumnLayout gap="xs" padding="none">
                <NoTopMarginText>{t('workshops.knitolog.plan')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.lesson1')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.lesson2')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.lesson3')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.lesson4')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.lesson5')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.lesson6')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.lesson7')}</NoTopMarginText>

                <NoTopMarginText>{t('workshops.knitolog.pattern')}</NoTopMarginText>
                <NoTopMarginText bold>{t('workshops.knitolog.materialsNeeded')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.wool')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.knittingNeedles')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.markers')}</NoTopMarginText>
                <NoTopMarginText>- {t('workshops.knitolog.pinMarkers')}</NoTopMarginText>
              </FlexColumnLayout>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
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
              width={180}
            />

            <Carousel.Caption>
              <Title>{t('workshops.freeYourIdeas.topic')}</Title>
              <FlexColumnLayout gap="xs" padding="none">
                <NoTopMarginText>{t('workshops.freeYourIdeas.description')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.freeYourIdeas.booklet')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.freeYourIdeas.takeFreeMind')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.freeYourIdeas.seeYou')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.freeYourIdeas.meetMe')}</NoTopMarginText>
              </FlexColumnLayout>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
            <Picture
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
              width={180}
            />

            <Carousel.Caption>
              <Title>doranyprzyloz</Title>
              <FlexColumnLayout gap="xs" padding="none"></FlexColumnLayout>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
            {/* <Picture
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
              alt="zielonedruty"
              width={180}
            /> */}

            <Carousel.Caption>
              <Title>{t('workshops.ewa.topic')}</Title>
              <FlexColumnLayout gap="md" padding="none">
                <NoTopMarginText>{t('workshops.ewa.misteries')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.ewa.plan')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.ewa.debugging')}</NoTopMarginText>
                <NoTopMarginText>{t('workshops.ewa.forBeginners')}</NoTopMarginText>
              </FlexColumnLayout>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>
      </Carousel>
    </Root>
  );
};
