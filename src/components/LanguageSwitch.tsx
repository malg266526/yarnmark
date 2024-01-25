import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
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

const TransparentButton = styled.button`
  all: unset;
  padding-top: 2px;
  cursor: pointer;
`;

const LanguageText = styled.p<{ isSelected?: boolean }>`
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 400)};
  font-size: 18px;

  color: black;

  @media (max-width: ${ScreenSize.phone}) {
    color: white;
  }
`;

export interface MenuProps {
  children?: ReactNode;
  iconColor?: string;
}

export const LanguageSwitch = () => {
  const [, i18n] = useTranslation('common');

  const { language, changeLanguage } = i18n;

  return (
    <Root>
      <TransparentButton onClick={() => changeLanguage('pl')}>
        <LanguageText isSelected={language === 'pl'}>PL</LanguageText>
      </TransparentButton>
      <LanguageText>|</LanguageText>
      <TransparentButton onClick={() => changeLanguage('en')}>
        <LanguageText isSelected={language === 'en'}>EN</LanguageText>
      </TransparentButton>
    </Root>
  );
};
