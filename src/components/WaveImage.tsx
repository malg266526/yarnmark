import React from 'react';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import wave from '../assets/images/wave_copy.svg';
import styled from 'styled-components';

/* const Root = styled.div<{ width?: string }>`
  width: ${({ width }) => width || 'initial'};
`;

type WaveImageType = {
  width?: string;
}; */

const MaskedImage = styled.img`
  object-fit: cover;

  mask-image: url(${wave});
  mask-repeat: no-repeat;
  mask-size: contain;
  max-width: 100%;
  mask-position: bottom;
  height: 140px;
  width: 100%;
`;

export const WaveImage = () => <MaskedImage src={woolsWebpLandscape} />;
