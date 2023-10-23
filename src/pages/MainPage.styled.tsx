import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  padding-right: ${Spacings.lg};
  padding-left: ${Spacings.lg};
  padding-top: ${Spacings.xs};
  padding-bottom: ${Spacings.md};
`;

export const Logo = styled.img`
  align-self: center;
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

export const Banner = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

export const PhotoFrame = styled.div<{ size?: 'small' | 'large' }>`
  width: ${({ size }) => (size === 'large' ? '260px' : '200px')};
  height: ${({ size }) => (size === 'large' ? '260px' : '200px')};
  border: 6px solid ${Colors.white};
  border-bottom: 36px solid ${Colors.white};
  background-color: ${Colors.white};
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
`;
