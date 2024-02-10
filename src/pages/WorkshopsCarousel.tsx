import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Picture } from '../components/Picture';
import { Spacings } from '../styles/spacings';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { Text } from './MainPage.styled';

import haftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import haftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import haftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';

import woolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import woolankaUrl from './../assets/images/workshops/woolanka.jpg';
import woolankaUrlWebp from './../assets/images/workshops/woolanka.webp';

import raffiaUrlAvif from './../assets/images/workshops/rafia.avif';
import raffiaUrl from './../assets/images/workshops/rafia.jpg';
import raffiaUrlWebp from './../assets/images/workshops/rafia.webp';

import ludArtUrlAvif from './../assets/images/workshops/ludart.avif';
import ludArtUrl from './../assets/images/workshops/ludart.jpg';
import ludArtUrlWebp from './../assets/images/workshops/ludart.webp';

import knitologUrlAvif from './../assets/images/workshops/knitolog.avif';
import knitologUrl from './../assets/images/workshops/knitolog.jpg';
import knitologUrlWebp from './../assets/images/workshops/knitolog.webp';

import uwolnijPomyslyUrlAvif from './../assets/images/workshops/uwolnijpomysly.avif';
import uwolnijPomyslyUrl from './../assets/images/workshops/uwolnijpomysly.jpg';
import uwolnijPomyslyWebp from './../assets/images/workshops/uwolnijpomysly.webp';

import doRanyPrzylozUrlAvif from './../assets/images/workshops/doranyprzyloz.avif';
import doRanyPrzylozUrl from './../assets/images/workshops/doranyprzyloz.jpg';
import doRanyPrzylozUrlWebp from './../assets/images/workshops/doranyprzyloz.webp';

import ewaUrlAvif from './../assets/images/workshops/ewa.avif';
import ewaUrl from './../assets/images/workshops/ewa.jpg';

import knittingSvgUrl from '../assets/images/skein3.svg';
import { useTablet } from './usePhone';
import { ScreenSize } from '../styles/screeen-size';

export const Title = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin: 0;
`;

const Root = styled.div`
  display: inline-block;
  width: 90%;
  box-shadow: 2px 2px 15px 0px rgba(121, 59, 59, 0.25);
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
  border-radius: 4px;
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

  @media (max-width: ${ScreenSize.tablet}) {
    font-size: 12px;
  }
`;

const ExtraCaption = styled(Text)`
  @media (max-width: ${ScreenSize.tablet}) {
    font-size: 12px;
  }
`;

const Column = styled(FlexColumnLayout)`
  width: 50%;

  @media (max-width: ${ScreenSize.tablet}) {
    width: 100%;
  }
`;

const AdjustableContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;

  @media (max-width: ${ScreenSize.smallPc}) {
    flex-direction: column;
  }
`;

const ReverseContent = styled(AdjustableContent)`
  flex-direction: row-reverse;
  gap: ${Spacings.lg};
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${ScreenSize.smallPc}) {
    height: 300px;
    overflow-y: scroll;
  }
`;

export const WorkshopsCarousel = () => {
  const t = useTypedTranslation();
  const isTablet = useTablet();

  const mobileStyle = {
    opacity: '0.27',
    position: 'absolute' as const,
    top: '5%',
    left: '50%',
    transform: 'translateX(-50%)'
  };
  const logoStyle = isTablet ? mobileStyle : undefined;

  return (
    <BlobBackground>
      <Root>
        <Carousel
          interval={50000}
          variant="dark"
          fade
          prevIcon={<img src={knittingSvgUrl} alt="knittingIcon" width={40} />}
          nextIcon={<img src={knittingSvgUrl} alt="knittingIcon" width={40} style={{ transform: 'scaleX(-1)' }} />}>
          <Carousel.Item>
            <Item>
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
                width={180}
                style={isTablet ? mobileStyle : { opacity: '0.47' }}
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
                width={180}
                style={logoStyle}
              />

              <Carousel.Caption>
                <Title>LudArt - {t('workshops.colorfulEmbroidery')}</Title>
                <h4>{t('workshops.colorfulEmbroideryInspirations')}</h4>
                <NoTopMarginText></NoTopMarginText>
              </Carousel.Caption>
            </Item>
          </Carousel.Item>

          <Carousel.Item>
            <Item>
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
                width={180}
                style={logoStyle}
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
                alt="raffiaBasics"
                width={180}
                style={isTablet ? mobileStyle : { opacity: '0.47' }}
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
                <ReverseContent>
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
                    width={180}
                    style={logoStyle}
                  />

                  <div>
                    <Title>{t('workshops.knitolog.topic')}</Title>
                    <h4>{t('workshops.knitolog.subtopic')}</h4>
                  </div>
                </ReverseContent>

                <ScrollableContent>
                  <AdjustableContent>
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
                  </AdjustableContent>

                  <ExtraCaption marginTop="sm">{t('workshops.knitolog.pattern')}</ExtraCaption>
                </ScrollableContent>
              </Carousel.Caption>
            </Item>
          </Carousel.Item>

          <Carousel.Item>
            <Item>
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
                width={180}
                style={isTablet ? mobileStyle : { opacity: '0.47' }}
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
                width={180}
                style={isTablet ? mobileStyle : { opacity: '0.47' }}
              />

              <Carousel.Caption>
                <Title>{t('workshops.doRanyPrzyloz.topic')}</Title>
                <FlexColumnLayout gap="xs" padding="none">
                  <NoTopMarginText>{t('workshops.doRanyPrzyloz.intro')}</NoTopMarginText>
                  <NoTopMarginText>{t('workshops.doRanyPrzyloz.macrame')}</NoTopMarginText>
                  <NoTopMarginText>{t('workshops.doRanyPrzyloz.macrameOnTheHoop')}</NoTopMarginText>
                  <NoTopMarginText>{t('workshops.doRanyPrzyloz.example')}</NoTopMarginText>
                  <NoTopMarginText>{t('workshops.doRanyPrzyloz.forBeginners')}</NoTopMarginText>
                  <NoTopMarginText>{t('workshops.doRanyPrzyloz.invite')}</NoTopMarginText>
                </FlexColumnLayout>
              </Carousel.Caption>
            </Item>
          </Carousel.Item>

          <Carousel.Item>
            <Item>
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
                width={180}
                style={isTablet ? mobileStyle : { opacity: '0.47' }}
              />

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
