import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { Text } from './MainPage.styled';
import { Spacings } from '../styles/spacings';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Picture } from '../components/Picture';

import HaftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import HaftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import HaftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';

import WoolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import WoolankaUrl from './../assets/images/workshops/woolanka.jpg';
import WoolankaUrlWebp from './../assets/images/workshops/woolanka.webp';

import RaffiaUrlAvif from './../assets/images/workshops/rafia.avif';
import RaffiaUrl from './../assets/images/workshops/rafia.jpg';
import RaffiaUrlWebp from './../assets/images/workshops/rafia.webp';

import LudArtUrlAvif from './../assets/images/workshops/ludart.avif';
import LudArtUrl from './../assets/images/workshops/ludart.jpg';
import LudArtUrlWebp from './../assets/images/workshops/ludart.webp';

import KnitologUrlAvif from './../assets/images/workshops/knitolog.avif';
import KnitologUrl from './../assets/images/workshops/knitolog.jpg';
import KnitologUrlWebp from './../assets/images/workshops/knitolog.webp';

import UwolnijPomyslyUrlAvif from './../assets/images/workshops/uwolnijpomysly.avif';
import UwolnijPomyslyUrl from './../assets/images/workshops/uwolnijpomysly.jpg';
import UwolnijPomyslyWebp from './../assets/images/workshops/uwolnijpomysly.webp';

import DoRanyPrzylozUrlAvif from './../assets/images/workshops/doranyprzyloz.avif';
import DoRanyPrzylozUrl from './../assets/images/workshops/doranyprzyloz.jpg';
import DoRanyPrzylozUrlWebp from './../assets/images/workshops/doranyprzyloz.webp';

import { RowLayout } from '../components/RowLayout';

import knittingSvgUrl from '../assets/images/skein3.svg';

export const Title = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin: 0;
`;

const Root = styled.div`
  display: inline-block;
  width: 90%;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  border: 1px solid darkgray;
  align-self: center;
  background-color: white;
  z-index: 2;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 600px;
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: ${Spacings.lg} ${Spacings.md} ${Spacings.md} ${Spacings.md};
  align-items: center;
  position: relative;
`;

const BlobBackground = styled.div`
  width: 100%;
  text-align: center;
`;

const NoTopMarginText = styled(Text)`
  margin-top: 0;
`;

const Column = styled(FlexColumnLayout)`
  width: 50%;
`;

export const WorkshopsCarousel = () => {
  const t = useTypedTranslation();

  return (
    <BlobBackground>
      <Root>
        <Carousel
          interval={2000}
          variant="dark"
          fade
          prevIcon={<img src={knittingSvgUrl} alt="knittingIcon" width={40} />}
          nextIcon={<img src={knittingSvgUrl} alt="knittingIcon" width={40} style={{ transform: 'scaleX(-1)' }} />}>
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
              <Carousel.Caption>
                <RowLayout wide>
                  <div>
                    <Title>{t('workshops.knitolog.topic')}</Title>
                    <h4>{t('workshops.knitolog.subtopic')}</h4>
                  </div>

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
                    //style={{ opacity: '0.75' }}
                  />
                </RowLayout>

                <RowLayout wide>
                  <Column gap="none" padding="none">
                    <NoTopMarginText bold>{t('workshops.knitolog.plan')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.lesson1')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.lesson2')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.lesson3')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.lesson4')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.lesson5')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.lesson6')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.lesson7')}</NoTopMarginText>
                  </Column>

                  <Column gap="xs" padding="none">
                    <NoTopMarginText bold>{t('workshops.knitolog.materialsNeeded')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.wool')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.knittingNeedles')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.markers')}</NoTopMarginText>
                    <NoTopMarginText>- {t('workshops.knitolog.pinMarkers')}</NoTopMarginText>
                  </Column>
                </RowLayout>

                <Text marginTop="sm">{t('workshops.knitolog.pattern')}</Text>
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
              <Carousel.Caption>
                <Title>{t('workshops.ewa.topic')}</Title>
                <FlexColumnLayout gap="xs" padding="none">
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
    </BlobBackground>
  );
};
