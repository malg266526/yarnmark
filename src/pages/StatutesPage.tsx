import React from 'react';
import styled from 'styled-components';
import { BackgroundColors, Colors, TextColors } from '../styles/theme';
import { Header } from './menu/Header';
import { PageContent } from '../components/PageContent';
import { Band } from '../components/bands/Band';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { usePhone } from '../hooks/usePhone';
import { PlainInfo } from './for-vendors/ForVendorsPage.styled';
import { UtilityPageHeader } from '../components/UtilityPageHeader';
import { Typography } from '../components/Typography';
import { RedesignSpacings } from '../styles/spacings';
import { Radius as CardRadius, DropShadow as CardShadow } from '../styles/cards';

const StatutesStack = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

const IntroRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
`;

const IntroBadge = styled.div`
  padding: 6px 12px;
  border-radius: ${CardRadius.xxl};
  background: ${BackgroundColors.green.light};
  color: ${TextColors.secondary};
`;

const SectionCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.md};
  background: ${Colors.white};
  border-radius: ${CardRadius.xl};
  box-shadow: ${CardShadow.card};
`;

const SectionHeading = styled.div`
  padding-bottom: ${RedesignSpacings.xs};
  border-bottom: 1px solid rgba(50, 98, 19, 0.18);
`;

const StatueContent = styled(PlainInfo)`
  min-height: auto;
  max-width: none;

  ol {
    line-height: 22px;
  }
`;

