import styled from "styled-components";

export const Card = styled.div<{
  flexDirection?: "row" | "column";
  width?: `${number}%` | `${number}px`;
  height?: `${number}%` | `${number}px`;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  display: flex;
  flex-direction: ${({ flexDirection: direction }) => direction || "column"};

  background-color: white;
  align-items: center;

  border-radius: 18px;
  box-shadow: 2px 2px 15px 0px rgba(121, 59, 59, 0.25);
`;
