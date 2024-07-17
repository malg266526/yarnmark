import React from 'react';
import styled from 'styled-components';
import { PictureType } from './Picture';
import { usePhone } from '../hooks/usePhone';

export const Image = styled.img`
  object-fit: contain;
`;

type HallLogoProps = {
  picture?: PictureType;
  alt?: string;
  width?: number;
};

export const HallLogo = ({ picture, alt, width }: HallLogoProps) => {
  const isPhone = usePhone();

  if (!picture?.fallbackUrl) {
    return;
  }

  console.log('isPhone', isPhone);
  const logoWidth = isPhone ? 28 : width || 36;

  return (
    <picture>
      {picture.sources?.map(({ type, url }, index) => <source key={index} srcSet={url} type={type} />)}
      <Image src={picture.fallbackUrl} alt={alt} width={logoWidth} />
    </picture>
  );
};
