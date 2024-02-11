import React from 'react';
import styled from 'styled-components';
import { PictureType } from './Picture';

export const Image = styled.img`
  object-fit: contain;
`;

type HallLogoProps = {
  picture?: PictureType;
  alt?: string;
  width?: number;
};

export const HallLogo = ({ picture, alt, width }: HallLogoProps) => {
  if (!picture?.fallbackUrl) {
    return;
  }

  return (
    <picture>
      {picture.sources?.map(({ type, url }, index) => <source key={index} srcSet={url} type={type} />)}
      <Image src={picture.fallbackUrl} alt={alt} width={width || 36} />
    </picture>
  );
};
