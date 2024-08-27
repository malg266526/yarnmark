import React from 'react';
import styled from 'styled-components';
import { BackgroundColors, TextColors } from '../../styles/theme';
import { RedesignSpacings } from '../../styles/spacings';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Icon } from '../../components/Icon';
import infoIcon from '../../assets/figmaIcons/menu/info_icon.svg';
import ticketIcon from '../../assets/figmaIcons/menu/ticket_icon.svg';
import homeIcon from '../../assets/figmaIcons/menu/home_icon.svg';
import shopIcon from '../../assets/figmaIcons/menu/shop_icon.svg';
import workshopIcons from '../../assets/figmaIcons/menu/workshops_icon.svg';
import paintingIcon from '../../assets/figmaIcons/menu/painting_icon.svg';
import pinEllipseIcon from '../../assets/figmaIcons/menu/pin_ellipse_icon.svg';
import handshakeIcon from '../../assets/figmaIcons/menu/handshake_icon.svg';
import contractIcon from '../../assets/figmaIcons/menu/contract_icon.svg';
import openDrawerIcon from '../../assets/figmaIcons/open_drawer_icon.svg';
import closeDrawerIcon from '../../assets/figmaIcons/close_drawer_icon.svg';
import { Picture } from '../../components/Picture';
import { yarnmarkLogoPictureConfig } from '../../assets/yarnmarkLogoPictureConfig';
import { useToggle } from '../../hooks/useToggle';
import { Button } from '../../components/Button';
import { Typography } from '../../components/Typography';
import { Dots } from '../../components/Dots';
import { LanguageSwitcher } from '../LanguageSwitcher';
import contactIcon from '../../assets/figmaIcons/menu/contact_icon.svg';

const RootLayout = styled.div<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ isOpen }) => (isOpen ? '240px' : '80px')};
  position: fixed;
  height: 100%;
  z-index: 10;
  left: 0;
  border-radius: 0 12px 12px 0;
  background: ${BackgroundColors.menu};
  gap: ${RedesignSpacings.lg};
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.xxs} ${RedesignSpacings.xxxl} ${RedesignSpacings.xxs};
  transition: all 0.1s linear;
  overflow: auto;
`;

const Section = styled.div<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: 0.25px solid #326213;
  gap: ${RedesignSpacings.xs};
  padding-top: 0;
  padding-bottom: 15px;
  padding-left: ${({ isOpen }) => (isOpen ? RedesignSpacings.xs : 0)};
  padding-right: ${({ isOpen }) => (isOpen ? RedesignSpacings.xs : 0)};
`;

const LanguageSection = styled(Section)`
  border: none;
  padding: 0 ${RedesignSpacings.xs};
`;

const MenuItem = styled.a<{ isOpen?: boolean }>`
  display: flex;
  width: ${({ isOpen }) => (isOpen ? '100%' : 'fit-content')};
  height: 32px;
  align-items: center;
  align-self: center;
  padding: ${RedesignSpacings.xxs} ${RedesignSpacings.xs};
  gap: ${RedesignSpacings.sm};
  text-decoration: none;

  cursor: pointer;
  border-radius: 6px;

  color: ${TextColors.accent};
  background-color: ${BackgroundColors.ticketBand};

  ${Icon} {
    filter: brightness(0) saturate(100%) invert(29%) sepia(89%) saturate(428%) hue-rotate(53deg) brightness(89%)
      contrast(91%);
  }

  &:hover {
    color: ${TextColors.accent};
    background-color: ${BackgroundColors.greenLight};

    ${Icon} {
      filter: invert(77%) sepia(37%) saturate(450%) hue-rotate(38deg) brightness(87%) contrast(96%);
    }
  }

  &:active {
    color: ${BackgroundColors.greenLight};
    background-color: ${BackgroundColors.greenStrong};

    ${Icon} {
      filter: brightness(0) saturate(100%) invert(99%) sepia(6%) saturate(1033%) hue-rotate(38deg) brightness(105%)
        contrast(109%);
    }
  }
`;

const SwitchRow = styled.div<{ isOpen?: boolean }>`
  display: flex;
  justify-content: ${({ isOpen }) => (isOpen ? 'space-between' : 'center')};
  align-items: center;
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.xs};
`;

const TicketsSection = styled.div`
  background-color: ${BackgroundColors.ticketBand};
  border-radius: 6px;
  gap: 7px;
  width: fit-content;
  align-self: center;
`;

const SwitchButton = styled(Button)`
  height: 50px;
  display: flex;
  align-items: center;
`;

