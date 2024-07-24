import React, { ReactNode } from 'react';
import { Spacings } from '../../styles/spacings';
import { Align, BandRootLayout, BandSize, Justify } from './BandRootLayout';

interface BackgroundBand {
  id: string;
  children?: ReactNode;
  picture: ReactNode;
  // TODO: check if needed - maybe should be unified?
  padding?: keyof typeof Spacings;
  size?: BandSize;
  justify?: Justify;
  align?: Align;
  direction?: 'column' | 'row';
}

// TODO: direction, justify and align seems like too much; ideally we would like to do smthing else i guess <- from code review
export const BackgroundImageBand = ({ id, children, picture, direction, ...styles }: BackgroundBand) => {
  return (
    <BandRootLayout id={id} direction={direction} {...styles}>
      {picture}

      {children}
    </BandRootLayout>
  );
};
