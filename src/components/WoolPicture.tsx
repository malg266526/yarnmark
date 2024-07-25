import { FullSizePicture } from './FullSizePicture';
import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import woolsJpgLandscape from '../assets/images/wools2_landscape.jpg';
import React from 'react';

export const WoolPicture = () => (
  <FullSizePicture>
    <source srcSet={woolsAvifLandscape} type="image/avif" />
    <source srcSet={woolsWebpLandscape} type="image/avif" />

    <img loading="lazy" src={woolsJpgLandscape} alt="wool skeins" />
  </FullSizePicture>
);
