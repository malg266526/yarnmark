import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { DropShadow, Radius } from '../styles/cards';
import { FontSize } from '../styles/font-size';
import { ScreenSize } from '../styles/screeen-size';
import { Spacings } from '../styles/spacings';
import { BrownScale } from '../styles/theme';

const PlannerCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${Radius.lg};
  align-items: center;
  position: relative;
  box-shadow: ${DropShadow.sm};
  width: 280px;
  height: 360px;
  justify-content: space-around;
  margin: ${Spacings.xs};

  @media (max-width: ${ScreenSize.phone}) {
    height: 358px;
  }
`;

const Ribbon = styled.div`
  font-size: ${FontSize.md};
  font-weight: bold;
  color: #fff;

  --r: 28px; /* control the ribbon shape */

  padding-inline: calc(var(--r) + ${Spacings.md});
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--r)) 50%, 100% 100%, 0 100%, var(--r) 50%);
  background: ${BrownScale[900]}; /* the main color */
  width: 75%;

  padding-top: ${Spacings.xs};
  padding-bottom: ${Spacings.xs};
  text-align: center;
`;

const Text = styled.p`
  font-size: ${FontSize.md};
  font-weight: 400;
  margin-bottom: 0;
`;

type PlannerCardType = {
  time: string;
  children?: ReactNode;
};

export const PlannerCard = ({ time, children }: PlannerCardType) => {
  return (
    <PlannerCardLayout>
      <Ribbon>
        <Text>{time}</Text>
      </Ribbon>

      {children}
    </PlannerCardLayout>
  );
};
