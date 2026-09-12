import React, { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';
import { GrayScale } from '../styles/theme';
import { RedesignSpacings } from '../styles/spacings';
import { Typography } from './Typography';
import { Kicker } from './Kicker';
import { ScreenSize } from '../styles/screeen-size';

const HeaderRoot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
  padding: ${RedesignSpacings.xs} 0 ${RedesignSpacings.sm};
  border-bottom: 1px solid ${GrayScale[300]};

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.xxs} 0 ${RedesignSpacings.sm};
  }
`;

const Description = styled(Typography)`
  max-width: 720px;
`;

interface UtilityPageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  kicker?: ReactNode;
  titleSize?: ComponentProps<typeof Typography>['size'];
}

export const UtilityPageHeader = ({ title, description, kicker, titleSize = 'xxl' }: UtilityPageHeaderProps) => (
  <HeaderRoot>
    {kicker ? (
      <Kicker>
        <Typography size="xs">{kicker}</Typography>
      </Kicker>
    ) : null}

    <Typography size={titleSize} weight="bold" as="h1">
      {title}
    </Typography>

    {description ? <Description size="md">{description}</Description> : null}
  </HeaderRoot>
);
