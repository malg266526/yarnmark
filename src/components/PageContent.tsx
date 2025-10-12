import styled from "styled-components";
import { RedesignSpacings } from "../styles/spacings";
import { Theme } from "../styles/theme";

export const PageContent = styled.div<{
  variant: "wide" | "narrow";
  padding?: "none";
}>`
  width: ${({ variant }) =>
    variant === "narrow" ? Theme.pageContentWidth : "100%"};
  max-width: 100%;

  display: flex;
  flex-direction: column;

  align-self: center;
  align-items: center;

  padding: ${({ padding }) => (padding === "none" ? 0 : RedesignSpacings.xl)} 0;
`;
