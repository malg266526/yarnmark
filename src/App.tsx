import React, { useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { ContactPage } from './pages/ContactPage';
import { createGlobalStyle } from 'styled-components';
import { VendorsPage } from './pages/VendorsPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
import { useTypedTranslation } from './translations/useTypedTranslation';
import { usePhone } from './pages/usePhone';
import { SideBar } from './components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { BurgerMenu } from './components/BurgerMenu';
import { Menu } from './components/Menu';
import { Link } from './components/Link';
import { Root, Curtain, Header, Content, Banner } from './App.styled';
import { Box } from './components/Box';
import HeaderBanner from './assets/images/spruce_green_wave.svg';
import { Colors } from './styles/theme';

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

      <Banner>
        <Box width="100%" height="300px" color={Colors.spruce} />
        <img width="100%" src={HeaderBanner} />
      </Banner>

      <Root>
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
              <Link href="/">Home</Link>

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
