import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import emailImageUrl from './assets/iconify/email.svg';
import instagramImageUrl from './assets/iconify/instagram.svg';
import talkImageUrl from './assets/iconify/talk.svg';
import { Title } from './components/Title';
import { Icon } from './components/Icon';
import { MinimalistLayout } from './components/MinimalistLayout';
import { RowLayout } from './components/RowLayout';

import { Curtain, Root, Footer, RightBackgroundImage, TransparentText } from './App.styled';
import { InfoForVendorsPage } from './pages/InfoForVendorsPage';
import { MainPage } from './pages/MainPage';
import { usePhone } from './pages/usePhone';
import { useTypedTranslation } from './translations/useTypedTranslation';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Lexend', sans-serif;
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif; */
  }

  * {
    box-sizing: border-box;
  }
`;

export const App = () => {
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);
  const t = useTypedTranslation();

  return (
    <>
      <GlobalStyle />

      <Root id="root">
        {isPhone && <Curtain onClick={() => setBurgerActive(false)} className={burgerActive ? 'active' : undefined} />}

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/info-for-vendors" element={<InfoForVendorsPage />} />
        </Routes>

        <Footer id="footer">
          <MinimalistLayout>
            <Title>{t('contactPage.title')}</Title>

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
