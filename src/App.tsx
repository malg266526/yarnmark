import {
  faEnvelope,
  faGraduationCap,
  faInfoCircle,
  faPersonDress,
  faSailboat
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Curtain, Footer, Header, Root } from './App.styled';
import { BurgerMenu } from './components/BurgerMenu';
import { SideBar } from './components/SideBar';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { HallPage } from './pages/HallPage';
import { InfoForVendorsPage } from './pages/InfoForVendorsPage';
import { MainPage } from './pages/MainPage';
import { VipTicketsPage } from './pages/VipTicketsPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
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

                <SideBar.LinkEntry onClick={closeSideBar} href="/about-us">
                  <FontAwesomeIcon icon={faPersonDress} size="lg" />
                  {t('menu.aboutUs')}
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
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/vip-tickets" element={<VipTicketsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/hall" element={<HallPage />} />
        </Routes>

        <Footer />
      </Root>
    </>
  );
};
