import React from 'react';
import styled from 'styled-components';
import { HallColors } from '../styles/theme';

const LogoWrapper = styled.div<{ color?: keyof typeof HallColors }>`
  width: 36px;
  height: 36px;
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
};

export const HallLogo = ({ src, alt }: HallLogoProps) => {
  if (!src) {
    return;
  }

  return (
    <LogoWrapper>
      <Image src={src} alt={alt} />
    </LogoWrapper>
  );
};
