import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { Text } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import HaftowaBabaUrlAvif from './../assets/images/workshops/haftowa.avif';
import HaftowaBabaUrl from './../assets/images/workshops/haftowa.jpg';
import HaftowaBabaUrlWebp from './../assets/images/workshops/haftowa.webp';
import { Picture } from './Picture';
import { Title } from './Title';
import { FlexColumnLayout } from './FlexColumnLayout';
import LudArtUrl from './../assets/images/workshops/ludart.jpg';
import LudArtUrlAvif from './../assets/images/workshops/ludart.avif';
import LudArtUrlWebp from './../assets/images/workshops/ludart.webp';
import WoolankaUrlAvif from './../assets/images/workshops/woolanka.avif';
import WoolankaUrl from './../assets/images/workshops/woolanka.jpg';
import WoolankaUrlWebp from './../assets/images/workshops/woolanka.webp';

const Root = styled.div``;

const Item = styled.div`
  width: 1000px;
  height: 500px;
  background-color: ${Colors.linen};
  color: black;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: ${Spacings.sm};
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
              <h3>LudArt - {t('workshops.colorfulEmbroidery')}</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
              <h3>{t('workshops.decorativeKnitting')}</h3>
              <p>{t('workshops.decorativeKnittingDescription')}</p>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>
      </Carousel>
    </Root>
  );
};