export const DesktopMenu = () => {
  const t = useTypedTranslation();

  const [isOpen, toggle] = useToggle();

  return (
    <RootLayout isOpen={isOpen}>
      <Section isOpen={isOpen}>
        <Dots />

        <SwitchRow isOpen={isOpen}>
          {isOpen ? (
            <>
              <Picture picture={yarnmarkLogoPictureConfig} alt="yarnmark_logo" width={40} height={50} />
              <SwitchButton onClick={toggle} aria-label="expand_menu">
                <Icon size="sm" zIndex={0} src={closeDrawerIcon} />
              </SwitchButton>
            </>
          ) : (
            <SwitchButton onClick={toggle} aria-label="collapse_menu">
              <Icon size="sm" zIndex={0} src={openDrawerIcon} />
            </SwitchButton>
          )}
        </SwitchRow>

        <MenuItem href="/home" isOpen={isOpen} aria-label="home_menu_item">
          <Icon size="sm" zIndex={0} src={homeIcon} />
          {isOpen && <Typography size="sm"> {t('menu.home')}</Typography>}
        </MenuItem>
      </Section>

      <Section isOpen={isOpen}>
        <MenuItem href="/home#mainInfoButtons" isOpen={isOpen} aria-label="main_information_menu_item">
          <Icon size="sm" zIndex={0} src={infoIcon} />
          {isOpen && <Typography size="sm"> {t('menu.whatAndWhere')}</Typography>}
        </MenuItem>

        <TicketsSection>
          <MenuItem
            href="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832"
            target="_blank"
            isOpen={isOpen}
            aria-label="yarnmark_ticket_menu_item">
            <Icon size="sm" zIndex={0} src={ticketIcon} />
            {isOpen && <Typography size="sm">{t('menu.entranceTicket')}</Typography>}
          </MenuItem>

          <MenuItem
            href="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358"
            target="_blank"
            isOpen={isOpen}
            aria-label="workshops_tickets_menu_item">
            <Icon size="sm" zIndex={0} src={ticketIcon} />
            {isOpen && <Typography size="sm">{t('menu.workshopTickets')}</Typography>}
          </MenuItem>

          <MenuItem
            href="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833"
            target="_blank"
            isOpen={isOpen}
            aria-label="cruise_tickets_menu_item">
            <Icon size="sm" zIndex={0} src={ticketIcon} />
            {isOpen && <Typography size="sm">{t('menu.cruiseTickets')}</Typography>}
          </MenuItem>
        </TicketsSection>

        <MenuItem href="/home#workshops" isOpen={isOpen} aria-label="workshops_menu_item">
          <Icon size="sm" zIndex={0} src={workshopIcons} />
          {isOpen && <Typography size="sm">{t('menu.workshops')}</Typography>}
        </MenuItem>

        <MenuItem href="/home#vendors" isOpen={isOpen} aria-label="vendors_menu_item">
          <Icon size="sm" zIndex={0} src={shopIcon} />
          {isOpen && <Typography size="sm">{t('menu.vendors')}</Typography>}
        </MenuItem>

        <MenuItem href="/home#lastEdition" isOpen={isOpen} aria-label="last_edition_menu_item">
          <Icon size="sm" zIndex={0} src={paintingIcon} />
          {isOpen && <Typography size="sm">{t('menu.memories')}</Typography>}
        </MenuItem>
      </Section>

      <Section isOpen={isOpen}>
        <MenuItem href="/hall" isOpen={isOpen} aria-label="hall_map_menu_item">
          <Icon size="sm" zIndex={0} src={pinEllipseIcon} />
          {isOpen && <Typography size="sm">{t('menu.hallMap')}</Typography>}
        </MenuItem>

        <MenuItem href="/info-for-vendors#stands" isOpen={isOpen} aria-label="stands_map_menu_item">
          <Icon size="sm" zIndex={0} src={handshakeIcon} />
          {isOpen && <Typography size="sm">{t('menu.infoForVendors')}</Typography>}
        </MenuItem>

        <MenuItem href="/statutes" isOpen={isOpen} aria-label="statutes_menu_item">
          <Icon size="sm" zIndex={0} src={contractIcon} />
          {isOpen && <Typography size="sm">{t('menu.statutes')}</Typography>}
        </MenuItem>

        <MenuItem href="#footer" isOpen={isOpen} aria-label="contact_menu_item">
          <Icon size="sm" zIndex={0} src={contactIcon} />
          {isOpen && <Typography size="sm">{t('menu.contact')}</Typography>}
        </MenuItem>
      </Section>

      <LanguageSection>
        <LanguageSwitcher isOpen={isOpen} />
      </LanguageSection>
    </RootLayout>
  );
};
