import styled from 'styled-components';

export const Box = styled.div<{ width?: string; height?: string; color?: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ color }) => color};
`;
