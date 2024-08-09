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
import ellipseLight from '../../assets/figmaIcons/ellipse_light.svg';
import ellipseMedium from '../../assets/figmaIcons/ellipse_medium.svg';
import ellipseStrong from '../../assets/figmaIcons/ellipse_strong.svg';
import { useToggle } from '../../hooks/useToggle';
import { Button } from '../../components/Button';

const RootLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  position: fixed;
  z-index: 10;
  left: 0;
  border-radius: 0 12px 12px 0;
  background: ${BackgroundColors.menu};
  gap: ${RedesignSpacings.lg};
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.xs} ${RedesignSpacings.xxxl} ${RedesignSpacings.xs};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.25px solid #326213;
  gap: ${RedesignSpacings.xs};
  padding-bottom: 15px;
`;

const MenuItem = styled.a`
  display: flex;
  height: 32px;
  align-items: center;
  padding: 0 ${RedesignSpacings.xs};
  gap: ${RedesignSpacings.sm};
  text-decoration: none;
  color: ${TextColors.accent};
  cursor: pointer;
`;

const SwitchRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${RedesignSpacings.lg} ${RedesignSpacings.xs};
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: ${RedesignSpacings.xs};
  padding: ${RedesignSpacings.xs};
`;

export const SideMenu = () => {
  const t = useTypedTranslation();

  const [isOpen, toggle] = useToggle();

  return (
    <RootLayout>
      <Section>
        <Dots>
          <Icon size="xs" zIndex={0} src={ellipseLight} />
          <Icon size="xs" zIndex={0} src={ellipseMedium} />
          <Icon size="xs" zIndex={0} src={ellipseStrong} />
        </Dots>

        <SwitchRow>
          {isOpen ? (
            <>
              <Picture picture={yarnmarkLogoPictureConfig} alt="yarnmark_logo" width={40} height={50} />
              <Button onClick={toggle}>
                <Icon size="sm" zIndex={0} src={closeDrawerIcon} />
              </Button>
            </>
          ) : (
            <Button onClick={toggle}>
              <Icon size="sm" zIndex={0} src={openDrawerIcon} />
            </Button>
          )}
        </SwitchRow>

        <MenuItem href="/home">
          <Icon size="sm" zIndex={0} src={homeIcon} />
          {t('menu.home')}
        </MenuItem>
      </Section>

      <Section>
        <MenuItem href="/home#mainInfoButtons">
          <Icon size="sm" zIndex={0} src={infoIcon} />
          {t('menu.whatAndWhere')}
        </MenuItem>

        <MenuItem href="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832" target="_blank">
          <Icon size="sm" zIndex={0} src={ticketIcon} />
          {t('menu.entranceTicket')}
        </MenuItem>

        <MenuItem href="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358" target="_blank">
          <Icon size="sm" zIndex={0} src={ticketMediumIcon} />
          {t('menu.workshopTickets')}
        </MenuItem>

        <MenuItem href="https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833" target="_blank">
          <Icon size="sm" zIndex={0} src={ticketLightIcon} />
          {t('menu.cruiseTickets')}
        </MenuItem>

        <MenuItem href="/home#workshops">
          <Icon size="sm" zIndex={0} src={workshopIcons} />
          {t('menu.workshops')}
        </MenuItem>

        <MenuItem href="/home#vendors">
          <Icon size="sm" zIndex={0} src={shopIcon} />
          {t('menu.vendors')}
        </MenuItem>

        <MenuItem href="/home#lastEdition">
          <Icon size="sm" zIndex={0} src={paintingIcon} />
          {t('menu.memories')}
        </MenuItem>
      </Section>

      <Section>
        <MenuItem href="/hall">
          <Icon size="sm" zIndex={0} src={pinEllipseIcon} />
          {t('menu.hallMap')}
        </MenuItem>

        <MenuItem href="/info-for-vendors#stands">
          <Icon size="sm" zIndex={0} src={handshakeIcon} />
          {t('menu.infoForVendors')}
        </MenuItem>

        <MenuItem href="/statutes">
          <Icon size="sm" zIndex={0} src={contractIcon} />
          {t('menu.statutes')}
        </MenuItem>
      </Section>
    </RootLayout>
  );
};
