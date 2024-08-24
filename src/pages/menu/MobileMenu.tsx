import { Curtain } from '../../components/Curtain';
import { SideBar } from '../../components/SideBar';
import { Icon as IconifyIcon } from '@iconify/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { Typography } from '../../components/Typography';
import { TextColors } from '../../styles/theme';
import { Button } from '../../components/Button';
import dotsVerticalIcon from '../../assets/figmaIcons/dots_vertical_icon.svg';
import { useToggle } from '../../hooks/useToggle';

const MobileHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 100;
  top: 0;
  position: sticky;
  padding: ${RedesignSpacings.sm} 16px ${RedesignSpacings.xs} 16px;
  color: ${TextColors.accent};
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: ${RedesignSpacings.xs};
`;

const MenuRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const MenuButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const VerticalDots = styled.span`
  background: url(${dotsVerticalIcon}) no-repeat center;
  background-size: contain;
  width: 10px;
  height: 32px;
`;

export const MobileMenu = () => {
  const t = useTypedTranslation();

  const [isMenuOpen, toggleMenu, close] = useToggle(false);

  return (
    <>
      <Curtain onClick={toggleMenu} active={isMenuOpen} />

      <MobileHeader>
        <Typography size="lg">Yarnmark</Typography>
        <MenuRow id="menu_row">
          <LanguageSwitcher isOpen />

          <MenuButton onClick={toggleMenu}>
            <Typography size="lg">Menu</Typography>
            <VerticalDots />
          </MenuButton>
        </MenuRow>
      </MobileHeader>

      <SideBar roundedCorners="left" active={isMenuOpen}>
        <SideBar.LinkEntry
          to="/"
          onClick={close}
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
              name: t('whereToEat'),
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
          onClick={close}
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

        <SideBar.LinkEntry onClick={close} to="/hall" target="_blank">
          <IconifyIcon icon="gis:world-map" width="24" />
          {t('menu.hallMap')}
        </SideBar.LinkEntry>

        <SideBar.LinkEntry
          onClick={close}
          to="/info-for-vendors"
          subLinks={[
            {
              to: '/for-vendors#stands',
              name: t('menu.stands'),
              icon: <IconifyIcon icon="bi:shop" width="24" />
            },
            {
              to: '/for-vendors#footer',
              name: t('menu.contact'),
              icon: <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
            }
          ]}>
          <IconifyIcon icon="material-symbols:info-outline" width="24" />
          {t('menu.infoForVendors')}
        </SideBar.LinkEntry>

        <SideBar.LinkEntry to="/statutes" onClick={close}>
          <IconifyIcon icon="mdi:document-sign" width="24" />
          {t('menu.statutes')}
        </SideBar.LinkEntry>

        <LanguageSwitcher />
      </SideBar>
    </>
  );
};
