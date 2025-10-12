import styled, { css } from 'styled-components';

type ObjectFit = 'cover' | 'contain' | 'unset';

// TODO: FullSizePicture & Picture - consider unification or some other solution

export const BackgroundPicture = styled.picture<{
  size?: `${number}%` | `${number}px`;
  filter?: string;
  opacity?: number;
  objectFit?: ObjectFit;
}>`
  position: absolute;
  left: ${({ size }) => (size ? 'unset' : 0)};
  top: ${({ size }) => (size ? 'unset' : 0)};
  width: ${({ size }) => size || '100%'};
  max-width: ${({ size }) => size || '100%'};
  height: ${({ size }) => (size ? '90%' : '100%')};
  max-height: 100%;
  z-index: 0;

  > img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: ${({ objectFit }) => objectFit || 'cover'};
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
