import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { usePhone } from '../../hooks/usePhone';
import React, { useState } from 'react';
import { Curtain } from '../../components/Curtain';
import { Header } from '../../App.styled';
import { BurgerMenu } from '../../components/BurgerMenu';
import { SideBar } from '../../components/SideBar';
import { Icon as IconifyIcon } from '@iconify/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Menu } from '../../components/Menu';

export const MainPageMenu = () => {
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
          onClick={closeSideBar}
          subLinks={[
            {
              to: '#vendors',
              name: t('menu.vendors'),
              icon: <IconifyIcon icon="bi:shop" width="24" />
            },
            {
              to: '#workshops',
              name: t('menu.workshops'),
              icon: <IconifyIcon icon="icons8:student" width="24" />
            },
            {
              to: '#cruise',
              name: t('menu.cruise'),
              icon: <IconifyIcon icon="clarity:ferry-solid" width="24" />
            },
            {
              to: '#food',
              name: t('buttonsBand.foodButton'),
              icon: <IconifyIcon icon="uil:pizza-slice" width="24" />
            },
            {
              to: '#lastEdition',
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

        <SideBar.LinkEntry onClick={closeSideBar} to="/hall" target="_blank">
          <IconifyIcon icon="gis:world-map" width="24" />
          {t('buttonsBand.hallMap')}
        </SideBar.LinkEntry>

        <SideBar.LinkEntry onClick={closeSideBar} to="/info-for-vendors">
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
  ) : (
    <Menu>
      <Menu.DropdownItem
        subLinks={[
          {
            to: '#vendors',
            name: t('menu.vendors')
          },
          {
            to: '#workshops',
            name: t('menu.workshops')
          },
          {
            to: '#cruise',
            name: t('menu.cruise')
          },
          {
            to: '#food',
            name: t('buttonsBand.foodButton')
          },
          {
            to: '#lastEdition',
            name: 'Yarnmark 2024'
          },
          {
            to: '#footer',
            name: t('menu.contact')
          }
        ]}>
        Yarnmark
      </Menu.DropdownItem>

      <Menu.DropdownItem
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
      </Menu.DropdownItem>

      <Menu.LinkItem to="/hall" target="_blank">
        {t('buttonsBand.hallMap')}
      </Menu.LinkItem>

      <Menu.LinkItem to="/info-for-vendors">{t('menu.infoForVendors')}</Menu.LinkItem>

      <Menu.LinkItem to="/statutes">{t('menu.statutes')}</Menu.LinkItem>

      <LanguageSwitcher />
    </Menu>
  );
};
