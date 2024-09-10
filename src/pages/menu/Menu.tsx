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
// import workshopIcons from '../../assets/figmaIcons/menu/workshops_icon.svg';
import paintingIcon from '../../assets/figmaIcons/menu/painting_icon.svg';
// import pinEllipseIcon from '../../assets/figmaIcons/menu/pin_ellipse_icon.svg';
import handshakeIcon from '../../assets/figmaIcons/menu/handshake_icon.svg';
import contractIcon from '../../assets/figmaIcons/menu/contract_icon.svg';
import openDrawerIcon from '../../assets/figmaIcons/open_drawer_icon.svg';
import closeDrawerIcon from '../../assets/figmaIcons/close_drawer_icon.svg';
import { Picture } from '../../components/Picture';
import { yarnmarkLogoPictureConfig } from '../../assets/yarnmarkLogoPictureConfig';
import { useToggle } from '../../hooks/useToggle';
import { Button } from '../../components/Button';
import { Typography } from '../../components/Typography';
import { LanguageSwitcher } from '../LanguageSwitcher';
import contactIcon from '../../assets/figmaIcons/menu/contact_icon.svg';
import { usePhone } from '../../hooks/usePhone';
import { ScreenSize } from '../../styles/screeen-size';
import closeMenuIcon from '../../assets/figmaIcons/menu/close_icon.svg';
import dotsStrokeIcon from '../../assets/figmaIcons/dots_icon.svg';

const RootLayout = styled.div<{ isOpen?: boolean; isVisible?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ isOpen, isVisible }) => (isVisible ? (isOpen ? '240px' : '80px') : 0)};
  position: fixed;
  height: 100%;
  z-index: 10;
  left: 0;
  top: 0;
  border-radius: 0 12px 12px 0;
  background: ${BackgroundColors.menu};
  gap: ${RedesignSpacings.lg};
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.xxs} ${RedesignSpacings.xxxl} ${RedesignSpacings.xxs};
  transition: all 0.1s linear;
  overflow: auto;

  @media (max-width: ${ScreenSize.phone}) {
    height: 100vh;
    top: 0;
    left: unset;
    z-index: 102;
    right: -${RedesignSpacings.xs};
    border-radius: 12px 0 0 12px;
    padding: ${RedesignSpacings.xs} ${RedesignSpacings.xxs};
    gap: ${RedesignSpacings.sm};
    background: ${BackgroundColors.mobileMenu};
  }
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

  @media (max-width: ${ScreenSize.phone}) {
    padding: 0 8px 8px 8px;
  }
`;

const LastSection = styled(Section)`
  @media (max-width: ${ScreenSize.phone}) {
    border-bottom: none;
  }
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
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.xxs};

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.xs} ${RedesignSpacings.xxs};
  }
`;

const TicketsSection = styled.div<{ isOpen?: boolean }>`
  background-color: ${BackgroundColors.ticketBand};
  border-radius: 6px;
  gap: 7px;
  width: fit-content;
  align-self: center;
  padding-right: ${({ isOpen }) => (isOpen ? '8px' : '0')};
`;

const SwitchButton = styled(Button)`
  height: 50px;
  display: flex;
  align-items: center;

  @media (max-width: ${ScreenSize.phone}) {
    display: none;
  }
`;

const Dots = styled.span`
  background: url(${dotsStrokeIcon}) no-repeat center;
  background-size: contain;
  width: 70px;
  height: 30px;
