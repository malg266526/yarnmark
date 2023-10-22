import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';

export const Page = styled.div`
  height: 100%;
  background-color: ${Theme.goldStrong};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${Spacings.lg};
  padding: ${Spacings.xs} ${Spacings.lg};
  border-bottom: 1px solid lightgray;

  background-color: white;

  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
`;

export const StyledH2 = styled.h2`
  font-weight: 700;
  color: ${Theme.secondary};
`;

export const StyledH3 = styled.h3`
  font-weight: 600;
  color: ${Theme.secondary};
`;

export const Content = styled.div`
  padding: 0 ${Spacings.lg};
`;

export const Image = styled.img`
  align-self: center;
  margin-top: ${Spacings.sm};
`;

export const PhotoImage = styled.img`
  align-self: center;
  margin-top: ${Spacings.sm};
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
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

export const Text = styled.p<{ margin?: string }>`
  font-family: 'Roboto';
  font-weight: 300;
  margin: ${({ margin }) => margin || Spacings.xs};
  color: ${Theme.secondary};
`;

export const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  margin: ${Spacings.md} 0;
`;
