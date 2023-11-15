import { faCartShopping, faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Content, Curtain, Header, Image, Overlay, Root } from './App.styled';
import KrakowImageUrl from './assets/images/krakow3.jpg';
import { BurgerMenu } from './components/BurgerMenu';
import { Link } from './components/Link';
import { Menu } from './components/Menu';
import { SideBar } from './components/SideBar';
import { ContactPage } from './pages/ContactPage';
import { MainPage } from './pages/MainPage';
import { VendorsPage } from './pages/VendorsPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
import { usePhone } from './pages/usePhone';
import { useTypedTranslation } from './translations/useTypedTranslation';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
  }

  * {
    box-sizing: border-box;
  }
`;

export const App = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  return (
    <>
      <GlobalStyle />

      <Image width="100%" src={KrakowImageUrl} />
      <Overlay />

      <Root id="root">
        {isPhone && <Curtain onClick={() => setBurgerActive(false)} className={burgerActive ? 'active' : undefined} />}

        <Header>
          {isPhone && (
            <>
              <SideBar roundedCorners="left" className={burgerActive ? 'visible' : undefined}>
                <SideBar.LinkEntry href="/workshops">
                  <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                  {t('menu.workshops')}
                </SideBar.LinkEntry>
                <SideBar.LinkEntry href="/vendors">
                  <FontAwesomeIcon icon={faCartShopping} size="lg" />
                  {t('menu.vendors')}
                </SideBar.LinkEntry>
                <SideBar.LinkEntry href="/contact">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  {t('menu.contact')}
                </SideBar.LinkEntry>
              </SideBar>
              <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
            </>
          )}
          {!isPhone && (
            <Menu>
              <Link href="/">Yarnmark</Link>

              <Link href="/workshops">{t('menu.workshops')}</Link>

              <Link href="/vendors">{t('menu.vendors')}</Link>

              <Link href="/contact">{t('menu.contact')}</Link>
            </Menu>
          )}
        </Header>

        <Content>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
          </Routes>
        </Content>
      </Root>
    </>
  );
};
