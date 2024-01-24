import React from 'react';

type MinifiedLogoProps = {
  width?: number;
  alt: string;
  avifUrl: string;
  webpUrl: string;
  jpgUrl: string;
};

export const MinifiedLogo = ({ width, alt, avifUrl, webpUrl, jpgUrl }: MinifiedLogoProps) => (
  <picture>
    <source srcSet={avifUrl} type="image/avif" />
    <source srcSet={webpUrl} type="image/webp" />
    <img width={width} src={jpgUrl} alt={alt} />
  </picture>
);
