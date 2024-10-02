import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import { BackgroundColors, Colors } from '../../styles/theme';

export const PlainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  width: 100%;
  min-height: 100px;
  text-align: justify;

  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  font-style: normal;

  @media (max-width: ${ScreenSize.tablet}) {
    max-width: 92%;
    width: 92%;
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${BackgroundColors.green.strong};
`;

export const HallWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  background-color: ${Colors.white};

  @media (max-width: ${ScreenSize.tablet}) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    align-self: center;
  }

  // TODO
  @media (max-width: ${ScreenSize.phone}) {
    width: 96%;
  }
`;
