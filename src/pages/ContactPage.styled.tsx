import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';

export const Header = styled.div`
  width: '100%';
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${Spacings.lg};
  padding: ${Spacings.xs} ${Spacings.lg};
  border-bottom: 1px solid lightgray;

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

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Spacings.md};
`;

export const Image = styled.img`
  align-self: center;
  margin-top: ${Spacings.lg};
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

  padding: 0 ${Spacings.md};
`;

export const Column = styled.div`
  display: flex;
  min-width: 222px;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.p`
  font-family: 'Roboto';
  font-weight: 300;
`;
