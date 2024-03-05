import { Icon as IconifyIcon } from '@iconify/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../App.styled';
import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import { Band } from '../components/Band';
import { BurgerMenu } from '../components/BurgerMenu';
import { Curtain } from '../components/Curtain';
import { Link } from '../components/Link';
import { NiceBox } from '../components/NiceBox';
import { SideBar } from '../components/SideBar';
import { TextWrapper, Title } from '../components/Title';
import { FontSize } from '../styles/font-size';
import { Spacings } from '../styles/spacings';
import { BrownScale } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import sweatersBackgroundUrlAvif from './../assets/backgrounds/sweaters_background.avif';
import sweatersBackgroundUrl from './../assets/backgrounds/sweaters_background.jpg';
import sweatersBackgroundUrlWebp from './../assets/backgrounds/sweaters_background.webp';
import { StyledPageContent } from './InfoForVendorsPage.styled';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, MenuBackground, MainBackground } from './MainPage.styled';
import { usePhone } from './usePhone';

const StatuteTitle = styled(Title)`
  font-size: ${FontSize.xl};
  text-align: center;
`;

const Card = styled.div`
  display: flex;
  background-color: white;
  padding: ${Spacings.md};
  border-radius: 4px;
  box-shadow: 2px 2px 15px 0px rgba(121, 59, 59, 0.25);
  flex: 1 1 auto;
  z-index: 0;
  flex-direction: column;
  gap: ${Spacings.md};
`;

const StatuteWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatutesPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  const [burgerActive, setBurgerActive] = useState(false);
  const closeSideBar = () => setBurgerActive(false);

  return (
    <StyledPageContent variant="wide" padding="none">
      {isPhone && <Curtain onClick={() => setBurgerActive(false)} active={burgerActive} />}

      {isPhone && (
        <>
          <Header>
            <BurgerMenu onClick={() => setBurgerActive((prevValue) => !prevValue)} active={burgerActive} />
          </Header>

          <SideBar roundedCorners="left" active={burgerActive}>
            <SideBar.LinkEntry
              to="/"
              onClick={() => {
                closeSideBar();
              }}>
              <IconifyIcon icon="game-icons:wool" width="24" />
              Yarnmark
            </SideBar.LinkEntry>

            <SideBar.LinkEntry onClick={closeSideBar} to="/info-for-vendors">
              <IconifyIcon icon="material-symbols:info-outline" width="24" />
              {t('menu.infoForVendors')}
            </SideBar.LinkEntry>

            <SideBar.LinkEntry
              to="#footer"
              onClick={() => {
                closeSideBar();
              }}>
              <IconifyIcon icon="clarity:talk-bubbles-solid" width="24" />
              {t('menu.contact')}
            </SideBar.LinkEntry>

            <LanguageSwitcher />
          </SideBar>
        </>
      )}

      {!isPhone && (
        <>
          <LanguageSwitcher />

          <Menu>
            <MenuBackground>
              <Link color="black" to="/">
                Yarnmark
              </Link>

              <Link color="black" to="/info-for-vendors">
                {t('menu.infoForVendors')}
              </Link>

              <Link color="black" to="#footer">
                {t('menu.contact')}
              </Link>
            </MenuBackground>
          </Menu>
        </>
      )}

      <Band size="sm" justify="flex-start" narrowContent="auto" padding="md">
        <MainBackground>
          <source srcSet={woolsAvifLandscape} type="image/avif" />
          <img src={woolsWebpLandscape} alt="wool" />
        </MainBackground>

        <Band.Slot>
          <NiceBox overflowSize="10px" width="500px" padding="lg">
            <TextWrapper>
              <Title>Regulaminy</Title>
            </TextWrapper>
          </NiceBox>
        </Band.Slot>
      </Band>

      <Band
        size="lg"
        justify="flex-start"
        narrowContent="auto"
        padding="lg"
        variant="background"
        color={BrownScale[100]}>
        <Card>
          <TextWrapper>
            <StatuteTitle>Regulamin Krakoskiego Yarnmarku Wełny</StatuteTitle>
          </TextWrapper>

          <StatuteWrapper>
            <ol>
              <li>
                Włóczykijki s.c. oraz Dziergamy na polu są organizatorami (dalej: “Organizator”) wydarzenia Krakoski
                Yarnmark Wełny (dalej: “Yarnmark”), który odbywa się w dniu 27 kwietnia 2024 roku na terenie Hali
                Cracovii (dalej “Hala”) w godzinach od 10:00 do 18:00
              </li>
              <li>
                Wstęp na Yarnmark jest biletowany. Bilety można zakupić jedynie on-line w cenie:
                <ul>
                  <li>30 zł standard (25 zł od 14.02.2024r do 29.02.2024r)</li>
                  <li>130 zł premium</li>
                </ul>
              </li>
              <li>Na Halę mogą bezpłatnie wejść dzieci do 10 roku życia pod opieką rodzica lub opiekuna.</li>
              <li>
                Zakup biletu stanowi akceptację niniejszego regulaminu oraz Regulaminu Hali oraz Instrukcji
                Bezpieczeństwa Pożarowego dla Hala Cracovii
              </li>
              <li>
                Uczestnikiem Yarnmarku jest każda osoba, która zakupiła bilet, okazała go na wejściu Organizatorowi oraz
                otrzymała opaskę identyfikacyjną na rękę. Opaska identyfikacyjna uprawnia do przebywania na Yarnmarku w
                godzinach 10-18, z możliwością wyjścia oraz powrotu na teren Hali oraz Yarnmarku. Opaskę należy mieć
                założona przez cały czas trwania Yarnmarku.
              </li>
              <li>
                Ilość biletów jest ograniczona i decyduje kolejność zakupu, bilet na Yarnamrk nie podlega zwrotowi.
              </li>
              <li>
                Nabywca biletu może go odsprzedać osobie trzeciej, po uprzednim poinformowaniu Organizatorów najpóźniej
                na dwa dni przed datą Yarnmarku.
              </li>
              <li>
                W przypadku dokonania zniszczeń lub uszkodzeń, osoby odpowiedzialne zostaną pociągnięte do
                odpowiedzialności materialnej
              </li>
              <li>
                Na terenie obiektu obowiązuje zakaz przebywania osób w stanie wskazującym na spożycie alkoholu lub na
                odurzenie innymi substancjami, w przypadku złamania zakazu, osoby takie nie będą wpuszczane lub będą
                wypraszane z Hali Cracovia (osoby wyproszone, nie będa miały możliwości ubiegania się o zwrot pieniędzy
                za bilet)
              </li>
              <li>
                Organizator zastrzega sobie prawo do utrwalania przebiegu Yarnmarku. Wstęp na teren Hali Cracovii jest
                równoznaczny z udzieleniem zgody przez Uczestnika na nieodpłatne nagrywanie, fotografowanie lub
                filmowanie osoby Uczestnika w związku z Yarnmarkiem oraz na nieodpłatne użycie jego wizerunku, głosu i
                wypowiedzi zarejestrowanych podczas nagrania Imprezy w dowolnych audycjach tworzonych przez Organizatora
                oraz w materiałach promocyjnych lub reklamowych
              </li>
              <li>
                Zabrania się:
                <ul>
                  <li>sprzedaży bez zgody Organizatorów z tzw “dzikich stoisk”</li>
                  <li>palenia papierosów</li>
                  <li>wnoszenia i spożywania alkoholu lub środków odurzających</li>
                  <li>wnoszenia przedmiotów mogących zagrozić życiu lub zdrowiu ludzkiemu</li>
                  <li>rozstawiania stojaków, wieszaków, reklam itp. bez wcześniejszej zgody Organizatorów</li>
                  <li>wejścia i przebywania w strefach Hali Cracovii wyłączonych dla uczestników</li>
                  <li>blokowania ciągów komunikacyjnych, dróg dojazdowych dla służb ratunkowych, dróg ewakuacyjnych</li>
                  <li>
                    wprowadzania psów i innych zwierząt, za wyjątkiem psów przewodników i psów będących asystentami osób
                    z niepełnosprawnością
                  </li>
                </ul>
              </li>
              <li>Sprzedaż prowadzona jest wyłącznie na stoiskach Wystawców.</li>
              <li>
                Sprzedawcy oraz Sklepy wystawiają swoje produkty oraz towary na Yarnmarku, prowadzą sprzedaż we własnym
                zakresie i na własny rachunek. Organizatorzy nie ponoszą odpowiedzialności za produkty oraz towary
                oferowane przez Wystawców.
              </li>
              <li>
                Organizatorzy nie ponoszą odpowiedzialności za przedmioty wartościowe pozostawione przez Uczestników bez
                nadzoru na terenie Hali Cracovia i terenie Yarnmarku.
              </li>
              <li>
                Osoby niepełnoletnie mogą przebywać na Yarnmarku wyłącznie pod opieką rodzica lub dorosłego opiekuna. Za
                szkody wyrządzone przez osoby niepełnoletnie odpowiadają ich rodzice lub opiekunowie.
              </li>
              <li>
                Uczestnicy Imprezy są zobowiązani do przestrzegania obowiązujących w dniu Imprezy przepisów sanitarno –
                epidemiologicznych.
              </li>
              <li>
                Organizatorzy zastrzegają sobie prawo do dokonania zmian w przebiegu Yarnmarku w okolicznościach, za
                które nie ponoszą odpowiedzialności (w szczególności z przyczyn związanych ze stanem zagrożenia
                epidemicznego), w tym do odwołania Imprezy lub zmiany jej terminu. W przypadku zmiany terminu, bilety
                zachowują ważność.
              </li>
              <li>
                Wejście lub wjazd na teren Hali Cracovii jest równoznaczne z wyrażeniem zgody na nagrywanie dla potrzeb
                Organizatorów lub Cracovii oraz jest równoznaczne z akceptacją monitoringu. Nagrania z monitoringu mogą
                być podstawą pociągnięcia do prawnej odpowiedzialności osób, które nie stosują się do niniejszego
                Regulaminu.
              </li>
            </ol>
          </StatuteWrapper>
        </Card>
      </Band>

      <Band
        size="lg"
        justify="flex-start"
        padding="lg"
        narrowContent="auto"
        variant="background-image"
        background={
          <Band.Picture>
            <source srcSet={sweatersBackgroundUrlAvif} type="image/avif" />
            <source srcSet={sweatersBackgroundUrlWebp} type="image/webp" />
            <img src={sweatersBackgroundUrl} alt="wool background" style={{ objectFit: 'cover' }} />
          </Band.Picture>
        }>
        <Card>
          <TextWrapper>
            <StatuteTitle>Regulamin Warsztatów</StatuteTitle>
          </TextWrapper>

          <StatuteWrapper>
            <ol>
              <li>
                Warsztaty odbywają się zgodnie z Harmonogramem ustalonym przez Organizatorów Krakoskiego Yarnmarku
                Wełny.
              </li>
              <li>
                Każdy Warsztat jest prowadzony zgodnie z planem ustalonym pomiędzy Prowadzącym Warsztaty a
                Organizatorami.
              </li>
              <li>
                Ilość miejsc na na każdym Warsztacie jest ograniczona i zależy od rodzaju warsztatów oraz zaleceń
                Prowadzącego
              </li>
              <li>W przypadku rezygnacji z uczestnictwa w warsztatach, wniesiona opłata nie podlega zwrotowi.</li>
              <li>
                W przypadku zbyt małej liczby chętnych bądź odwołania warsztatów z innych przyczyn, wniesione opłaty
                zostaną niezwłocznie zwrócone na rachunek bankowy uczestnika. Ewentualne uczestnictwo w Yarnmarku wymaga
                wówczas zakupu standardowego biletu.
              </li>
              <li>
                Uczestnicy warsztatów zobowiązani są do przygotowania się do warsztatów zgodnie z wymaganiami podanymi
                przy opisie warsztatów.
              </li>
              <li>
                Udział w warsztatach jest równoznaczny z wyrażeniem zgody na fotografowanie i filmowanie uczestników
                oraz ich prac, a także na wykorzystanie ich wizerunku w materiałach promocyjnych prezentowanych w
                mediach, na stronie internetowej oraz portalach społecznościowych.
              </li>
              <li>
                Udział w warsztatach jest równoznaczny z przyjęciem do wiadomości i zaakceptowaniem niniejszego
                regulaminu
              </li>
            </ol>
          </StatuteWrapper>
        </Card>
      </Band>
    </StyledPageContent>
  );
};
