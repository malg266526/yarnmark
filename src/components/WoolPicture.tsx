import { BackgroundPicture } from './BackgroundPicture';
import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import woolsJpgLandscape from '../assets/images/wools2_landscape.jpg';
import React from 'react';

export const WoolPicture = () => (
  <BackgroundPicture>
    <source srcSet={woolsAvifLandscape} type="image/avif" />
    <source srcSet={woolsWebpLandscape} type="image/avif" />

    <img loading="lazy" src={woolsJpgLandscape} alt="wool skeins" />
  </BackgroundPicture>
);
