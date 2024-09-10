import { BackgroundPicture } from './BackgroundPicture';
import woolsAvifLandscape from '../assets/images/wools.avif';
import woolsWebpLandscape from '../assets/images/wools.webp';
import woolsJpgLandscape from '../assets/images/wools.jfif';
import React from 'react';

export const WoolPicture = () => (
  <BackgroundPicture>
    <source srcSet={woolsAvifLandscape} type="image/avif" />
    <source srcSet={woolsWebpLandscape} type="image/avif" />

    <img loading="lazy" src={woolsJpgLandscape} alt="wool skeins" />
  </BackgroundPicture>
);