export const StatutesPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  return (
    <PageContent variant="wide" padding="none">
      <Header />

      <Band.NarrowColumn
        id="statutes_header"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <StatutesStack>
          <UtilityPageHeader kicker={t('statutesPage.kicker')} title={t('menu.statutes')} />

          <IntroRow>
            <IntroBadge>
              <Typography size="xs">{t('statutesPage.badge')}</Typography>
            </IntroBadge>
          </IntroRow>

          <SectionCard>
            <SectionHeading>
              <Typography size="xl" weight="bold">
                {t('statutesPage.heading')}
              </Typography>
            </SectionHeading>

            <StatueContent>
              <ol>
                <li>
                  Włóczykijki s.c. oraz Dziergamy na polu są organizatorami (dalej: “Organizator”) wydarzenia Krakoski
                  Yarnmark (dalej: “Yarnmark”), który odbywa się w dniu 18 kwietnia 2026 roku na terenie Hali Cracovii
                  (dalej “Hala”) w godzinach od 10:00 do 17:00
                </li>
                <li>
                  Wstęp na Yarnmark jest biletowany. {/*Bilety będzie można zakupić on-line w cenie:*/}
                  {/*     <ul>
                <li>30 zł standard (25 zł od 14.02.2024r do 29.02.2024r)</li>
                <li>130 zł premium</li>
              </ul>*/}
                  <ol type="a">
                    <li>Możliwość zakupienia biletów drogą elektroniczną kończy się 17.04 o godzinie 12:00</li>
                    <li>
                      W dniu Yarnmarku będzie możliwość zakupienia biletów na miejscu u Organizatora. Płatność za pomocą
                      bliku, karty lub gotówką
                    </li>
                  </ol>
                </li>
                <li>Na Halę mogą bezpłatnie wejść dzieci do 10 roku życia pod opieką rodzica lub opiekuna.</li>
                <li>
                  Zakup biletu stanowi akceptację niniejszego regulaminu oraz Regulaminu Hali oraz Instrukcji
                  Bezpieczeństwa Pożarowego dla Hala Cracovii
                </li>
                <li>
                  Uczestnikiem Yarnmarku jest każda osoba, która zakupiła bilet, okazała go na wejściu Organizatorowi
                  oraz otrzymała opaskę identyfikacyjną na rękę. Opaska identyfikacyjna uprawnia do przebywania na
                  Yarnmarku w godzinach 10-17, z możliwością wyjścia oraz powrotu na teren Hali oraz Yarnmarku. Opaskę
                  należy mieć założona przez cały czas trwania Yarnmarku.
                </li>
                <li>
                  Ilość biletów jest ograniczona i decyduje kolejność zakupu, bilet na Yarnmark nie podlega zwrotowi.
                </li>
                <li>
                  Nabywca biletu może go odsprzedać osobie trzeciej, po uprzednim poinformowaniu Organizatorów
                  najpóźniej na dwa dni przed datą Yarnmarku.
                </li>
                <li>
                  W przypadku dokonania zniszczeń lub uszkodzeń, osoby odpowiedzialne zostaną pociągnięte do
                  odpowiedzialności materialnej
                </li>
                <li>
                  Na terenie obiektu obowiązuje zakaz przebywania osób w stanie wskazującym na spożycie alkoholu lub na
                  odurzenie innymi substancjami, w przypadku złamania zakazu, osoby takie nie będą wpuszczane lub będą
                  wypraszane z Hali Cracovia (osoby wyproszone, nie będa miały możliwości ubiegania się o zwrot
                  pieniędzy za bilet)
                </li>
                <li>
                  Organizator zastrzega sobie prawo do utrwalania przebiegu Yarnmarku. Wstęp na teren Hali Cracovii jest
                  równoznaczny z udzieleniem zgody przez Uczestnika na nieodpłatne nagrywanie, fotografowanie lub
                  filmowanie osoby Uczestnika w związku z Yarnmarkiem oraz na nieodpłatne użycie jego wizerunku, głosu i
                  wypowiedzi zarejestrowanych podczas nagrania Imprezy w dowolnych audycjach tworzonych przez
                  Organizatora oraz w materiałach promocyjnych lub reklamowych
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
                    <li>
                      blokowania ciągów komunikacyjnych, dróg dojazdowych dla służb ratunkowych, dróg ewakuacyjnych
                    </li>
                  </ul>
                </li>
                <li>Organizator nie zezwala na wprowadzanie psów na teren Yarnmarku.</li>
                <li>Sprzedaż prowadzona jest wyłącznie na stoiskach Wystawców.</li>
                <li>
                  Sprzedawcy oraz Sklepy wystawiają swoje produkty oraz towary na Yarnmarku, prowadzą sprzedaż we
                  własnym zakresie i na własny rachunek. Organizatorzy nie ponoszą odpowiedzialności za produkty oraz
                  towary oferowane przez Wystawców.
                </li>
                <li>
                  Organizatorzy nie ponoszą odpowiedzialności za przedmioty wartościowe pozostawione przez Uczestników
                  bez nadzoru na terenie Hali Cracovia i terenie Yarnmarku.
                </li>
                <li>
                  Osoby niepełnoletnie mogą przebywać na Yarnmarku wyłącznie pod opieką rodzica lub dorosłego opiekuna.
                  Za szkody wyrządzone przez osoby niepełnoletnie odpowiadają ich rodzice lub opiekunowie.
                </li>
                <li>
                  Uczestnicy Imprezy są zobowiązani do przestrzegania obowiązujących w dniu Imprezy przepisów
                  sanitarnych – epidemiologicznych.
                </li>
                <li>
                  Organizatorzy zastrzegają sobie prawo do dokonania zmian w przebiegu Yarnmarku w okolicznościach, za
                  które nie ponoszą odpowiedzialności (w szczególności z przyczyn związanych ze stanem zagrożenia
                  epidemicznego), w tym do odwołania Imprezy lub zmiany jej terminu. W przypadku zmiany terminu, bilety
                  zachowują ważność.
                </li>
                <li>
                  Wejście lub wjazd na teren Hali Cracovii jest równoznaczne z wyrażeniem zgody na nagrywanie dla
                  potrzeb Organizatorów lub Cracovii oraz jest równoznaczne z akceptacją monitoringu. Nagrania z
                  monitoringu mogą być podstawą pociągnięcia do prawnej odpowiedzialności osób, które nie stosują się do
                  niniejszego Regulaminu.
                </li>
              </ol>
            </StatueContent>
          </SectionCard>

          <SectionCard>
            <SectionHeading>
              <Typography size="xl" weight="bold">
                Regulamin Warsztatów
              </Typography>
            </SectionHeading>

            <StatueContent>
              <ol>
                <li>
                  Warsztaty odbywają się zgodnie z Harmonogramem ustalonym przez Organizatorów Krakoskiego Yarnmarku.
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
                  zostaną niezwłocznie zwrócone na rachunek bankowy uczestnika.
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
            </StatueContent>
          </SectionCard>
        </StatutesStack>
      </Band.NarrowColumn>
    </PageContent>
  );
};
