import styled from 'styled-components';
import { RedesignSpacings } from '../../../../styles/spacings';
import { DropShadow, Radius } from '../../../../styles/cards';
import { ScreenSize } from '../../../../styles/screeen-size';

export const CardLayout = styled.div<{ isExpanded?: boolean }>`
  display: flex;
  flex-direction: column;

  width: 320px;
  min-width: 320px;
  height: 470px;

  padding: ${RedesignSpacings.md} ${RedesignSpacings.xs};

  gap: ${RedesignSpacings.sm};

  border-radius: ${Radius.lg};
  align-items: center;
  position: relative;
  box-shadow: ${DropShadow.sm};

  cursor: pointer;

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
    min-width: 100%;
    height: ${({ isExpanded }) => (isExpanded ? '100%' : '201px')};

    padding: ${RedesignSpacings.sm};

    gap: 16px;
  }
`;
