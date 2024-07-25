import React, { ReactNode } from 'react';
import { BandRootLayout, BandSize, Justify } from './BandRootLayout';
import { BandTitle } from './BandTitle';
import { BackgroundImageBand } from './BackgroundImageBand';
import { SolidBackgroundBand } from './SolidBackgroundBand';
import { Spacings } from '../../styles/spacings';

interface WallpaperBand {
  id: string;
  children?: ReactNode;
  picture: ReactNode;
  size?: BandSize;
  justify?: Justify;
  direction?: 'column' | 'row';
}

const WallPaperBand = (props: WallpaperBand) => <BackgroundImageBand padding="xl" align="center" {...props} />;

interface CenteredColumnBandProps {
  id: string;
  children?: ReactNode;
  size?: BandSize;
  justify?: Justify;
  color: string;
  padding?: keyof typeof Spacings;
}

const CenteredColumnBand = ({ id, color, ...props }: CenteredColumnBandProps) => (
  <SolidBackgroundBand id={id} color={color} direction="column" align="center" {...props} />
);

const NarrowColumnBand = ({ id, color, ...props }: CenteredColumnBandProps) => (
  <SolidBackgroundBand
    id={id}
    color={color}
    direction="column"
    align="center"
    maxWidth="85%"
    justify="space-evenly"
    {...props}
  />
);

interface EmptyBandProps {
  id: string;
  children?: ReactNode;
  justify?: Justify;
  color: string;
}

const EmptyBand = ({ id, color, ...props }: EmptyBandProps) => (
  <SolidBackgroundBand id={id} color={color} size="md" direction="column" align="flex-start" padding="xl" {...props} />
);

interface BandProps {
  children?: React.ReactNode;
  size?: BandSize;
  id: string;
}

export const Band = Object.assign(({ children }: BandProps) => <BandRootLayout>{children}</BandRootLayout>, {
  Title: BandTitle,
  Wallpaper: WallPaperBand,
  CenteredColumn: CenteredColumnBand,
  NarrowColumn: NarrowColumnBand,
  Empty: EmptyBand
});
