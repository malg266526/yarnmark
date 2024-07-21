import React from 'react';
import styled from 'styled-components';
import woolsAvifLandscape from '../assets/images/wools2_landscape.avif';
import woolsWebpLandscape from '../assets/images/wools2_landscape.webp';
import { Band } from '../components/Band';
import { SlantingFrameBox } from '../components/SlantingFrameBox';
import { Spacings } from '../styles/spacings';
import { BrownScale } from '../styles/theme';
import sweatersBackgroundUrlAvif from './../assets/backgrounds/sweaters_background.avif';
import sweatersBackgroundUrl from './../assets/backgrounds/sweaters_background.jpg';
import sweatersBackgroundUrlWebp from './../assets/backgrounds/sweaters_background.webp';
import { StyledPageContent } from './info-for-vendors/InfoForVendorsPage.styled';
import { FullSizePicture } from '../components/FullSizePicture';
import { Menu } from "./menu/Menu";
import { Typography } from "../components/Typography";

const CenteredParagraph = styled.div`
    text-align: center;
`;

const Card = styled.div`
    display: flex;
    background-color: white;
    padding: ${Spacings.md};
    border-radius: 4px;
    box-shadow: 2px 2px 15px 0 rgba(121, 59, 59, 0.25);
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

    return (
        <StyledPageContent variant="wide" padding="none">
            <Menu />

            <Band size="sm" justify="flex-start" narrowContent="auto" padding="md">
                <FullSizePicture>
                    <source srcSet={woolsAvifLandscape} type="image/avif" />
                    <img src={woolsWebpLandscape} alt="wool" />
                </FullSizePicture>

                <Band.Slot>
                    <SlantingFrameBox overflowSize="10px" width="500px" padding="lg">
                        <CenteredParagraph>
                            <Typography size="xxl" weight="bold">
                                Regulaminy
                            </Typography>
                        </CenteredParagraph>
                    </SlantingFrameBox>
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
                    <CenteredParagraph>
                        <Typography size="xl" weight="bold">
                            Regulamin Krakoskiego Yarnmarku Wełny
                        </Typography>
                    </CenteredParagraph>
                    
                    <StatuteWrapper>
                        <ol>
                            <li>
                                Włóczykijki s.c. oraz Dziergamy na polu są organizatorami (dalej: “Organizator”)
                                wydarzenia Krakoski
                                Yarnmark Wełny (dalej: “Yarnmark”), który odbywa się w dniu 27 kwietnia 2024 roku na
                                terenie Hali
                                Cracovii (dalej “Hala”) w godzinach od 10:00 do 18:00
                            </li>
                            <li>
                                Wstęp na Yarnmark jest biletowany. Bilety można zakupić on-line w cenie:
                                <ul>
                                    <li>30 zł standard (25 zł od 14.02.2024r do 29.02.2024r)</li>
                                    <li>130 zł premium</li>
                                </ul>
                                <ol type="a">
                                    <li>Możliwość zakupienia biletów drogą elektroniczną kończy się 26.04 o godzinie
                                        18:00
                                    </li>
                                    <li>
                                        W dniu Yarnmarku będzie możliwość zakupienia biletów na miejscu u Organizatora.
                                        Płatność za pomocą
                                        bliku, karty lub gotówką
                                    </li>
                                </ol>
                            </li>
                            <li>Na Halę mogą bezpłatnie wejść dzieci do 10 roku życia pod opieką rodzica lub opiekuna.
                            </li>
                            <li>
                                Zakup biletu stanowi akceptację niniejszego regulaminu oraz Regulaminu Hali oraz
                                Instrukcji
                                Bezpieczeństwa Pożarowego dla Hala Cracovii
                            </li>
                            <li>
                                Uczestnikiem Yarnmarku jest każda osoba, która zakupiła bilet, okazała go na wejściu
                                Organizatorowi oraz
                                otrzymała opaskę identyfikacyjną na rękę. Opaska identyfikacyjna uprawnia do przebywania
                                na Yarnmarku w
                                godzinach 10-18, z możliwością wyjścia oraz powrotu na teren Hali oraz Yarnmarku. Opaskę
                                należy mieć
                                założona przez cały czas trwania Yarnmarku.
                            </li>
                            <li>
                                Ilość biletów jest ograniczona i decyduje kolejność zakupu, bilet na Yarnamrk nie
                                podlega zwrotowi.
                            </li>
                            <li>
                                Nabywca biletu może go odsprzedać osobie trzeciej, po uprzednim poinformowaniu
                                Organizatorów najpóźniej
                                na dwa dni przed datą Yarnmarku.
                            </li>
                            <li>
                                W przypadku dokonania zniszczeń lub uszkodzeń, osoby odpowiedzialne zostaną pociągnięte
                                do
                                odpowiedzialności materialnej
                            </li>
                            <li>
                                Na terenie obiektu obowiązuje zakaz przebywania osób w stanie wskazującym na spożycie
                                alkoholu lub na
                                odurzenie innymi substancjami, w przypadku złamania zakazu, osoby takie nie będą
                                wpuszczane lub będą
                                wypraszane z Hali Cracovia (osoby wyproszone, nie będa miały możliwości ubiegania się o
                                zwrot pieniędzy
                                za bilet)
                            </li>
                            <li>
                                Organizator zastrzega sobie prawo do utrwalania przebiegu Yarnmarku. Wstęp na teren Hali
                                Cracovii jest
                                równoznaczny z udzieleniem zgody przez Uczestnika na nieodpłatne nagrywanie,
                                fotografowanie lub
                                filmowanie osoby Uczestnika w związku z Yarnmarkiem oraz na nieodpłatne użycie jego
                                wizerunku, głosu i
                                wypowiedzi zarejestrowanych podczas nagrania Imprezy w dowolnych audycjach tworzonych
                                przez Organizatora
                                oraz w materiałach promocyjnych lub reklamowych
                            </li>
                            <li>
                                Zabrania się:
                                <ul>
                                    <li>sprzedaży bez zgody Organizatorów z tzw “dzikich stoisk”</li>
                                    <li>palenia papierosów</li>
                                    <li>wnoszenia i spożywania alkoholu lub środków odurzających</li>
                                    <li>wnoszenia przedmiotów mogących zagrozić życiu lub zdrowiu ludzkiemu</li>
                                    <li>rozstawiania stojaków, wieszaków, reklam itp. bez wcześniejszej zgody
                                        Organizatorów
                                    </li>
                                    <li>wejścia i przebywania w strefach Hali Cracovii wyłączonych dla uczestników</li>
                                    <li>blokowania ciągów komunikacyjnych, dróg dojazdowych dla służb ratunkowych, dróg
                                        ewakuacyjnych
                                    </li>
                                    <li>
                                        wprowadzania psów i innych zwierząt, za wyjątkiem psów przewodników i psów
                                        będących asystentami osób
                                        z niepełnosprawnością
                                    </li>
                                </ul>
                            </li>
                            <li>Sprzedaż prowadzona jest wyłącznie na stoiskach Wystawców.</li>
                            <li>
                                Sprzedawcy oraz Sklepy wystawiają swoje produkty oraz towary na Yarnmarku, prowadzą
                                sprzedaż we własnym
                                zakresie i na własny rachunek. Organizatorzy nie ponoszą odpowiedzialności za produkty
                                oraz towary
                                oferowane przez Wystawców.
                            </li>
                            <li>
                                Organizatorzy nie ponoszą odpowiedzialności za przedmioty wartościowe pozostawione przez
                                Uczestników bez
                                nadzoru na terenie Hali Cracovia i terenie Yarnmarku.
                            </li>
                            <li>
                                Osoby niepełnoletnie mogą przebywać na Yarnmarku wyłącznie pod opieką rodzica lub
                                dorosłego opiekuna. Za
                                szkody wyrządzone przez osoby niepełnoletnie odpowiadają ich rodzice lub opiekunowie.
                            </li>
                            <li>
                                Uczestnicy Imprezy są zobowiązani do przestrzegania obowiązujących w dniu Imprezy
                                przepisów sanitarno –
                                epidemiologicznych.
                            </li>
                            <li>
                                Organizatorzy zastrzegają sobie prawo do dokonania zmian w przebiegu Yarnmarku w
                                okolicznościach, za
                                które nie ponoszą odpowiedzialności (w szczególności z przyczyn związanych ze stanem
                                zagrożenia
                                epidemicznego), w tym do odwołania Imprezy lub zmiany jej terminu. W przypadku zmiany
                                terminu, bilety
                                zachowują ważność.
                            </li>
                            <li>
                                Wejście lub wjazd na teren Hali Cracovii jest równoznaczne z wyrażeniem zgody na
                                nagrywanie dla potrzeb
                                Organizatorów lub Cracovii oraz jest równoznaczne z akceptacją monitoringu. Nagrania z
                                monitoringu mogą
                                być podstawą pociągnięcia do prawnej odpowiedzialności osób, które nie stosują się do
                                niniejszego
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
                    <CenteredParagraph>
                        <Typography size="xl" weight="bold">
                            Regulamin Warsztatów
                        </Typography>
                    </CenteredParagraph>

                    <StatuteWrapper>
                        <ol>
                            <li>
                                Warsztaty odbywają się zgodnie z Harmonogramem ustalonym przez Organizatorów Krakoskiego
                                Yarnmarku
                                Wełny.
                            </li>
                            <li>
                                Każdy Warsztat jest prowadzony zgodnie z planem ustalonym pomiędzy Prowadzącym Warsztaty
                                a
                                Organizatorami.
                            </li>
                            <li>
                                Ilość miejsc na na każdym Warsztacie jest ograniczona i zależy od rodzaju warsztatów
                                oraz zaleceń
                                Prowadzącego
                            </li>
                            <li>W przypadku rezygnacji z uczestnictwa w warsztatach, wniesiona opłata nie podlega
                                zwrotowi.
                            </li>
                            <li>
                                W przypadku zbyt małej liczby chętnych bądź odwołania warsztatów z innych przyczyn,
                                wniesione opłaty
                                zostaną niezwłocznie zwrócone na rachunek bankowy uczestnika. Ewentualne uczestnictwo w
                                Yarnmarku wymaga
                                wówczas zakupu standardowego biletu.
                            </li>
                            <li>
                                Uczestnicy warsztatów zobowiązani są do przygotowania się do warsztatów zgodnie z
                                wymaganiami podanymi
                                przy opisie warsztatów.
                            </li>
                            <li>
                                Udział w warsztatach jest równoznaczny z wyrażeniem zgody na fotografowanie i filmowanie
                                uczestników
                                oraz ich prac, a także na wykorzystanie ich wizerunku w materiałach promocyjnych
                                prezentowanych w
                                mediach, na stronie internetowej oraz portalach społecznościowych.
                            </li>
                            <li>
                                Udział w warsztatach jest równoznaczny z przyjęciem do wiadomości i zaakceptowaniem
                                niniejszego
                                regulaminu
                            </li>
                        </ol>
                    </StatuteWrapper>
                </Card>
            </Band>
        </StyledPageContent>
    );
};
