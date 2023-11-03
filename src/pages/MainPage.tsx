import React from 'react';

import WawelIconUrl from './../assets/images/wawel_flaticon.jpg';
import WoolIconUrl from './../assets/images/wool_basket.jpg';
import YarnmarkLogoUrl from './../assets/images/yarnmark_logo.jpg';
import { Button } from '../components/Button';
import { LinkButton, Logo, PhotoFrame, RowLayout } from './MainPage.styled';

export const MainPage = () => {
  return (
    <>
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
      {/*   <Details>
        <h2> Kraków</h2>
        <StyledH3> 27.04</StyledH3>
        <StyledH3> Stara Zajezdnia</StyledH3>
        <StyledH4>Świętego Wawrzyńca 12</StyledH4>
      </Details> */}
    </>
  );
};
