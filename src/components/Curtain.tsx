import styled, { css } from 'styled-components';

export const Curtain = styled.div<{ active?: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 101;
  opacity: 0;
  pointer-events: none;
  transition: opacity 250ms ease-in-out;

  ${({ active }) =>
    active &&
    css`
      pointer-events: auto;
      opacity: 1;
    `};
`;
