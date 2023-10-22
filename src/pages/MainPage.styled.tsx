import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.spruce};
  padding-right: ${Spacings.lg};
  padding-left: ${Spacings.lg};
  padding-top: ${Spacings.xs};
  padding-bottom: ${Spacings.md};
`;

export const Logo = styled.img`
  align-self: center;
  margin-top: ${Spacings.lg};
`;

export const LinkButton = styled.a`
  align-self: center;
`;

export const Details = styled.div`
  font-family: 'Roboto';
  font-weight: 300;
`;

export const StyledH3 = styled.h3`
  font-weight: 300;
`;

export const StyledH4 = styled.h4`
  font-weight: 300;
`;
