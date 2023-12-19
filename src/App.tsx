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

import { Curtain, Root, Footer, RightBackgroundImage } from './App.styled';
import { InfoForVendorsPage } from './pages/InfoForVendorsPage';
import { MainPage } from './pages/MainPage';
import { usePhone } from './pages/usePhone';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Lexend', sans-serif;
    word-break: break-all;
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif; */
  }

  * {
    box-sizing: border-box;
  }
`;

export const App = () => {
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

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

        <Footer>
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
        </Footer>
      </Root>
    </>
  );
};
