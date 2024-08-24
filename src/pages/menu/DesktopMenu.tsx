import React from 'react';
import styled from 'styled-components';
import { BackgroundColors, TextColors } from '../../styles/theme';
import { RedesignSpacings } from '../../styles/spacings';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Icon } from '../../components/Icon';
import infoIcon from '../../assets/figmaIcons/info_icon.svg';
import ticketIcon from '../../assets/figmaIcons/ticket_icon.svg';
import ticketLightIcon from '../../assets/figmaIcons/ticket_light_icon.svg';
import ticketMediumIcon from '../../assets/figmaIcons/ticket_medium_icon.svg';
import homeIcon from '../../assets/figmaIcons/home_icon.svg';
import shopIcon from '../../assets/figmaIcons/shop_icon.svg';
import workshopIcons from '../../assets/figmaIcons/workshops_icon.svg';
import paintingIcon from '../../assets/figmaIcons/painting_icon.svg';
import pinEllipseIcon from '../../assets/figmaIcons/pin_ellipse_icon.svg';
import handshakeIcon from '../../assets/figmaIcons/handshake_icon.svg';
import contractIcon from '../../assets/figmaIcons/contract_icon.svg';
import openDrawerIcon from '../../assets/figmaIcons/open_drawer_icon.svg';
import closeDrawerIcon from '../../assets/figmaIcons/close_drawer_icon.svg';
import { Picture } from '../../components/Picture';
import { yarnmarkLogoPictureConfig } from '../../assets/yarnmarkLogoPictureConfig';
import { useToggle } from '../../hooks/useToggle';
import { Button } from '../../components/Button';
import { Typography } from '../../components/Typography';
import { Dots } from '../../components/Dots';
import { LanguageSwitcher } from '../LanguageSwitcher';
import contactIcon from '../../assets/figmaIcons/contact_icon.svg';

const RootLayout = styled.div<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ isOpen }) => (isOpen ? '240px' : '80px')};
  position: fixed;
  z-index: 10;
  left: 0;
  border-radius: 0 12px 12px 0;
  background: ${BackgroundColors.menu};
  gap: ${RedesignSpacings.lg};
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.xxs} ${RedesignSpacings.xxxl} ${RedesignSpacings.xxs};
  transition: all 0.1s linear;
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
  color: ${TextColors.accent};
  cursor: pointer;
  background-color: ${BackgroundColors.ticketBand};
  border-radius: 6px;
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
              <SwitchButton onClick={toggle}>
                <Icon size="sm" zIndex={0} src={closeDrawerIcon} />
              </SwitchButton>
            </>
          ) : (
            <SwitchButton onClick={toggle}>
              <Icon size="sm" zIndex={0} src={openDrawerIcon} />
            </SwitchButton>
          )}
        </SwitchRow>

        <MenuItem href="/home" isOpen={isOpen}>
          <Icon size="sm" zIndex={0} src={homeIcon} />
          {isOpen && <Typography size="sm"> {t('menu.home')}</Typography>}
        </MenuItem>
      </Section>

      <Section isOpen={isOpen}>
        <MenuItem href="/home#mainInfoButtons" isOpen={isOpen}>
          <Icon size="sm" zIndex={0} src={infoIcon} />
          {isOpen && <Typography size="sm"> {t('menu.whatAndWhere')}</Typography>}
        </MenuItem>

        <TicketsSection>
          <MenuItem href="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832" target="_blank" isOpen={isOpen}>
            <Icon size="sm" zIndex={0} src={ticketIcon} />
            {isOpen && <Typography size="sm">{t('menu.entranceTicket')}</Typography>}
          </MenuItem>

          <MenuItem
            href="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358"
            target="_blank"
            isOpen={isOpen}>
            <Icon size="sm" zIndex={0} src={ticketMediumIcon} />
            {isOpen && <Typography size="sm">{t('menu.workshopTickets')}</Typography>}
          </MenuItem>

          <MenuItem href="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833" target="_blank" isOpen={isOpen}>
            <Icon size="sm" zIndex={0} src={ticketLightIcon} />
            {isOpen && <Typography size="sm">{t('menu.cruiseTickets')}</Typography>}
          </MenuItem>
        </TicketsSection>

        <MenuItem href="/home#workshops" isOpen={isOpen}>
          <Icon size="sm" zIndex={0} src={workshopIcons} />
          {isOpen && <Typography size="sm">{t('menu.workshops')}</Typography>}
        </MenuItem>

        <MenuItem href="/home#vendors" isOpen={isOpen}>
          <Icon size="sm" zIndex={0} src={shopIcon} />
          {isOpen && <Typography size="sm">{t('menu.vendors')}</Typography>}
        </MenuItem>

        <MenuItem href="/home#lastEdition" isOpen={isOpen}>
          <Icon size="sm" zIndex={0} src={paintingIcon} />
          {isOpen && <Typography size="sm">{t('menu.memories')}</Typography>}
        </MenuItem>
      </Section>

      <Section isOpen={isOpen}>
        <MenuItem href="/hall" isOpen={isOpen}>
          <Icon size="sm" zIndex={0} src={pinEllipseIcon} />
          {isOpen && <Typography size="sm">{t('menu.hallMap')}</Typography>}
        </MenuItem>

        <MenuItem href="/info-for-vendors#stands" isOpen={isOpen}>
          <Icon size="sm" zIndex={0} src={handshakeIcon} />
          {isOpen && <Typography size="sm">{t('menu.infoForVendors')}</Typography>}
        </MenuItem>

        <MenuItem href="/statutes" isOpen={isOpen}>
          <Icon size="sm" zIndex={0} src={contractIcon} />
          {isOpen && <Typography size="sm">{t('menu.statutes')}</Typography>}
        </MenuItem>

        <MenuItem href="#footer" isOpen={isOpen}>
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
