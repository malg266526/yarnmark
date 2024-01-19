import styled, { css } from 'styled-components';

export const Curtain = styled.div<{ active?: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
  opacity: 0;
  transition:
    opacity 250ms ease-in-out,
    z-index 250ms ease-in-out;

  ${({ active }) =>
    active &&
    css`
      z-index: 10;
      opacity: 1;
    `};
`;
