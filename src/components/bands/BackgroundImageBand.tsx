import styled, { css } from 'styled-components';
import React, { ReactNode } from 'react';
import { PictureType } from '../Picture';
import { FullSizePicture } from '../FullSizePicture';
import { Spacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';

type BandSize = 'xl' | 'md' | 'sm' | 'xs' | 'lg';

const bandSizeToHeight: Record<BandSize, string> = {
  xl: '1000px',
  lg: '750px',
  md: '600px',
  sm: '450px',
  xs: '300px'
};

const BandRootLayout = styled.div<{
  padding?: keyof typeof Spacings;
  size?: BandSize;
  justify?: Justify;
  align?: Align;
}>`
  width: 100%;
  display: flex;
  position: relative;

  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};

  ${({ size }) =>
    size &&
    css`
      min-height: ${bandSizeToHeight[size]};

      @media (max-width: ${ScreenSize.phone}) {
        min-height: initial;
      }
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding: ${Spacings[padding]};

      @media (max-width: ${ScreenSize.tablet}) {
        padding: ${Spacings.md} ${Spacings.md};
      }

      @media (max-width: ${ScreenSize.phone}) {
        padding: ${Spacings.md} 0;
      }
    `};
`;

// TODO: check if possible to have one base with common/base props for all types of bands
type Justify = 'center' | 'space-around' | 'space-between' | 'flex-start' | 'space-evenly' | 'flex-end';
type Align = 'center' | 'flex-start' | 'flex-end';

interface BackgroundBand {
  id?: string;
  children?: ReactNode;
  picture: PictureType & {
    alt: string;
  };
  // TODO: check if needed - maybe should be unified?
  padding?: keyof typeof Spacings;
  size?: BandSize;
  justify?: Justify;
  align?: Align;
}

export const BackgroundImageBand = ({ id, children, picture, ...styles }: BackgroundBand) => {
  return (
    <BandRootLayout id={id} {...styles}>
      <FullSizePicture>
        {picture.sources?.map(({ type, url }, index) => <source key={index} srcSet={url} type={type} />)}
        <img src={picture.fallbackUrl} alt={picture.alt} />
      </FullSizePicture>

      {children}
    </BandRootLayout>
  );
};
