import React from 'react';
import styled from 'styled-components';
import { Picture, PictureType } from './Picture';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
      <Picture picture={picture} alt={alt} width={100} />
    </Root>
  );
};
