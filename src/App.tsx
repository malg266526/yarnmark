import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import emailIconUrl from './assets/figmaIcons/email_icon.svg';
import instagramIconUrl from './assets/figmaIcons/instagram_icon.svg';
import talkImageUrl from './assets/iconify/talk.svg';
import { Icon } from './components/Icon';
import { MinimalistLayout } from './components/MinimalistLayout';
import { RowLayout } from './components/RowLayout';
import { Root, Footer, LeftBackgroundImage, TransparentText, VanillaLink } from './App.styled';
import { InfoForVendorsPage } from './pages/for-vendors/InfoForVendorsPage';
import { MainPage } from './pages/main-page/MainPage';
import { useTypedTranslation } from './translations/useTypedTranslation';
import { TextColors } from './styles/theme';
import { StatutesPage } from './pages/StatutesPage';
import { FontToScreenSize } from './styles/font-to-screen-size';
import { ScreenSize } from './styles/screeen-size';
import { HallMapPage } from './pages/HallMapPage';
import { Typography } from './components/Typography';
import { usePhone } from './hooks/usePhone';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${FontToScreenSize.pc};

    @media (max-width: ${ScreenSize.smallPc}) {
      font-size: ${FontToScreenSize.smallPc};
    }

    @media (max-width: ${ScreenSize.tablet}) {
      font-size: ${FontToScreenSize.tablet};
    }

    @media (max-width: ${ScreenSize.phone}) {
      font-size: ${FontToScreenSize.phone};
    }
  }

  
  body {
    margin: 0;
    font-family: 'Love Ya Like A Sister', sans-serif !important;
    color: ${TextColors.primary};
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif; */
  }

  /** bootstrap adds margin for p elements; line below removes it */
  P {
    margin-top: initial;
    margin-bottom: initial;
  }

  * {
    box-sizing: border-box;
  }
`;

export const App = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  const textSize = isPhone ? 'sm' : 'md';
  const iconSize = isPhone ? 'md' : 'lg';

  return (
    <>
      <GlobalStyle />

      <Root id="root">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/info-for-vendors" element={<InfoForVendorsPage />} />
          <Route path="/statutes" element={<StatutesPage />} />
          <Route path="/hall" element={<HallMapPage />} />
        </Routes>

        <Footer id="footer">
          <TransparentText>Dziewiarskie targi welny krakow 2024</TransparentText>

          <MinimalistLayout>
            <Typography size={isPhone ? 'xl' : 'xxl'}>{t('contactPage.title')}</Typography>

            <RowLayout>
              <Icon size={iconSize} src={emailIconUrl} />
              <Typography size={textSize}>krakoski.yarnmark.welny@gmail.com</Typography>
            </RowLayout>

            <VanillaLink href="https://www.instagram.com/dziergamynapolu/" target="_blank" rel="noreferrer">
              <RowLayout>
                <Icon size={iconSize} src={instagramIconUrl} />
                <Typography size={textSize}>@dziergamynapolu</Typography>
              </RowLayout>
            </VanillaLink>

            <VanillaLink href="https://www.instagram.com/wloczykijki_sklep/" target="_blank" rel="noreferrer">
              <RowLayout>
                <Icon size={iconSize} src={instagramIconUrl} />
                <Typography size={textSize}>@wloczykijki_sklep</Typography>
              </RowLayout>
            </VanillaLink>

            <LeftBackgroundImage src={talkImageUrl} alt="talk_icon" />
          </MinimalistLayout>
        </Footer>
      </Root>
    </>
  );
};
