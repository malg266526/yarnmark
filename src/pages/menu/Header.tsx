import { usePhone } from '../../hooks/usePhone';
import React from 'react';
import { Menu } from './Menu';
import { Curtain } from '../../components/Curtain';
import { Typography } from '../../components/Typography';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useToggle } from '../../hooks/useToggle';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { TextColors } from '../../styles/theme';
import { Button } from '../../components/Button';
import dotsVerticalIcon from '../../assets/figmaIcons/dots_vertical_icon.svg';

const MobileHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 100;
  top: 0;
  position: sticky;
  padding: ${RedesignSpacings.sm} 16px ${RedesignSpacings.xs} 16px;
  color: ${TextColors.secondary};
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

export const Header = () => {
  const isPhone = usePhone();
  const [isMenuOpen, toggleMenu, close] = useToggle(false);

  if (isPhone) {
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

        <Menu isVisible={isMenuOpen} closeMenu={close} />
      </>
    );
  }

  return <Menu isVisible={true} />;
};
