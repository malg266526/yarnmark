import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

export const Root = styled.div`
  display: flex;
  flex: 1;
  padding: ${Spacings.md} 0 ${Spacings.lg} 0;
  width: 100%;
`;

export const StyledH3 = styled.h3`
  font-weight: 600;
  margin: 0;
`;

export const Text = styled.p<{ margin?: keyof typeof Spacings }>`
  font-weight: 300;
  margin: ${({ margin }) => Spacings[margin || 'xs']};
`;

export const RoundedImage = styled.img`
  border-radius: 50%;
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
  gap: ${Spacings.md};
`;

export const ImageBox = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
