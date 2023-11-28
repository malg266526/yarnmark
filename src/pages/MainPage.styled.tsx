import styled from 'styled-components';
import { PageContent } from '../components/PageContent';
import { ScreenSize } from '../styles/screeen-size';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';

export const RowLayout = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: ${ScreenSize.tablet}) {
    flex-direction: column;
    gap: ${Spacings.md};
  }
`;

export const Logo = styled.img`
  align-self: center;
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
`;

export const LinkButton = styled.a`
  align-self: center;
`;

export const Details = styled.div`
  font-weight: 300;
`;

export const StyledH1 = styled.h1`
  font-weight: 600;
  color: white;
  margin: 0;
`;

export const StyledH2 = styled.h2`
  font-weight: 500;
  color: ${Colors.white};
  margin: 0;
`;

export const Box = styled.div`
  display: flex;
  width: 168px;
  height: 168px;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

export const Root = styled(PageContent)`
  padding-bottom: ${Spacings.xl};
`;

export const Text = styled.p<{ margin?: keyof typeof Spacings }>`
  font-weight: 400;
  margin: ${Spacings.xs};
  color: ${Colors.white};
  text-align: center;
`;
