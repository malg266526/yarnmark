import styled, { css } from 'styled-components';

export const BackgroundPicture = styled.picture<{
  objectFit?: 'cover' | 'contain';
  filter?: string;
  objectPosition?: string;
  opacity?: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${({ opacity }) =>
    Number.isFinite(opacity) &&
    css`
      opacity: ${opacity};
    `};

  ${({ filter }) =>
    filter &&
    css`
      filter: ${filter};
    `};

  > img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    ${({ objectFit }) =>
      objectFit &&
      css`
        object-fit: ${objectFit};
      `};

    ${({ objectPosition }) =>
      objectPosition &&
      css`
        object-position: ${objectPosition};
      `};
  }
`;
