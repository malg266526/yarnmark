import styled from "styled-components";
import { RedesignSpacings } from "../styles/spacings";

export const RowLayout = styled.div<{
  wide?: boolean;
  gap?: keyof typeof RedesignSpacings;
  justify?: "center" | "space-evenly" | "space-between";
  align?: "center" | "flex-start";
}>`
  width: ${({ wide }) => (wide ? "100%" : "initial")};

  display: flex;
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "space-evenly"};
  gap: ${({ gap }) => RedesignSpacings[gap || "sm"]};
`;
