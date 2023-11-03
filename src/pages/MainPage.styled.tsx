import styled from 'styled-components';
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
  font-family: 'Roboto';
  font-weight: 300;
`;

export const StyledH3 = styled.h3`
  font-weight: 300;
`;

export const StyledH4 = styled.h4`
  font-weight: 300;
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
