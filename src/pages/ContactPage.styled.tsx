import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';

export const StyledH3 = styled.h3`
  font-weight: 600;
  color: ${Colors.spruce};
`;

export const Image = styled.img`
  align-self: center;
  margin-top: ${Spacings.sm};
`;

export const Avatar = styled.img`
  align-self: center;
  margin: ${Spacings.sm} 0;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  cursor: pointer;
`;

export const RowLayout = styled.div<{ wide?: boolean }>`
  width: ${({ wide }) => (wide ? '100%' : 'initial')};

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.p<{ margin?: keyof typeof Spacings }>`
  font-weight: 300;
  margin: ${({ margin }) => Spacings[margin || 'xs']};
  color: ${Colors.spruce};
`;

export const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${Colors.pinball};
  margin: ${Spacings.md} 0;
`;

export const ImageBox = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
