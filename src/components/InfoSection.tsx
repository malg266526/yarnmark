import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { FontSize } from '../styles/font-size';

const Title = styled.h1`
  font-size: ${FontSize.xxl};
  font-weight: 600;
  margin: ${Spacings.sm} 0;
`;

const Text = styled.h3`
  font-size: ${FontSize.lg};
  font-weight: 500;
  margin: ${Spacings.sm} 0;
`;

export const Root = styled.div``;

export const InfoSection = Object.assign(Root, {
  Title,
  Text
});
