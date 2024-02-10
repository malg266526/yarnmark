import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { Icon } from '@iconify/react';
import { Spacings } from '../styles/spacings';
import { ScreenSize } from '../styles/screeen-size';

const Root = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: ${Spacings.xs};
  align-items: center;
  justify-content: center;
  padding: 0 0 0 ${Spacings.xl};

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${Spacings.sm};
  }
`;

const Button = styled.button<{ selected: boolean }>`
  all: unset;
  display: inline-block;
  margin: 0;
  padding: 0;
  filter: grayscale(0.7);

  ${({ selected }) => selected && css`
   filter: none;
  `}
`;

export type LanguageOption = 'pl' | 'en';

export const LanguageSwitcher = styled((props: { className?: string }) => {
  const [, i18n] = useTranslation('common');

  const { language, changeLanguage } = i18n;

  const onChangeLanguageClicked = (language: LanguageOption) => {
    changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <Root {...props}>
      <Button onClick={() => onChangeLanguageClicked('pl')} selected={language === 'pl'} >
        <Icon width={50} icon="openmoji:flag-poland" />
      </Button>
      <Button onClick={() => onChangeLanguageClicked('en')} selected={language === 'en'} >
        <Icon width={50} icon="cif:us" />
      </Button>
    </Root>
  );
})``;
