import React, { Children, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { SectionWrapper } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { IconWrapper, IconWrapper2 } from './FunnyButton';
import { Image } from './PhotoBox';

export interface ImageButtonProps {
  icon: React.ReactNode;
  children?: React.ReactNode;
  photo?: string;
  text?: string;
}

const ImageButtonLayout = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid black;
  padding: ${Spacings.xs};
  padding-right: ${Spacings.sm};
  border-radius: 10px;
`;

export const ImageButton = ({ icon, children }: ImageButtonProps) => (
  <ImageButtonLayout>
    <IconWrapper2>
      <IconWrapper>{icon}</IconWrapper>
    </IconWrapper2>
    {children}
  </ImageButtonLayout>
);

const ImageContentLayout = styled.div`
  display: flex;
  width: 400px;
  // height: '800px';
  border: 2px solid black;
  padding: ${Spacings.xs};
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
  const [selectedButton, setSelectedButton] = useState<number>(1);

  const contents = Children.map(children, (child) => child.props);

  const selectedContent: ImageButtonProps = contents[selectedButton];

  return (
    <Root>
      <SectionWrapper>
        {React.Children.map(children, (child, index) => (
          <div onClick={() => setSelectedButton(index)}>{child}</div>
        ))}
      </SectionWrapper>

      <ImageContentLayout>
        {selectedButton !== -1 && (
          <div>
            <Image src={selectedContent.photo} />
            {selectedContent.text}
          </div>
        )}
      </ImageContentLayout>
    </Root>
  );
};
