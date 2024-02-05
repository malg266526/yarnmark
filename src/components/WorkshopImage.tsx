import React from 'react';
import { Picture, PictureType } from './Picture';
import styled from 'styled-components';

import JerseyUrl from './../assets/images/workshops/jersey.jpg';
import JerseyUrlAvif from './../assets/images/workshops/jersey.avif';
import JerseyUrlWebp from './../assets/images/workshops/jersey.webp';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  z-index: 20;
`;

const BACKGROUND_SIZE = '200px';

export const Background = styled.picture`
  position: absolute;
  width: ${BACKGROUND_SIZE};
  max-width: ${BACKGROUND_SIZE};
  height: ${BACKGROUND_SIZE};
  max-height: ${BACKGROUND_SIZE};
  z-index: 0;

  background-color: beige;

  > img {
    width: ${BACKGROUND_SIZE};
    height: ${BACKGROUND_SIZE};
    object-fit: cover;
  }
`;

type WorkshopImageProps = {
  alt: string;
  picture: PictureType;
};

export const WorkshopImage = ({ picture, alt }: WorkshopImageProps) => {
  return (
    <Root>
      <Background>
        <source srcSet={JerseyUrlAvif} type="image/avif" />
        <source srcSet={JerseyUrl} type="image/jpeg" />
        <img loading="lazy" src={JerseyUrlWebp} alt="jersey_background" />
      </Background>

      <LogoWrapper>
        <Picture picture={picture} alt={alt} width={180} />
      </LogoWrapper>
    </Root>
  );
};
