import React from 'react';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';

/* const Root = styled.div<{ width?: string }>`
  width: ${({ width }) => width || 'initial'};
`;

type WaveImageType = {
  width?: string;
}; */

export const WaveImage = () => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <clipPath id="clip-wave">
            <path
              fill="#00468b"
              fillOpacity="1"
              d="M0,32L24,74.7C48,117,96,203,144,213.3C192,224,240,160,288,117.3C336,75,384,53,432,69.3C480,85,528,139,576,154.7C624,171,672,149,720,128C768,107,816,85,864,74.7C912,64,960,64,1008,101.3C1056,139,1104,213,1152,202.7C1200,192,1248,96,1296,96C1344,96,1392,192,1416,240L1440,288L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
          </clipPath>
        </defs>
      </svg>

      <img
        style={{ clipPath: 'url(#clip-wave)', maxWidth: '100%' }}
        src={woolsWebpLandscape}
        // width="400"
      />
    </div>
  );
};
