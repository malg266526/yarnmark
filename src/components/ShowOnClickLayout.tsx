import React, { Children, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { ImageButtonProps } from './ImageButton';
import { ScreenSize } from '../styles/screeen-size';

const Image = styled.img`
  width: 70%;
  max-width: 70%;
  height: 100%;
  max-height: 100%;

  object-fit: contain;

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
    max-width: 100%;
  }
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

  @media (max-width: ${ScreenSize.phone}) {
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 70%;
    align-items: center;
  }
`;

export interface ShowOnClickLayoutProps {
  children: ReactElement<ImageButtonProps>[];
}

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: ${ScreenSize.phone}) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const TextWrapper = styled.div`
  @media (max-width: ${ScreenSize.phone}) {
    // width: 70%;
    // max-width: 70%;
    flex-wrap: wrap;
  }
`;

const Root = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  padding: ${Spacings.xs};

  @media (max-width: ${ScreenSize.phone}) {
    flex-direction: column;
    max-width: 100vw;
  }
`;

export const ShowOnClickLayout = ({ children }: ShowOnClickLayoutProps) => {
  const [selectedButton, setSelectedButton] = useState<number>(0);

  const contents = Children.map(children, (child) => child.props);

  const selectedContent: ImageButtonProps = contents[selectedButton];

  return (
    <Root>
      <ButtonsWrapper>
        {React.Children.map(children, (child, index) => (
          <div onClick={() => setSelectedButton(index)}>{child}</div>
        ))}
      </ButtonsWrapper>

      {selectedButton !== -1 && (
        <ImageContentLayout>
          <Image src={selectedContent.photo} />
          <TextWrapper>{selectedContent.text}</TextWrapper>
        </ImageContentLayout>
      )}
    </Root>
  );
};
