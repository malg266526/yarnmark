import styled from "styled-components";

export const Box = styled.div<{
  width: `${number}%` | `${number}px`;
  height?: `${number}%` | `${number}px`;
  color?: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ color }) => color};
`;
