import React from 'react';
import { Button } from '../components/Button';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import YarnmarkLogoUrl from './../assets/images/yarnmark_logo.jpg';
import { Details, Header, LinkButton, Logo, StyledH3, StyledH4 } from './MainPage.styled';

export const MainPage = () => {
  const t = useTypedTranslation();

  return (
    <div>
      <Header>
        <Menu>
          <Link href="/workshops">{t('menu.workshops')}</Link>

          <Link href="/vendors">{t('menu.vendors')}</Link>

          <Link href="/contact">{t('menu.contact')}</Link>
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
