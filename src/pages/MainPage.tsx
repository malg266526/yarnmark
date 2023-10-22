import React from 'react';
import styled from 'styled-components';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import HeaderBanner from './../assets/images/spruce_green_wave.svg';
import YarnmarkLogoUrl from './../assets/images/yarnmark_logo.jpg';
import WawelIconUrl from './../assets/images/wawel_bing_icon.jpg';
import WoolIconUrl from './../assets/images/wool_bing_icon.jpg';

import { Box } from '../components/Box';
import { Colors } from '../styles/theme';
import { Header, LinkButton, Logo } from './MainPage.styled';
import { Page, PageContent } from '../components/PageContent';
import { Button } from '../components/Button';

export const Banner = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

export const PhotoFrame = styled.div<{ size?: 'small' | 'large' }>`
  width: ${({ size }) => (size === 'large' ? '260px' : '200px')};
  height: ${({ size }) => (size === 'large' ? '260px' : '200px')};
  border: 6px solid ${Colors.white};
  border-bottom: 36px solid ${Colors.white};
  background-color: ${Colors.white};
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
`;

export const RowLayout = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;

export const MainPage = () => {
  const t = useTypedTranslation();

  return (
    <Page>
      <Banner>
        <Box width="100%" height="300px" color={Colors.spruce} />
        <img width="100%" src={HeaderBanner} />
      </Banner>

      <Header>
        <Menu>
          <Link href="/workshops">{t('menu.workshops')}</Link>

          <Link href="/vendors">{t('menu.vendors')}</Link>

          <Link href="/contact">{t('menu.contact')}</Link>
        </Menu>
      </Header>

      <PageContent>
        <RowLayout>
          <PhotoFrame>
            <Logo width={200} src={WoolIconUrl} alt="logo" />
          </PhotoFrame>

          <PhotoFrame size="large">
            <Logo width={260} src={YarnmarkLogoUrl} alt="logo" />
          </PhotoFrame>

          <PhotoFrame>
            <Logo width={200} src={WawelIconUrl} alt="logo" />
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
    </Page>
  );
};
