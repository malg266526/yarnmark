import styled from 'styled-components';
import { RedesignSpacings } from '../styles/spacings';
import { Icon } from './Icon';
import ellipseLight from '../assets/figmaIcons/ellipse_light.svg';
import ellipseMedium from '../assets/figmaIcons/ellipse_medium.svg';
import ellipseStrong from '../assets/figmaIcons/ellipse_strong.svg';
import React from 'react';

interface DotsProps {
  direction?: 'column' | 'row';
  size?: 'sm' | 'lg';
}

const DotsLayout = styled.div<DotsProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: center;
  gap: ${RedesignSpacings.xs};
  padding: ${RedesignSpacings.xs};
`;

export const Dots = ({ direction, size }: DotsProps) => (
  <DotsLayout direction={direction} size={size}>
    <Icon size="xs" zIndex={0} src={ellipseStrong} />
    <Icon size="xs" zIndex={0} src={ellipseMedium} />
    <Icon size="xs" zIndex={0} src={ellipseLight} />
  </DotsLayout>
);
