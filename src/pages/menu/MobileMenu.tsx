import { Curtain } from '../../components/Curtain';
import { LanguageSwitcher } from '../LanguageSwitcher';
import React from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { Typography } from '../../components/Typography';
import { TextColors } from '../../styles/theme';
import { Button } from '../../components/Button';
import dotsVerticalIcon from '../../assets/figmaIcons/dots_vertical_icon.svg';
import { useToggle } from '../../hooks/useToggle';
import { UpgradedMenu } from './UpgradedMenu';

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

      <UpgradedMenu isVisible={isMenuOpen} />
    </>
  );
};
