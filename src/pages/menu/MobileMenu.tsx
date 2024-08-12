import { Curtain } from '../../components/Curtain';
import { BurgerMenu } from '../../components/BurgerMenu';
import { SideBar } from '../../components/SideBar';
import { Icon as IconifyIcon } from '@iconify/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import React, { useState } from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';

export const MobileHeader = styled.header`
  display: flex;
  width: 100%;
  z-index: 100;
  top: 0;
  position: sticky;
  padding: ${RedesignSpacings.xs} 16px;
`;

export const MobileMenu = () => {
  const t = useTypedTranslation();

  const [burgerActive, setBurgerActive] = useState(false);

  const closeSideBar = () => setBurgerActive(false);

  return (
    <>
      <Curtain onClick={() => setBurgerActive(false)} active={burgerActive} />
      <MobileHeader>
        <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
      </MobileHeader>

      <SideBar roundedCorners="left" active={burgerActive}>
        <SideBar.LinkEntry
          to="/"
          onClick={closeSideBar}
          subLinks={[
            {
              to: '/home#vendors',
              name: t('menu.vendors'),
              icon: <IconifyIcon icon="bi:shop" width="24" />
            },
            {
              to: '/home#workshops',
              name: t('menu.workshops'),
              icon: <IconifyIcon icon="icons8:student" width="24" />
            },
            {
              to: '/home#cruise',
              name: t('menu.cruise'),
              icon: <IconifyIcon icon="clarity:ferry-solid" width="24" />
            },
            {
              to: 'home#food',
              name: t('buttonsBand.foodButton'),
              icon: <IconifyIcon icon="uil:pizza-slice" width="24" />
            },
            {
              to: 'home#lastEdition',
              name: 'Yarnmark 2024',
              icon: <IconifyIcon icon="material-symbols:party-mode-rounded" width="24" />
            },
            {
              to: '#footer',
              name: t('menu.contact'),
              icon: <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
            }
          ]}>
          <IconifyIcon icon="game-icons:wool" width="24" />
          Home
        </SideBar.LinkEntry>

        <SideBar.LinkEntry
          target="_blank"
          to="https://wloczykijki.pl/pl_PL/i/Krakoski-Yarnmark-Welny/41?preview=true"
          onClick={closeSideBar}
          subLinks={[
            {
              to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832',
              name: t('menu.entranceTicket'),
              target: '_blank',
              icon: <IconifyIcon icon="streamline:tickets" width="24" />
            },
            {
              to: 'https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358',
              name: t('menu.workshopTickets'),
              target: '_blank',
              icon: <IconifyIcon icon="streamline:tickets" width="24" />
            },
            {
              to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833',
              name: t('menu.cruiseTickets'),
              target: '_blank',
              icon: <IconifyIcon icon="streamline:tickets" width="24" />
            }
          ]}>
          <IconifyIcon icon="streamline:tickets" width="24" />
          {t('menu.tickets')}
        </SideBar.LinkEntry>

        <SideBar.LinkEntry onClick={closeSideBar} to="/hall" target="_blank">
          <IconifyIcon icon="gis:world-map" width="24" />
          {t('buttonsBand.hallMap')}
        </SideBar.LinkEntry>

        <SideBar.LinkEntry
          onClick={closeSideBar}
          to="/info-for-vendors"
          subLinks={[
            {
              to: '/info-for-vendors#stands',
              name: t('menu.stands'),
              icon: <IconifyIcon icon="bi:shop" width="24" />
            },
            {
              to: '/info-for-vendors#footer',
              name: t('menu.contact'),
              icon: <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
            }
          ]}>
          <IconifyIcon icon="material-symbols:info-outline" width="24" />
          {t('menu.infoForVendors')}
        </SideBar.LinkEntry>

        <SideBar.LinkEntry to="/statutes" onClick={closeSideBar}>
          <IconifyIcon icon="mdi:document-sign" width="24" />
          {t('menu.statutes')}
        </SideBar.LinkEntry>

        <LanguageSwitcher />
      </SideBar>
    </>
  );
};
