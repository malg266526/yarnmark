import React, { ReactNode } from 'react';
import { BandRootLayout, BandSize, Justify } from './BandRootLayout';
import { BandTitle, SecondaryBandTitle } from './BandTitle';
import { BackgroundImageBand } from './BackgroundImageBand';
import { SolidBackgroundBand } from './SolidBackgroundBand';
import { RedesignSpacings } from '../../styles/spacings';

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
  padding?: keyof typeof RedesignSpacings;
  gap?: keyof typeof RedesignSpacings;
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

const SolidBand = ({ id, color, ...props }: CenteredColumnBandProps) => (
  <SolidBackgroundBand id={id} color={color} align="center" {...props} />
);

interface EmptyBandProps {
  id: string;
  children?: ReactNode;
  justify?: Justify;
  color?: string;
  padding?: keyof typeof RedesignSpacings;
}

const EmptyBand = ({ id, color, padding, ...props }: EmptyBandProps) => (
  <SolidBackgroundBand
    id={id}
    color={color || 'white'}
    size="md"
    direction="column"
    align="flex-start"
    padding={padding || 'xl'}
    {...props}
  />
);

interface BandProps {
  children?: React.ReactNode;
  size?: BandSize;
  id: string;
}

export const Band = Object.assign(({ children }: BandProps) => <BandRootLayout>{children}</BandRootLayout>, {
  Title: BandTitle,
  SecondaryTitle: SecondaryBandTitle,
  Wallpaper: WallPaperBand,
  CenteredColumn: CenteredColumnBand,
  NarrowColumn: NarrowColumnBand,
  Empty: EmptyBand,
  Solid: SolidBand
});
