import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Typography } from './Typography';
import { Picture, type PictureType } from './Picture';
import { BackgroundColors, GrayScale, TextColors } from '../styles/theme';
import { RedesignSpacings } from '../styles/spacings';
import { ScreenSize } from '../styles/screeen-size';
import { FlexColumnLayout } from './FlexColumnLayout';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 380px;
  min-width: 380px;
  height: 600px;
  background: ${BackgroundColors.card};
  padding: ${RedesignSpacings.lg};
  border-radius: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid ${GrayScale[100]};
  flex-shrink: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;

  @media (max-width: ${ScreenSize.tablet}) {
    width: 100%;
    min-width: 100%;
    height: auto;
    min-height: 580px;
  }
`;

const DetailImageWrapper = styled.div`
  width: 100%;
  margin-bottom: ${RedesignSpacings.md};
  display: flex;
  justify-content: center;

  img {
    border-radius: 20px;
    object-fit: cover;
  }
`;

const Content = styled(FlexColumnLayout)`
  width: 100%;
  flex: 1;
`;

const DescriptionText = styled(Typography)`
  font-style: italic;
  line-height: 1.6;
  color: ${GrayScale[800]};
  margin-top: ${RedesignSpacings.sm};
`;

const InstagramLink = styled.a`
  text-decoration: none;
  color: #793b3b;
  margin-top: auto;
  padding-top: ${RedesignSpacings.md};

  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  name: string;
  title?: string;
  description?: string;
  instagram: string;
  image: PictureType;
}

export const OrganizerDetailsCard = ({ name, title, description, instagram, image }: Props) => {
  return (
    <DetailsWrapper key={name}>
      <DetailImageWrapper>
        <Picture picture={image} alt={name} width={200} height={200} />
      </DetailImageWrapper>

      <Content gap="xs" padding="none">
        <div>
          <Typography size="lg" weight="bold" color="#793b3b">
            {name}
          </Typography>
          {title && (
            <Typography size="md" weight="regular" color={TextColors.secondary}>
              {title}
            </Typography>
          )}
        </div>

        <DescriptionText size="sm">{description}</DescriptionText>

        <InstagramLink href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
          <Typography size="sm" color="inherit" weight="bold">
            @{instagram}
          </Typography>
        </InstagramLink>
      </Content>
    </DetailsWrapper>
  );
};
