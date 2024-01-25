import React from 'react';
import styled from 'styled-components';
import { HallColors } from '../styles/theme';
import { PictureType } from './Picture';

const LogoWrapper = styled.div<{ color?: keyof typeof HallColors }>`
  width: 38px;
  height: 38px;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;

  object-fit: contain;
`;

type HallLogoProps = {
  picture?: PictureType;
  alt?: string;
};

export const HallLogo = ({ picture, alt }: HallLogoProps) => {
  if (!picture?.fallbackUrl) {
    return;
  }

  return (
    <LogoWrapper>
      <picture>
        {picture.sources?.map(({ type, url }, index) => <source key={index} srcSet={url} type={type} />)}
        <Image src={picture.fallbackUrl} alt={alt} />
      </picture>
    </LogoWrapper>
  );
};
