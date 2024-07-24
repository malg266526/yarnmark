import styled, { css } from 'styled-components';

type ObjectFit = 'cover' | 'contain';

export const FullSizePicture = styled.picture<{ filter?: string; opacity?: number; objectFit?: ObjectFit }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: fill;
  object-position: center;
  z-index: -1;

  > img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: ${({ objectFit }) => objectFit || 'fill'};
  }

  ${({ filter }) =>
    filter &&
    css`
      filter: ${filter};
    `};

  ${({ opacity }) =>
    Number.isFinite(opacity) &&
    css`
      opacity: ${opacity};
    `};
`;
