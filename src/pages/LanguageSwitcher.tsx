import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { RedesignSpacings } from '../styles/spacings';
import polandIcon from '../assets/figmaIcons/poland_round_icon.svg';
import greatBritainIcon from '../assets/figmaIcons/great_britain_round_icon.svg';
import germanyIcon from '../assets/figmaIcons/german_round_icon.svg';
import { Icon } from '../components/Icon';
import { useToggle } from '../hooks/useToggle';
import chevronDownIcon from '../assets/figmaIcons/chevron_down-icon.svg';
import { Button } from '../components/Button';
import { BackgroundColors } from '../styles/theme';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
`;

const CurrentLanguageRow = styled.div<{ justify?: 'center' | 'space-between' }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'space-between'};
  cursor: pointer;
  padding: ${RedesignSpacings.xxs};
`;

const ChevronIcon = styled(Icon)`
  transition: all 0.2s linear;

  &.active {
    transform: rotate(180deg);
  }
`;

const Flags = styled.div<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-height: ${({ isOpen }) => (isOpen ? '120px' : '0px')};
  transition: all 0.2s ease-in;
  overflow: hidden;
  gap: ${RedesignSpacings.xxs};
  background-color: ${BackgroundColors.ticketBand};
  border-radius: 6px;
`;

export type LanguageOption = 'pl' | 'en' | 'de';

const FlagsSrc: Record<string, string> = {
  pl: polandIcon,
  en: greatBritainIcon,
  de: germanyIcon
};

interface LanguageSwitcherProps {
  isOpen?: boolean;
}

export const LanguageSwitcher = ({ isOpen }: LanguageSwitcherProps) => {
  const [, i18n] = useTranslation('common');

  const { language, changeLanguage } = i18n;

  const flagSrc: string = FlagsSrc[language];

  const [isLanguageSwitchOpen, toggleLanguageSwitch, closeSwitch] = useToggle();

  const onChangeLanguageClicked = (language: LanguageOption) => {
    changeLanguage(language);
    localStorage.setItem('language', language);
    closeSwitch();
  };

  return (
    <Root>
      <CurrentLanguageRow onClick={toggleLanguageSwitch} justify={isOpen ? 'space-between' : 'center'}>
        <Icon size="sm" zIndex={0} src={flagSrc} />

        {isOpen && (
          <ChevronIcon size="18px" zIndex={0} src={chevronDownIcon} className={isLanguageSwitchOpen ? `active` : ''} />
        )}
      </CurrentLanguageRow>

      <Flags isOpen={isLanguageSwitchOpen}>
        <Button onClick={() => onChangeLanguageClicked('pl')}>
          <Icon size="sm" src={polandIcon} />
        </Button>
        <Button onClick={() => onChangeLanguageClicked('en')}>
          <Icon size="sm" src={greatBritainIcon} />
        </Button>
        <Button onClick={() => onChangeLanguageClicked('de')}>
          <Icon size="sm" src={germanyIcon} />
        </Button>
      </Flags>
    </Root>
  );
};
