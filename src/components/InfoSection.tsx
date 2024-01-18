import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  margin: ${Spacings.sm} 0;
`;

const Text = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin: ${Spacings.sm} 0;
`;

export const Root = styled.div``;

export const InfoSection = Object.assign(Root, {
  Title,
  Text
});
