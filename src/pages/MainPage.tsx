import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCartShopping, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import HeaderBanner from './../assets/images/spruce_green_wave.svg';
import WawelIconUrl from './../assets/images/wawel_flaticon.jpg';
import WoolIconUrl from './../assets/images/wool_basket.jpg';
import YarnmarkLogoUrl from './../assets/images/yarnmark_logo.jpg';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { PageContent } from '../components/PageContent';
import { Colors } from '../styles/theme';
import { Banner, Header, LinkButton, Logo, PhotoFrame, Curtain, StyledPage, RowLayout } from './MainPage.styled';
import { usePhone } from './usePhone';
import { BurgerMenu } from '../components/BurgerMenu';
import { SideBar } from '../components/SideBar';

export const MainPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const [burgerActive, setBurgerActive] = useState(false);

  return (
    <StyledPage>
      {isPhone && <Curtain onClick={() => setBurgerActive(false)} className={burgerActive ? 'active' : undefined} />}
      <Banner>
        <Box width="100%" height="300px" color={Colors.spruce} />
        <img width="100%" src={HeaderBanner} />
      </Banner>

      <Header>
        {isPhone && (
          <>
            <SideBar roundedCorners="left" className={burgerActive ? 'visible' : undefined}>
              <SideBar.LinkEntry href="/workshops">
                <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                {t('menu.workshops')}
              </SideBar.LinkEntry>
              <SideBar.LinkEntry href="/vendors">
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                {t('menu.vendors')}
              </SideBar.LinkEntry>
              <SideBar.LinkEntry href="/contact">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                {t('menu.contact')}
              </SideBar.LinkEntry>
            </SideBar>
            <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
          </>
        )}
        {!isPhone && (
          <Menu>
            <Link href="/workshops">{t('menu.workshops')}</Link>

            <Link href="/vendors">{t('menu.vendors')}</Link>

            <Link href="/contact">{t('menu.contact')}</Link>
          </Menu>
        )}
      </Header>

      <PageContent>
        <RowLayout>
          <PhotoFrame>
            <Logo width={200} src={WawelIconUrl} alt="logo" />
          </PhotoFrame>

          <PhotoFrame size="large">
            <Logo width={260} src={YarnmarkLogoUrl} alt="logo" />
          </PhotoFrame>

          <PhotoFrame>
            <Logo width={200} src={WoolIconUrl} alt="logo" />
          </PhotoFrame>
        </RowLayout>

        <LinkButton href="https://google.com" target="_blank" rel="noreferrer">
          <Button> Kup Bilet </Button>
        </LinkButton>
      </PageContent>

      {/*   <Details>
        <h2> Kraków</h2>
        <StyledH3> 27.04</StyledH3>
        <StyledH3> Stara Zajezdnia</StyledH3>
        <StyledH4>Świętego Wawrzyńca 12</StyledH4>
      </Details> */}
    </StyledPage>
  );
};
