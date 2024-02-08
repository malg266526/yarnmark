import React, { CSSProperties } from 'react';

export type PictureType = {
  fallbackUrl: string;
  sources?: { type: string; url: string }[];
};

type PictureProps = {
  width?: number;
  alt: string;
  picture: PictureType;
  style?: CSSProperties;
};

export const Picture = ({ width, alt, picture, style }: PictureProps) => (
  <picture>
    {picture.sources?.map(({ type, url }, index) => <source key={index} srcSet={url} type={type} />)}

    <img width={width} src={picture.fallbackUrl} alt={alt} style={style} />
  </picture>
);
