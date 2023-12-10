import React, { Children, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { SectionWrapper } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { ImageButtonProps } from './ImageButton';

const Image = styled.img`
  width: 70%;
  max-width: 70%;
  height: 100%;
  max-height: 100%;

  object-fit: contain;
`;

const ImageContentLayout = styled.div`
  display: flex;
  width: 600px;
  flex-direction: row-reverse;
  border: 2px solid ${Colors.pinball};
  padding: ${Spacings.md};
  background-color: ${Colors.white};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  gap: ${Spacings.md};
`;

export interface ShowOnClickLayoutProps {
  children: ReactElement<ImageButtonProps>[];
}

const Root = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  padding: ${Spacings.xs};
`;

export const ShowOnClickLayout = ({ children }: ShowOnClickLayoutProps) => {
  const [selectedButton, setSelectedButton] = useState<number>(0);

  const contents = Children.map(children, (child) => child.props);

  const selectedContent: ImageButtonProps = contents[selectedButton];

  return (
    <Root>
      <SectionWrapper>
        {React.Children.map(children, (child, index) => (
          <div onClick={() => setSelectedButton(index)}>{child}</div>
        ))}
      </SectionWrapper>

      {selectedButton !== -1 && (
        <ImageContentLayout>
          <Image src={selectedContent.photo} />
          {selectedContent.text}
        </ImageContentLayout>
      )}
    </Root>
  );
};
