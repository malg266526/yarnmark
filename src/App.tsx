import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import emailImageUrl from './assets/iconify/email.svg';
import instagramImageUrl from './assets/iconify/instagram.svg';
import talkImageUrl from './assets/iconify/talk.svg';
import { TextWrapper, Title } from './components/Title';
import { Icon } from './components/Icon';
import { MinimalistLayout } from './components/MinimalistLayout';
import { RowLayout } from './components/RowLayout';

import { Root, Footer, RightBackgroundImage, TransparentText } from './App.styled';
import { InfoForVendorsPage } from './pages/InfoForVendorsPage';
import { MainPage } from './pages/MainPage';
import { useTypedTranslation } from './translations/useTypedTranslation';
import { Colors } from './styles/theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Lexend', sans-serif !important;
    color: ${Colors.text};
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif; */
  }

  /** bootstrap adds margin for p elements; line below removes it */
  P {
    margin-top: initial;
    margin-bottom: initial;
  }

  * {
    box-sizing: border-box;
  }
`;

export const App = () => {
  const t = useTypedTranslation();

  return (
    <>
      <GlobalStyle />

      <Root id="root">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/info-for-vendors" element={<InfoForVendorsPage />} />
        </Routes>

        <Footer id="footer">
          <MinimalistLayout>
            <TextWrapper>
              <Title>{t('contactPage.title')}</Title>
            </TextWrapper>

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

            <RightBackgroundImage src={talkImageUrl} alt="talk_icon" />
            <TransparentText>Dziewiarskie targi welny krakow 2024</TransparentText>
          </MinimalistLayout>
        </Footer>
      </Root>
    </>
  );
};
