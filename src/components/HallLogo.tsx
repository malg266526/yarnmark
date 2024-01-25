import React from 'react';
import styled from 'styled-components';
import { HallColors } from '../styles/theme';

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
  src?: string;
  alt?: string;
  avifUrl?: string;
  webpUrl?: string;
};

export const HallLogo = ({ src, alt, avifUrl, webpUrl }: HallLogoProps) => {
  if (!src) {
    return;
  }

  return (
    <LogoWrapper>
      <picture>
        {avifUrl && <source srcSet={avifUrl} type="image/avif" />}
        {webpUrl && <source srcSet={webpUrl} type="image/webp" />}
        <Image src={src} alt={alt} />
      </picture>
    </LogoWrapper>
  );
};
