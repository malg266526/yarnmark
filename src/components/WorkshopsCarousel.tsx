import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { Text } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import PierwszaPomocUrlAvif from './../assets/images/workshops/pierwszapomoc.avif';
import PierwszaPomocUrl from './../assets/images/workshops/pierwszapomoc.jpg';
import PierwszaPomocUrlWebp from './../assets/images/workshops/pierwszapomoc.webp';
import { Picture } from './Picture';
import { Title } from './Title';

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

/* const Title = styled.div`
  width: 1000px;
  height: 500px;
  background-color: pink;
`; */

export const WorkshopsCarousel = () => {
  const t = useTypedTranslation();

  return (
    <Root>
      <Carousel interval={90000} variant="dark">
        <Carousel.Item>
          <Item>
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
              alt="pierwszapomoc"
              width={180}
            />

            <Carousel.Caption>
              <Title>{t('workshops.firstAid')}</Title>
              <Text>{t('workshops.firstAidDescription')}</Text>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>

        <Carousel.Item>
          <Item>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Item>
        </Carousel.Item>
      </Carousel>
    </Root>
  );
};
