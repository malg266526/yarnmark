import styled from 'styled-components';
import { RedesignSpacings } from '../styles/spacings';
import { Icon } from './Icon';
import ellipseLight from '../assets/figmaIcons/ellipse_light.svg';
import ellipseMedium from '../assets/figmaIcons/ellipse_medium.svg';
import ellipseStrong from '../assets/figmaIcons/ellipse_strong.svg';
import React from 'react';
import { Button } from './Button';

const MiddleIcon = styled.div`
  margin-top: 1px;
`;

interface DotsProps {
  direction?: 'column' | 'row';
  size?: 'sm' | 'lg';
  onPrev?: () => void;
  onNext?: () => void;
}

const DotsLayout = styled.div<DotsProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: center;
  gap: ${RedesignSpacings.xs};
  padding: ${RedesignSpacings.xs};
`;

export const Dots = ({ direction, size, onPrev, onNext }: DotsProps) => (
  <DotsLayout direction={direction} size={size}>
    <Button onClick={onPrev} aria-label="prev button">
      <Icon size="xxs" zIndex={0} src={ellipseStrong} />
    </Button>

    <MiddleIcon>
      <Icon size="xxs" zIndex={0} src={ellipseMedium} />
    </MiddleIcon>

    <Button onClick={onNext} aria-label="next button">
      <Icon size="xxs" zIndex={0} src={ellipseLight} />
    </Button>
  </DotsLayout>
);
