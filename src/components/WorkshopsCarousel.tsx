import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { Text } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import HaftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import HaftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import HaftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';
import LudArtUrlAvif from './../assets/images/workshops/ludart.avif';
import LudArtUrl from './../assets/images/workshops/ludart.jpg';
import LudArtUrlWebp from './../assets/images/workshops/ludart.webp';
import WoolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import WoolankaUrl from './../assets/images/workshops/woolanka.jpg';
import WoolankaUrlWebp from './../assets/images/workshops/woolanka.webp';
import { FlexColumnLayout } from './FlexColumnLayout';
import { Picture } from './Picture';
import { Title } from './Title';

const Root = styled.div`
  width: 100%;
  padding: 0 ${Spacings.xl};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
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
              alt="knitolog"
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
      </Carousel>
    </Root>
  );
};
