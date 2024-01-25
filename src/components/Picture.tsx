import React from 'react';

export type PictureType = {
  fallbackUrl: string;
  sources?: { type: string; url: string }[];
};

type PictureProps = {
  width?: number;
  alt: string;
  picture: PictureType;
};

export const Picture = ({ width, alt, picture }: PictureProps) => (
  <picture>
    {picture.sources?.map(({ type, url }, index) => <source key={index} srcSet={url} type={type} />)}

    <img width={width} src={picture.fallbackUrl} alt={alt} />
  </picture>
);
