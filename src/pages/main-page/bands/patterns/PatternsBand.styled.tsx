import styled from 'styled-components';
import { Picture } from '../../../../components/Picture';
import { Kicker } from '../../../../components/Kicker';
import { Card } from '../../../../components/Card';
import { FontSize } from '../../../../styles/font-size';
import { RedesignSpacings } from '../../../../styles/spacings';

export const EditionKicker = styled(Kicker)`
  font-size: ${FontSize.sm};
  font-weight: 600;
`;

export const PanelsRow = styled.div<{ direction: 'row' | 'column' }>`
  width: 100%;
  max-width: 1404px;
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: stretch;
  gap: ${RedesignSpacings.md};
`;

export const EditionPanel = styled(Card)<{ grow: number; isStacked: boolean }>`
  flex: ${({ grow, isStacked }) => (isStacked ? '0 0 auto' : `${grow} 1 0`)};
  min-width: 0;
  overflow: hidden;
  align-items: stretch;
`;

export const PanelPhoto = styled(Picture)<{ ratio: number }>`
  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: ${({ ratio }) => ratio};
  }
`;

export const PanelBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.sm};
  text-align: center;
`;

export const PanelEntries = styled.div<{ isStacked: boolean }>`
  display: flex;
  flex-wrap: ${({ isStacked }) => (isStacked ? 'wrap' : 'nowrap')};
  justify-content: space-evenly;
  gap: ${RedesignSpacings.sm};
  width: 100%;

  & > * {
    flex: ${({ isStacked }) => (isStacked ? '0 1 auto' : '1 1 0')};
    min-width: 0;
  }
`;