`;

interface UpgradedMenuProps {
  isVisible?: boolean;
  closeMenu?: () => void;
}

export const Menu = ({ isVisible, closeMenu }: UpgradedMenuProps) => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  const [isOpen, toggle] = useToggle();
  const isMenuExpanded = isOpen || isPhone;

  return (
    <RootLayout isVisible={isVisible} isOpen={isMenuExpanded}>
      <Section isOpen={isMenuExpanded}>
        {isPhone ? (
          <Button onClick={closeMenu}>
            <Icon size="lg" src={closeMenuIcon} />
          </Button>
        ) : (
          <Dots />
        )}

        <SwitchRow isOpen={isMenuExpanded}>
          {isMenuExpanded ? (
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

        <MenuItem href="/home" isOpen={isMenuExpanded} aria-label="home_menu_item">
          <Icon size="sm" zIndex={0} src={homeIcon} />
          {isMenuExpanded && <Typography size="sm"> {t('menu.home')}</Typography>}
        </MenuItem>
      </Section>

      <Section isOpen={isMenuExpanded}>
        <MenuItem href="/home#mainInfoButtons" isOpen={isMenuExpanded} aria-label="main_information_menu_item">
          <Icon size="sm" zIndex={0} src={infoIcon} />
          {isMenuExpanded && <Typography size="sm"> {t('menu.whatAndWhere')}</Typography>}
        </MenuItem>

        <TicketsSection isOpen={isMenuExpanded}>
          <MenuItem
            href="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832"
            target="_blank"
            isOpen={isMenuExpanded}
            aria-label="yarnmark_ticket_menu_item">
            <Icon size="sm" zIndex={0} src={ticketIcon} />
            {isMenuExpanded && <Typography size="sm">{t('menu.entranceTicket')}</Typography>}
          </MenuItem>

          <MenuItem
            href="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358"
            target="_blank"
            isOpen={isMenuExpanded}
            aria-label="workshops_tickets_menu_item">
            <Icon size="sm" zIndex={0} src={ticketIcon} />
            {isMenuExpanded && <Typography size="sm">{t('menu.workshopTickets')}</Typography>}
          </MenuItem>

          {/*          <MenuItem
            href="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833"
            target="_blank"
            isOpen={isMenuExpanded}
            aria-label="cruise_tickets_menu_item">
            <Icon size="sm" zIndex={0} src={ticketIcon} />
            {isMenuExpanded && <Typography size="sm">{t('menu.cruiseTickets')}</Typography>}
          </MenuItem>*/}
        </TicketsSection>

        {/*        <MenuItem href="/home#workshops" isOpen={isMenuExpanded} aria-label="workshops_menu_item">
          <Icon size="sm" zIndex={0} src={workshopIcons} />
          {isMenuExpanded && <Typography size="sm">{t('menu.workshops')}</Typography>}
        </MenuItem>*/}

        <MenuItem href="/home#vendors" isOpen={isMenuExpanded} aria-label="vendors_menu_item">
          <Icon size="sm" zIndex={0} src={shopIcon} />
          {isMenuExpanded && <Typography size="sm">{t('menu.vendors')}</Typography>}
        </MenuItem>

        <MenuItem href="/home#lastEdition" isOpen={isMenuExpanded} aria-label="last_edition_menu_item">
          <Icon size="sm" zIndex={0} src={paintingIcon} />
          {isMenuExpanded && <Typography size="sm">{t('menu.memories')}</Typography>}
        </MenuItem>
      </Section>

      <LastSection isOpen={isMenuExpanded}>
        <MenuItem href="/info-for-vendors" isOpen={isMenuExpanded} aria-label="stands_map_menu_item">
          <Icon size="sm" zIndex={0} src={handshakeIcon} />
          {isMenuExpanded && <Typography size="sm">{t('menu.infoForVendors')}</Typography>}
        </MenuItem>

        {/*        <MenuItem href="/hall" isOpen={isMenuExpanded} aria-label="hall_map_menu_item">
          <Icon size="sm" zIndex={0} src={pinEllipseIcon} />
          {isMenuExpanded && <Typography size="sm">{t('menu.hallMap')}</Typography>}
        </MenuItem>*/}

        <MenuItem href="/statutes" isOpen={isMenuExpanded} aria-label="statutes_menu_item">
          <Icon size="sm" zIndex={0} src={contractIcon} />
          {isMenuExpanded && <Typography size="sm">{t('menu.statutes')}</Typography>}
        </MenuItem>

        <MenuItem href="#footer" isOpen={isMenuExpanded} aria-label="contact_menu_item">
          <Icon size="sm" zIndex={0} src={contactIcon} />
          {isMenuExpanded && <Typography size="sm">{t('menu.contact')}</Typography>}
        </MenuItem>
      </LastSection>

      {!isPhone && (
        <LanguageSection>
          <LanguageSwitcher isOpen={isMenuExpanded} />
        </LanguageSection>
      )}
    </RootLayout>
  );
};
