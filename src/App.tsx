import { faEnvelope, faGraduationCap, faInfoCircle, faSailboat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Curtain, Header, Root } from './App.styled';
import { BurgerMenu } from './components/BurgerMenu';
import { SideBar } from './components/SideBar';
import { InfoForVendorsPage } from './pages/InfoForVendorsPage';
import { MainPage } from './pages/MainPage';
import { usePhone } from './pages/usePhone';
import { useTypedTranslation } from './translations/useTypedTranslation';
import { Footer } from './components/Footer';

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
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);
  const closeSideBar = () => setBurgerActive(false);

  return (
    <>
      <GlobalStyle />

      <Root id="root">
        {isPhone && <Curtain onClick={() => setBurgerActive(false)} className={burgerActive ? 'active' : undefined} />}

        {isPhone && (
          <Header>
            <>
              <SideBar roundedCorners="left" className={burgerActive ? 'visible' : undefined}>
                <SideBar.LinkEntry onClick={closeSideBar} href="/info-for-vendors">
                  <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                  {t('menu.infoForVendors')}
                </SideBar.LinkEntry>

                <SideBar.LinkEntry onClick={closeSideBar} href="/workshops">
                  <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                  {t('menu.workshops')}
                </SideBar.LinkEntry>

                <SideBar.LinkEntry onClick={closeSideBar} href="/vip-tickets">
                  <FontAwesomeIcon icon={faSailboat} size="lg" />
                  {t('menu.vipTickets')}
                </SideBar.LinkEntry>

                <SideBar.LinkEntry onClick={closeSideBar} href="/contact">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  {t('menu.contact')}
                </SideBar.LinkEntry>
              </SideBar>
              <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
            </>
          </Header>
        )}

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
