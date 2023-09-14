import React from 'react';
import { Button } from '../components/Button';
import { Menu } from '../components/Menu';
import YarnmarkLogoUrl from './../assets/images/yarnmark_logo.jpg';
import styled from 'styled-components';
import { Theme } from '../styles/theme';
import { Link } from '../components/Link';
import { Spacings } from '../styles/spacings';
import { useTranslation } from 'react-i18next';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  background-color: ${Theme.secondary};
  padding-right: ${Spacings.lg};
  padding-left: ${Spacings.lg};
  padding-top: ${Spacings.xs};
  padding-bottom: ${Spacings.md};
`;

const Logo = styled.img`
  align-self: center;
  margin-top: ${Spacings.lg};
`;

const LinkButton = styled.a`
  align-self: center;
`;

const Details = styled.div`
  font-family: 'Roboto';
  font-weight: 300;
`;

const StyledH3 = styled.h3`
  font-weight: 300;
`;

const StyledH4 = styled.h4`
  font-weight: 300;
`;

export const MainPage = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <Header>
        <Menu>
          <Link href="https://google.com" target="_blank" rel="noreferrer">
            {t('menu.workshops')}
          </Link>

          <Link href="https://google.com" target="_blank" rel="noreferrer">
            {t('menu.vendors')}
          </Link>

          <Link href="https://google.com" target="_blank" rel="noreferrer">
            {t('menu.organizers')}
          </Link>

          <Link href="https://google.com" target="_blank" rel="noreferrer">
            {t('menu.contact')}
          </Link>
        </Menu>

        <Logo width={300} src={YarnmarkLogoUrl} alt="logo" />

        <LinkButton href="https://google.com" target="_blank" rel="noreferrer">
          <Button> Kup Bilet </Button>
        </LinkButton>
      </Header>

      <Details>
        <h2> Kraków</h2>
        <StyledH3> 27.04</StyledH3>
        <StyledH3> Stara Zajezdnia</StyledH3>
        <StyledH4>Świętego Wawrzyńca 12</StyledH4>
      </Details>
    </div>
  );
};
