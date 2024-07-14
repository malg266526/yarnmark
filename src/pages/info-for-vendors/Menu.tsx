import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { usePhone } from '../usePhone';
import React, { useState } from 'react';
import { Curtain } from '../../components/Curtain';
import { Header } from '../../App.styled';
import { BurgerMenu } from '../../components/BurgerMenu';
import { SideBar } from '../../components/SideBar';
import { Icon as IconifyIcon } from '@iconify/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Menu as DesktopMenu } from '../../components/Menu';

export const Menu = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  const closeSideBar = () => setBurgerActive(false);

  return isPhone ? (
    <>
      <Curtain onClick={() => setBurgerActive(false)} active={burgerActive} />
      <Header>
        <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
      </Header>

      <SideBar roundedCorners="left" active={burgerActive}>
        <SideBar.LinkEntry
          to="/"
          onClick={() => {
            closeSideBar();
          }}>
          <IconifyIcon icon="game-icons:wool" width="24" />
          Yarnmark
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

        <SideBar.LinkEntry
          to="/info-for-vendors"
          onClick={closeSideBar}
          subLinks={[
            {
              to: '#stands',
              name: t('menu.stands'),
              icon: <IconifyIcon icon="bi:shop" width="24" />
            },
            {
              to: '#footer',
              name: t('menu.contact'),
              icon: <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
            }
          ]}>
          <IconifyIcon icon="game-icons:wool" width="24" />
          {t('menu.infoForVendors')}
        </SideBar.LinkEntry>

        <SideBar.LinkEntry to="/statutes" onClick={closeSideBar}>
          <IconifyIcon icon="mdi:document-sign" width="24" />
          {t('menu.statutes')}
        </SideBar.LinkEntry>

        <LanguageSwitcher />
      </SideBar>
    </>
  ) : (
    <DesktopMenu>
      <DesktopMenu.LinkItem to="/">Yarnmark</DesktopMenu.LinkItem>

      <DesktopMenu.DropdownItem
        subLinks={[
          {
            to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832',
            name: t('menu.entranceTicket'),
            target: '_blank'
          },
          {
            to: 'https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358',
            name: t('menu.workshopTickets'),
            target: '_blank'
          },
          {
            to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833',
            name: t('menu.cruiseTickets'),
            target: '_blank'
          }
        ]}>
        {t('menu.tickets')}
      </DesktopMenu.DropdownItem>

      <DesktopMenu.DropdownItem
        subLinks={[
          {
            to: '#stands',
            name: t('menu.stands')
          },

          {
            to: '#footer',
            name: t('menu.contact')
          }
        ]}>
        {t('menu.infoForVendors')}
      </DesktopMenu.DropdownItem>

      <DesktopMenu.LinkItem to="/statutes">{t('menu.statutes')}</DesktopMenu.LinkItem>

      <LanguageSwitcher />
    </DesktopMenu>
  );
};
