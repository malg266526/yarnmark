import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { Picture } from '../../../components/Picture';
import { Spacings } from '../../../styles/spacings';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { Text } from '../MainPage.styled';
import knittingSvgUrl from '../../../assets/images/skein3.svg';
import { RowLayout } from '../../../components/RowLayout';
import { FontSize } from '../../../styles/font-size';
import { ScreenSize } from '../../../styles/screeen-size';
import { useTablet } from '../../../hooks/usePhone';
import { DropShadow, Radius } from '../../../styles/cards';
import { CarouselConfig } from './carouselConfig';

export const Title = styled.h3`
  font-size: ${FontSize.xl};
  font-weight: 600;
  margin: 0;
`;

const Root = styled.div`
  display: inline-block;
  width: 90%;
  box-shadow: ${DropShadow.md};
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
  border-radius: ${Radius.lg};
  padding: ${Spacings.lg} ${Spacings.md} ${Spacings.md} ${Spacings.md};
  align-items: center;
  position: relative;
`;

const BlobBackground = styled.div`
  width: 100%;
  text-align: center;
`;

const ResponsiveText = styled(Text)`
  @media (max-width: ${ScreenSize.tablet}) {
    font-size: ${FontSize.md};
  }
`;

const NoTopMarginText = styled(ResponsiveText)`
  margin-top: 0;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 500px;
  overflow-y: auto;

  @media (max-width: ${ScreenSize.smallPc}) {
    max-height: 300px;
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
  const logoStyle = isTablet ? mobileStyle : { opacity: 0.9 };

  return (
    <BlobBackground>
      <Root>
        <Carousel
          interval={90000}
          variant="dark"
          fade
          prevIcon={<img src={knittingSvgUrl} alt="knittingIcon" width={40} height={40} />}
          nextIcon={
            <img src={knittingSvgUrl} alt="knittingIcon" width={40} height={40} style={{ transform: 'scaleX(-1)' }} />
          }>
          {CarouselConfig.map((workshop) => (
            <Carousel.Item key={workshop.title}>
              <Item>
                <Picture
                  picture={{
                    fallbackUrl: workshop.picture.fallback,
                    sources: workshop.picture.sources
                  }}
                  alt={workshop.tutor}
                  width={180}
                  height={180}
                  style={logoStyle}
                />

                <Carousel.Caption>
                  <Title>{t(workshop.title)}</Title>
                  <RowLayout justify="center" gap="none">
                    <NoTopMarginText>{t('workshops.tutor')} </NoTopMarginText>
                    <a href={workshop.instagramUrl} target="_blank" rel="noreferrer">
                      {workshop.tutor}
                    </a>
                  </RowLayout>

                  <ScrollableContent>
                    <ResponsiveText>{t(workshop.description)}</ResponsiveText>
                  </ScrollableContent>
                </Carousel.Caption>
              </Item>
            </Carousel.Item>
          ))}
        </Carousel>
      </Root>
    </BlobBackground>
  );
};
