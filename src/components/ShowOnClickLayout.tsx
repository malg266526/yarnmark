import React, { Children, ReactElement, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { SectionWrapper } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { IconWrapper, IconWrapper2 } from './FunnyButton';
import { Colors } from '../styles/theme';

export interface ImageButtonProps {
  icon: React.ReactNode;
  children?: React.ReactNode;
  photo?: string;
  text?: ReactNode;
}

const ImageButtonLayout = styled.div`
  display: flex;
  align-items: center;
  padding: ${Spacings.xs};
  padding-right: ${Spacings.sm};
  border: 2px solid transparent;
  border-radius: 10px;
  box-shadow: 0px black;
  cursor: pointer;

  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);

  &:hover {
    border: 2px solid black;
    box-shadow: 1px 1px 5px 1px #555;
  }
`;

export const ImageButton = ({ icon, children }: ImageButtonProps) => (
  <ImageButtonLayout>
    <IconWrapper2>
      <IconWrapper>{icon}</IconWrapper>
    </IconWrapper2>
    {children}
  </ImageButtonLayout>
);

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
