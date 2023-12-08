import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SectionWrapper } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { ImageButtonProps } from './ImageButton';

export interface ShowOnHoverLayoutProps {
  children: ReactElement<ImageButtonProps>[];
}

const Root = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  padding: ${Spacings.xs};
  align-self: flex-start;
`;

export const ShowOnHoverLayout = ({ children }: ShowOnHoverLayoutProps) => {
  return (
    <Root>
      <SectionWrapper>
        {React.Children.map(children, (child) => (
          <div>{child}</div>
        ))}
      </SectionWrapper>
    </Root>
  );
};
