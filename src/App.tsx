import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import emailImageUrl from './assets/iconify/email.svg';
import instagramImageUrl from './assets/iconify/instagram.svg';
import talkImageUrl from './assets/iconify/talk.svg';
import { Icon } from './components/Icon';
import { MinimalistLayout } from './components/MinimalistLayout';
import { RowLayout } from './components/RowLayout';

import { Root, Footer, RightBackgroundImage, TransparentText, VanillaLink } from './App.styled';
import { InfoForVendorsPage } from './pages/info-for-vendors/InfoForVendorsPage';
import { MainPage } from './pages/main-page/MainPage';
import { useTypedTranslation } from './translations/useTypedTranslation';
import { Colors } from './styles/theme';
import { StatutesPage } from './pages/StatutesPage';
import { FontToScreenSize } from './styles/font-to-screen-size';
import { ScreenSize } from './styles/screeen-size';
import { HallMapPage } from './pages/HallMapPage';
import { Typography } from './components/Typography';

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
    font-family: 'Lexend', sans-serif !important;
    color: ${Colors.text};
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
          <MinimalistLayout>
            <Typography size="xl" weight="bold">
              {t('contactPage.title')}
            </Typography>

            <RowLayout>
              <Icon size="xl" src={emailImageUrl} />
              krakoski.yarnmark.welny@gmail.com
            </RowLayout>

            <VanillaLink href="https://www.instagram.com/dziergamynapolu/" target="_blank" rel="noreferrer">
              <RowLayout>
                <Icon size="xl" src={instagramImageUrl} />
                @dziergamynapolu
              </RowLayout>
            </VanillaLink>

            <VanillaLink href="https://www.instagram.com/wloczykijki_sklep/" target="_blank" rel="noreferrer">
              <RowLayout>
                <Icon size="xl" src={instagramImageUrl} />
                @wloczykijki_sklep
              </RowLayout>
            </VanillaLink>

            <RightBackgroundImage src={talkImageUrl} alt="talk_icon" />
            <TransparentText>Dziewiarskie targi welny krakow 2024</TransparentText>
          </MinimalistLayout>
        </Footer>
      </Root>
    </>
  );
};
