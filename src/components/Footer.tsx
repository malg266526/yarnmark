import React from 'react';
import emailImageUrl from '../assets/iconify/email.svg';
import instagramImageUrl from '../assets/iconify/instagram.svg';
import talkImageUrl from '../assets/iconify/talk.svg';
import { RightBackgroundImage, Title } from '../pages/MainPage.styled';
import { Icon } from './Icon';
import { MinimalistLayout } from './MinimalistLayout';
import { RowLayout } from './RowLayout';
import { Colors } from '../styles/theme';
import { Spacings } from '../styles/spacings';
import styled from 'styled-components';

const Root = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  display: flex;
  padding: ${Spacings.lg};

  align-items: center;
  overflow: hidden;

  background: ${Colors.snow};
`;

export const Footer = () => (
  <Root>
    <MinimalistLayout>
      <Title>Kontakt</Title>

      <RowLayout>
        <Icon size="xl" src={emailImageUrl} />
        krakoski.yarnmark.welny@gmail.com
      </RowLayout>

      <a href="https://www.instagram.com/dziergamynapolu/" target="_blank" rel="noreferrer">
        <RowLayout>
          <Icon size="xl" src={instagramImageUrl} />
          @dziergamynapolu
        </RowLayout>
      </a>

      <a href="https://www.instagram.com/wloczykijki_sklep/" target="_blank" rel="noreferrer">
        <RowLayout>
          <Icon size="xl" src={instagramImageUrl} />
          @wloczykijki_sklep
        </RowLayout>
      </a>

      <RightBackgroundImage src={talkImageUrl} />
    </MinimalistLayout>
  </Root>
);
