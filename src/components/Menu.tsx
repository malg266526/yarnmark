import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { Link } from './Link';
import FlagPoland from './../assets/images/poland.png';
import FlagUk from './../assets/images/united-kingdom.png';
import { useTranslation } from 'react-i18next';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';

const Root = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: ${Spacings.sm};
  align-items: center;
  justify-content: center;
  max-width: ${Theme.menuMaxWidth};
`;

const Flag = styled.img`
  padding-top: 2px;
`;

const TransparentButton = styled.button`
  all: unset;
  padding-top: ${Spacings.xs};
  cursor: pointer;
`;

export interface MenuProps {
  children?: ReactNode;
  iconColor?: string;
}

export const Menu = ({ children, iconColor }: MenuProps) => {
  const [, i18n] = useTranslation('common');

  const { language, changeLanguage } = i18n;

  return (
    <Root>
      {children}

      <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
        <FontAwesomeIcon icon={faInstagram} size="lg" color={iconColor || 'white'} />
      </Link>

      <TransparentButton onClick={() => changeLanguage(language === 'pl' ? 'en' : 'pl')}>
        {language === 'pl' ? (
          <Flag width={30} src={FlagUk} alt="lang_uk" />
        ) : (
          <Flag width={30} src={FlagPoland} alt="lang_pl" />
        )}
      </TransparentButton>
    </Root>
  );
};
