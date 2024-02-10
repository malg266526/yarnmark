import React, { CSSProperties } from 'react';

export type PictureType = {
  fallbackUrl: string;
  sources?: { type: string; url: string }[];
};

type PictureProps = {
  width?: number;
  height?: number;
  alt: string;
  picture: PictureType;
  style?: CSSProperties;
};

export const Picture = ({ width, alt, picture, style, height }: PictureProps) => (
  <picture>
    {picture.sources?.map(({ type, url }, index) => <source key={index} srcSet={url} type={type} />)}

    <img width={width} height={height} src={picture.fallbackUrl} alt={alt} style={style} />
  </picture>
);
