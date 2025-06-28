import React, { CSSProperties } from 'react';

export type PictureType = {
  fallbackUrl: string;
  sources?: { type: string; url: string }[];
};

type PictureProps = {
  width?: `${number}%` | `${number}px` | number;
  height?: number;
  alt: string;
  picture: PictureType;
  style?: CSSProperties;
  pictureStyle?: CSSProperties;
  className?: string;
};

export const Picture = ({ width, alt, picture, style, height, pictureStyle, className }: PictureProps) => (
  <picture style={pictureStyle} className={className}>
    {picture.sources?.map(({ type, url }, index) => <source key={index} srcSet={url} type={type} />)}

    <img width={width} height={height} src={picture.fallbackUrl} alt={alt} style={style} />
  </picture>
);
