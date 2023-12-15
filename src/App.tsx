import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Curtain, Root } from './App.styled';
import { Footer } from './components/Footer';
import { InfoForVendorsPage } from './pages/InfoForVendorsPage';
import { MainPage } from './pages/MainPage';
import { usePhone } from './pages/usePhone';

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

        <Footer />
      </Root>
    </>
  );
};
