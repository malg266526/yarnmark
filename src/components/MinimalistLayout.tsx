import styled from "styled-components";
import { ScreenSize } from "../styles/screeen-size";
import { RedesignSpacings } from "../styles/spacings";

export const MinimalistLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.xxl} 100px ${RedesignSpacings.md}
    ${RedesignSpacings.md};

  align-self: flex-end;
  align-items: flex-end;

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.sm};
  }
`;
