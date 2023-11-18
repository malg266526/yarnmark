import {
  faCartShopping,
  faEnvelope,
  faGraduationCap,
  faInfoCircle,
  faSailboat
} from '@fortawesome/free-solid-svg-icons';
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
import { InfoForVendorsPage } from './pages/InfoForVendorsPage';
import { MainPage } from './pages/MainPage';
import { VendorsPage } from './pages/VendorsPage';
import { VipTicketsPage } from './pages/VipTicketsPage';
import { usePhone } from './pages/usePhone';
import { useTypedTranslation } from './translations/useTypedTranslation';
import { WorkshopsPage } from './pages/WorkshopsPage';

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
                <SideBar.LinkEntry href="/vendors">
                  <FontAwesomeIcon icon={faCartShopping} size="lg" />
                  {t('menu.vendors')}
                </SideBar.LinkEntry>

                <SideBar.LinkEntry href="/info-for-vendors">
                  <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                  {t('menu.infoForVendors')}
                </SideBar.LinkEntry>

                <SideBar.LinkEntry href="/workshops">
                  <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                  {t('menu.workshops')}
                </SideBar.LinkEntry>

                <SideBar.LinkEntry href="/vip-tickets">
                  <FontAwesomeIcon icon={faSailboat} size="lg" />
                  {t('menu.vipTickets')}
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

              <Link href="/vendors">{t('menu.vendors')}</Link>
              <Link href="/info-for-vendors">{t('menu.infoForVendors')}</Link>
              <Link href="/workshops">{t('menu.workshops')}</Link>
              <Link href="/vip-tickets">{t('menu.vipTickets')}</Link>
              <Link href="/contact">{t('menu.contact')}</Link>
            </Menu>
          )}
        </Header>

        <Content>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/info-for-vendors" element={<InfoForVendorsPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/vip-tickets" element={<VipTicketsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Content>
      </Root>
    </>
  );
};
