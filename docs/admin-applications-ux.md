# Panel admina: przegląd zgłoszeń i przydział stoisk

Analiza stanu obecnego i propozycje usprawnień dla `/admin/vendors/applications` i
`/admin/workshops/applications` przy założeniu **50+ zgłoszeń wystawców** i 48 stoisk do rozdania.
Dokument jest propozycją — nic z niego nie jest jeszcze zaimplementowane.

## Streszczenie

Trzy rzeczy są sednem problemu:

1. **Przydział stoisk jest dziś fikcją.** Widok kaskady liczy przydział w pamięci przeglądarki i nic
   nie zapisuje, a panel nie ma UI, które ustawia `allocatedStandId` / `allocationState`. Cały §4 ze
   `stands_algorithm.md` („klepnięte”, iteracje) jest nieosiągalny.
2. **W panelu nie ma mapy hali.** Najważniejszą decyzję — kto dostaje konkretne stoisko — podejmuje się
   dziś, czytając kilkadziesiąt kart. Narzędzia do heatmapy popytu są w kodzie, ale nieużywane.
3. **Zbierane dane nie wpływają na nic.** `interestedIfUnavailable` i `attendedBefore` są tylko
   wyświetlane, a czysty FCFS po `submittedAt` nagradza tempo klikania i nie daje się obronić przed
   odrzuconym wystawcą.

Benchmark (§3) mówi jednoznacznie: targi branżowe rankingują po stażu i sponsoringu, a czas zgłoszenia
traktują jako rozstrzygnięcie remisu; festiwale wełny kuratorują z limitami per kategoria. Dla Yarnmarku
sensowny jest hybryd, którego składniki są już w modelu danych.

Punkt startowy bez zależności od backendu: **P0.1–P0.3** (pasek roboczy z filtrami w URL, gęsta lista
z drawerem szczegółów, flagi ryzyka) — to jedyna część, która sama rozwiązuje problem „50 kart”.

## 1. Stan obecny (fakty z kodu)

### Wystawcy

- `VendorsApplicationsView.tsx` ma trzy tryby: `cards`, `cascade`, `stands` (stan lokalny, nie w URL).
- `VendorsApplicationsCardsView.tsx` renderuje **wszystkie 17 pól każdego zgłoszenia** w siatce
  2-kolumnowej, posortowane rosnąco po `submittedAt`. Przy 50 zgłoszeniach to ~850 wierszy pól i
  50 pobrań logo w jednym widoku. Brak szukajki, filtrów, sortowania, paginacji i licznika po statusach
  (jest tylko `savedCount`).
- Status zmienia się jednym z **pięciu przycisków w każdej karcie** (`VENDOR_APPLICATION_STATUS_ORDER`),
  bez wskaźnika zapisu, bez cofnięcia, bez potwierdzenia. Przy 50 kartach to 250 przycisków w DOM.
- Karta pokazuje `allocatedStandId`, `allocationState`, `allocationIteration`, ale **nie ma żadnego UI,
  które pozwala je ustawić**. `updateVendorApplicationStatus` wysyła `assignedStands` zrekonstruowane
  z już istniejącego `allocatedStandId` (`useVendorsApplications.ts:45`), więc organizator nie może
  przypisać ani „klepnąć” stoiska. To blokuje cały §4 z `stands_algorithm.md`.
- `VendorsApplicationsCascadeView.tsx` to **symulacja w pamięci przeglądarki**: `getCascadeChoiceReservations`
  liczy kaskadę przy każdym renderze, nic nie zapisuje i nigdzie nie jest to oznaczone. Użytkownik
  widzi „przydzielone stoisko”, które nie istnieje po odświeżeniu strony.
- `stands` (grupowanie po stoiskach) pokazuje chętnych z priorytetem — ale jako płaska lista ~48 kart,
  bez mapy, bez informacji ile stoisk nie ma żadnego chętnego.
- **W panelu nie ma mapy hali.** `Hall.tsx` (read-only) i `SelectableHall.tsx` (wybór) istnieją tylko
  dla stron publicznych, `/admin/editor` to osobne narzędzie bez wiedzy o zgłoszeniach.
- `getStandInterestCounts` / `getHighInterestStandIds` / `isHighInterestStand`
  (`vendorFormStandInterestUtils.ts`) są **martwym kodem** — formularz publiczny używa backendowego
  `/api/vendors/stands-demand`, a panel nie używa niczego. Dane do heatmapy popytu są pod ręką.
- Brak: eksportu (CSV), notatek, historii zmian statusu, deep-linku do pojedynczego zgłoszenia,
  wykrywania duplikatów (ten sam e-mail / nazwa sklepu), oznaczenia zgłoszeń niekompletnych.

### Warsztaty

- `WorkshopsApplicationsView.tsx` nie ma nawet trybów — tylko karty ze **wszystkimi 15 polami**,
  w tym długimi opisami. Brak filtrów, szukajki, sortowania.
- Model warsztatu nie ma harmonogramu: `duration` to wolny `string`, nie ma dnia, godziny ani sali
  (`workshopFormTypes.ts`). Ułożenie planu w panelu jest dziś niemożliwe z definicji modelu.

### Hala i algorytm

- `hall.json`: 52 obiekty, z czego **48 wybieralnych** (36 standard, 5 premium, 7 mini, 4 techniczne),
  w sześciu rozmiarach (`3.5×3`, `5.5×3`, `3×5.5`, `3×3.5`, `3×4`, `2×3`). Wystawca wybiera max 3
  preferencje (`VENDOR_FORM_MAX_PREFERRED_STANDS`), bez informacji o typie/rozmiarze w panelu.
- Kaskada sortuje **wyłącznie po `submittedAt`** i bierze tylko status `accepted`.
- `interestedIfUnavailable` (oferta przy braku stoiska) i `attendedBefore` (poprzednie edycje) są
  zbierane i wyświetlane, ale **nie wpływają na nic**.
- `hall.json` ma pole `vendor` z obsadą 2026 — jedyny ślad historii, nieużywany w panelu.
- Schemat hali jest zduplikowany w trzech miejscach (`Hall.tsx`, `SelectableHall.tsx`,
  `parseHallStands.ts`), a `vendorFormStandIds.ts` trzyma ręcznie przepisaną mapę `id → index`.
- Poboczne: w `SelectableHall.tsx` są teksty zahardkodowane po angielsku (`'HI'`, `, High Interest`,
  `Stand ${index}`, `Loading…`, `Failed to load hall layout.`) — łamie regułę tłumaczeń z AGENTS.md.

## 2. Co boli przy 50+ zgłoszeniach

1. **Nie da się skanować listy.** Karta z 17 polami to nie jednostka przeglądania, to widok szczegółów.
   Organizator przy triage'u potrzebuje 5–6 informacji: nazwa, kategoria, data, 3 preferencje, status, flagi.
2. **Nie da się wrócić do kontekstu.** Tryb widoku i brak filtrów w URL = po odświeżeniu/powrocie
   zaczynasz od zera, nie można wysłać linku do zgłoszenia współorganizatorowi.
3. **Nie widać konkurencji o stoiska.** Najważniejsza decyzja (kto dostaje S12) wymaga dziś przełączania
   trybu i czytania 48 kart. Bez mapy nie widać, że cały rząd przy wejściu jest przewalczony, a mini
   stoiska pod ścianą nie mają ani jednego chętnego.
4. **Przydział jest fikcją.** Kaskada nie zapisuje wyników, nie ma „klepnięcia”, nie ma ręcznej korekty.
   Realna praca i tak przenosi się do arkusza, a panel staje się tylko przeglądarką skrzynki.
5. **FCFS jest niesprawiedliwe i trudne do obrony.** Czysty czas wysłania nagradza tempo klikania,
   nie jakość oferty ani lojalność. Nie ma czym uzasadnić decyzji wystawcy, który dostał odmowę.
6. **Brak śladu decyzji.** Zero notatek i historii — przy 50 zgłoszeniach i kilku osobach po stronie
   organizatora to gwarantowany spór „kto to odrzucił i dlaczego”.

## 3. Jak to robią inne targi

- **Priority points / seniority** (Global Pet Expo, SIMA, NATDA, NAPEO): punkty za każdy rok
  wystawiania, członkostwo, sponsoring i reklamę. Wybór stoiska idzie w kolejności malejących punktów,
  a **czas zgłoszenia jest tylko rozstrzygnięciem remisu**. Po deadline'ie reszta idzie first-come.
- **Okna wyboru (selection windows)**: zamiast jednego „wielkiego finału” wystawcy są dzieleni na
  tury wg rangi; w swojej turze wybierają z tego, co zostało. Daje to przewidywalność i zdejmuje
  z organizatora ciężar arbitrażu.
- **Jury / kuracja** (festiwale wełny i craft fairy, np. Indie Untangled, NC State Crafts Fair):
  selekcja po oryginalności i jakości oraz **limity miejsc per kategoria**, żeby nie zrobić targów
  z samych farbiarek. Lokalizacja stoiska to decyzja komitetu, nie wystawcy.
- **Loteria w koszykach kategorii** (NC State): losowanie w ramach kategorii, kiedy chętnych jest
  wielokrotnie więcej niż miejsc — przy jawnych zasadach jest łatwiejsze do obrony niż ranking.

Dla Yarnmarku (48 miejsc, 50+ chętnych, mocna tożsamość kategorii) sensowny jest **hybryd**:
kuracja z limitami kategorii → ranking (staż + sponsoring) → kaskada preferencji → czas jako remis.
Dokładnie to, co jest już w modelu danych, tylko nieużyte.

## 4. Propozycje

### P0 — frontend, bez zmian w backendzie

1. **Pasek roboczy nad listą** — ✅ Zrobione: licznik po statusach (klikalny jako filtr), szukajka po
   nazwie/e-mailu/telefonie, filtr kategorii, filtr „ma preferencję X”, sortowanie (data ↑/↓, nazwa,
   liczba konkurentów o 1. wybór). Stan w query params, żeby widok był linkowalny i odtwarzalny.

   Zakres wdrożenia: `utils/vendorApplicationsFilterUtils.ts` (filtrowanie, sortowanie, liczniki,
   konkurencja o 1. wybór), `utils/vendorApplicationsFilterParams.ts` (`view`, `q`, `status`,
   `category`, `stand`, `sort` — wartości domyślne nie trafiają do URL),
   `hooks/useVendorsApplicationsToolbar.ts` (stan w `useSearchParams`, `replace: true`),
   `components/VendorsApplicationsToolbarView.tsx` (markup). Tryb widoku też siedzi teraz w URL.
   Filtry działają wyłącznie na widoku kart — kaskada i widok „wg stoisk” liczą się po pełnym
   zbiorze, żeby symulacja i obraz popytu nie zostały zafałszowane przez filtr.
   Testy jednostkowe: `tests/vendorApplicationsFilterUtils.test.ts`,
   `tests/vendorApplicationsFilterParams.test.ts`. Sam pasek sprawdzony na prawdziwym komponencie
   (`VendorsApplicationsToolbarView` zbundlowany esbuildem, globalne style i fonty jak w aplikacji,
   zrzut z headless Chrome). Zmierzone na pikselach zrzutu: chip, input, select i przycisk
   resetu mają po 38 px wysokości oraz wspólne górne i dolne krawędzie; licznik to koło 24×24 px, a
   cyfra w nim ma 14 i 13 device px zapasu (DPR 2), czyli 0,25 px różnicy wynikającej z zaokrąglenia.
   Questrial nie ma cyfr tabelarycznych, więc „1” bywa przesunięta o pół piksela w poziomie. Działania paska
   w samym panelu nie zweryfikowano — `/admin` wymaga logowania Google i danych z API.

2. **Gęsty wiersz zamiast karty** — ✅ Zrobione: tabela z kolumnami nazwa, data, kategoria,
   preferencje (każda z numerem wyboru i liczbą konkurentów), status. Szczegóły w panelu bocznym
   (drawer) po kliknięciu wiersza — karty zostają jako opcjonalny tryb. Kolumna z flagami ryzyka doszła
   razem z P0.3.

   Zakres wdrożenia: lista jest teraz domyślnym trybem (`view=rows`), karty są pod `view=cards`;
   `utils/vendorApplicationRowsUtils.ts` liczy preferencje z konkurencją (po pełnym zbiorze, nie po
   przefiltrowanym), `utils/standGroupingUtils.ts` dostał wspólne `countStandRequests`,
   `components/VendorsApplicationsRowsView.tsx` to sama tabela, a `VendorApplicationDetailsView.tsx`
   wyciąga treść karty tak, by karta i drawer renderowały dokładnie to samo.
   Otwarte zgłoszenie siedzi w URL (`?application=<id>`), więc panel da się podlinkować i przeżywa
   odświeżenie. Drawer korzysta z `react-modal` (Esc, klik w tło, zarządzanie fokusem).
   Przy okazji poprawka z P0.1: widok kart sortował się po dacie wewnątrz komponentu i kasował wybór
   z pola „Sortowanie” — teraz lista i karty renderują kolejność ustaloną w `selectVendorApplications`.
   Testy: `tests/vendorApplicationRowsUtils.test.ts`, `tests/standGroupingUtils.test.ts`,
   `tests/vendorsApplicationsFormatters.test.ts` (kompaktowa data), zaktualizowane
   `tests/vendorApplicationsFilterParams.test.ts`.
   Sprawdzone na prawdziwych komponentach w headless Chrome (bundle esbuildem, globalne style, fonty,
   `StyleSheetManager` i i18n jak w aplikacji): kliknięcie wiersza otwiera drawer z właściwym
   zgłoszeniem i podświetla wiersz; drawer ma 560×100vh przy prawej krawędzi (zmierzone
   `top=0 left=720 w=560 h=613` przy oknie 1280×613); wiersze mają 44,5–45,5 px wysokości, nagłówek
   tabeli jest `position: sticky; top: 0`. Nie weryfikowano działania w samym panelu — `/admin`
   wymaga logowania Google i danych z API.

3. **Flagi ryzyka** — ✅ Zrobione: liczone na froncie, bez zmian w API: duplikat e-maila, duplikat
   nazwy sklepu, mniej niż 3 różne preferencje, wszystkie preferencje w jednym typie stoiska.

   Pierwotna lista z tego dokumentu zawierała też „brak akceptacji regulaminu”, „brak logo” i „brak
   opisu”. Zostały usunięte, bo `vendorFormValidationSchema` wymusza wszystkie trzy przy wysyłce
   (`statuteRequired`, `logoRequired`, `businessDescriptionRequired`), więc zgłoszenie z formularza
   nigdy ich nie złamie — byłyby stałym szumem w kolumnie. Zostały wyłącznie sygnały, których
   formularz sprawdzić nie może: duplikaty wymagają porównania wielu zgłoszeń, a preferencje
   formularz przyjmuje już od jednego stoiska dowolnego typu (`preferredStandsRequired` sprawdza
   tylko, czy lista nie jest pusta).

   Zakres wdrożenia: `utils/vendorApplicationFlagsUtils.ts` liczy flagi po pełnym zbiorze (duplikaty
   wymagają wszystkich zgłoszeń) przez tablicę predykatów `Record<VendorApplicationFlag, …>`, więc
   kolejność flag jest stabilna, a dołożenie nowej to jeden wpis. Porównania duplikatów idą po
   wartościach znormalizowanych (trim + lowercase), a puste pola nie są duplikatami samych siebie.
   Typ stoiska rozpoznaje `domain/vendorApplications/vendorStandTypeUtils.ts` po prefiksie indeksu
   z `hall.json` (S/C → standard, P → premium, M → mini; wejścia i pola techniczne bez typu);
   flaga „jeden typ stoisk” wymaga co najmniej dwóch różnych stoisk o znanym typie, żeby pojedynczy
   wybór nie dawał fałszywego alarmu. Flagi liczy raz hook i podaje je liście, kartom i drawerowi —
   jedno źródło, bez podwójnego liczenia. `components/VendorApplicationFlagsView.tsx` renderuje
   bursztynowe chipy (`WarningColors`) z pełnym opisem w `title`; w liście to kolumna „Flagi”,
   w szczegółach sekcja „Flagi ryzyka” nad statusem.
   Testy: `tests/vendorApplicationFlagsUtils.test.ts` (w tym normalizacja duplikatów, puste pola,
   pojedynczy wybór, nieznany prefiks stoiska i brak flag dla pól wymuszanych przez formularz) oraz
   `domain/vendorApplications/tests/vendorStandTypeUtils.test.ts`.
   Sprawdzone na prawdziwych komponentach w headless Chrome: chipy mają 24 px wysokości, a tekst
   w nich 14 i 12 device px zapasu (DPR 2) — pół piksela różnicy z zaokrąglenia. Przy okazji
   wyłapany i poprawiony błąd: chipy w drawerze dziedziczyły font `Love Ya Like A Sister` z `body`,
   bo żaden przodek w panelu nie deklarował `FontFamilies.primary`; teraz font deklarują i chipy,
   i sam drawer. Nie weryfikowano działania w samym panelu — `/admin` wymaga logowania Google.

4. **Mapa hali w panelu** — ✅ Zrobione: tryb „Pokaż mapę” z heatmapą popytu i listą chętnych po
   kliknięciu stoiska.

   Zakres wdrożenia: `components/hall/hallStands.ts` (jeden schemat zod planu hali zamiast dwóch kopii)
   i `components/hall/HallMap.tsx` (kontener, geometria i stała normalizacji rozmiaru w jednym
   miejscu); `Hall.tsx` i `SelectableHall.tsx` korzystają teraz z nich, a każdy widok trzyma własny
   wygląd kafelka. Heatmapa używa `getStandInterestCounts` i `isHighInterestStand` z domeny — do tej
   pory martwy kod — więc panel i publiczny formularz mają jeden próg „dużego zainteresowania”.
   Progi w `utils/standDemandUtils.ts` (brak / 1 / 2 / 3+), kolory z rampy `HallColors`, liczba
   chętnych wypisana w każdym stoisku. Klik w stoisko ustawia istniejący filtr `stand`, więc wybór
   siedzi w URL, przełącza listę na chętnych o to stoisko i da się go podlinkować; ponowny klik
   czyści wybór. Panel obok mapy pokazuje chętnych z datą i priorytetem (`groupApplicationsByStand`).
   Testy: `tests/standDemandUtils.test.ts`.
   Weryfikacja: refaktor publicznych map sprawdzony porównaniem pikseli zrzutów przed i po —
   `ImageChops.difference` zwraca pusty bbox, czyli render `Hall` i `SelectableHall` jest
   **identyczny co do piksela**. Mapa panelu sprawdzona na prawdziwym komponencie: kliknięcie P1
   zaznacza stoisko i pokazuje czterech chętnych z poprawnymi priorytetami (trzy „najwyższy”, jeden
   „najniższy”), a drugi klik czyści wybór i wraca podpowiedź.

   Uwaga na przyszłość: stary `Hall` mógł się ściskać w układzie flex (`flex: 0 1 auto`), przez co
   plan hali bywał węższy niż jego własna szerokość. Zostawiłem to zachowanie bez zmian, żeby nie
   ruszać publicznej strony przy tym zadaniu — w panelu mapa ma `flex: 0 0 auto` zgodnie z regułą
   z AGENTS.md. Warto to naprawić osobno na `/for-vendors`.

5. **Widok dzielony lista ⇄ mapa** — ✅ Zrobione: tryb „Lista i mapa” z gęstą listą po lewej
   i planem hali po prawej.

   Najechanie na wiersz (albo wejście na niego tabulatorem) podświetla na mapie trzy preferencje
   tego zgłoszenia: obramowanie w kolorze priorytetu (1. czerwony `TextColors.accent`, 2. bursztynowy `WarningColors.border`, 3. szary `GrayScale[700]`) plus plakietka z numerem
   wyboru w rogu stoiska, żeby kolejność była czytelna także bez rozróżniania kolorów.
   Kierunek odwrotny działa od P0.4: klik w stoisko ustawia filtr `stand`, więc lista obok od razu
   pokazuje chętnych o to stoisko.

   Zakres wdrożenia: `components/VendorsApplicationsSplitView.tsx` składa gotowe widoki listy i mapy
   i trzyma tylko stan podświetlenia (hover/focus, poza URL — to stan ulotny);
   `utils/vendorApplicationRowsUtils.ts` dostał `buildStandPriorityHighlights`. Przy okazji panel
   chętnych wyjechał z mapy do `components/VendorsApplicationsStandRequestsView.tsx`: w trybie
   dzielonym był zbędny (to lista obok pełni tę rolę) i rozpychał układ tak, że mapa lądowała pod
   listą zamiast obok niej. Teraz tryb „Pokaż mapę” składa mapę i panel chętnych, a tryb dzielony
   mapę i listę.
   Testy: `buildStandPriorityHighlights` w `tests/vendorApplicationRowsUtils.test.ts`.
   Weryfikacja na prawdziwych komponentach: realny hover na pierwszym wierszu podświetla S1 (1),
   S10 (2) i P1 (3) właściwymi kolorami i numerami; po rozdzieleniu panelu chętnych lista i mapa
   stoją obok siebie, a tryb „Pokaż mapę” dalej pokazuje mapę z panelem chętnych (klik w S10 listuje
   trzech chętnych z priorytetami najwyższy/średni/średni).

6. **Pokrycie hali** — ✅ Zrobione: nad mapą pasek „Stoisk w hali: 48 · z chętnymi: X · bez
   chętnych: Y” i lista stoisk bez popytu jako klikalne chipy — klik zaznacza stoisko na mapie
   i ustawia filtr, więc od razu widać, gdzie leży puste miejsce. Pasek jest w widoku mapy, czyli
   pokazuje się i w trybie „Pokaż mapę”, i w dzielonym.

   Zakres wdrożenia: `buildHallCoverage` w `utils/standDemandUtils.ts` (czysta funkcja: lista stoisk
   wystawienniczych + licznik zapotrzebowania → ile zajętych, ile pustych, które puste). Lista stoisk
   bierze się z `hall.json` przez `isVendorStand`, więc wejścia i pola techniczne nie zaniżają
   pokrycia. Testy: trzy przypadki w `tests/standDemandUtils.test.ts` (podział na zajęte i puste,
   zapotrzebowanie na stoisko spoza planu, pełne pokrycie).
   Weryfikacja na prawdziwym komponencie: dla 8 zgłoszeń pasek pokazuje 48 / 17 / 31, a klik w chip
   „S19” zaznacza stoisko i panel obok mówi „Stoisko S19 nie ma jeszcze żadnych chętnych”.
   Pierwsza wersja rozpychała panel na całą szerokość ekranu (31 chipów w jednej linii) — chipy
   i legenda są teraz ograniczone do szerokości mapy liczonej z `GRID_COLS × multiplier`, więc
   zawijają się zarówno przy mapie 520 px, jak i przy 364 px w widoku dzielonym.

7. **Status: stan zapisu i cofanie** — ✅ Zrobione: przyciski statusu **zostają** (organizatorka
   wolała je od selecta — nie zamieniać ich z powrotem na listę rozwijaną), ale na czas zapisu są
   zablokowane i pokazują „Zapisywanie…”, a po udanej zmianie wyskakuje toast „Status „X” zmieniony
   na „Y”” z przyciskami „Cofnij” i „Zamknij”.

   Zakres wdrożenia: `hooks/useVendorsApplications.ts` trzyma teraz `savingStatusApplicationId`
   i `lastStatusChange` (poprzedni status + nazwa sklepu), a `undoStatusChange` wysyła PATCH
   z powrotem na poprzednią wartość. Zmiana na ten sam status nie wywołuje żądania ani toastu,
   a toast chowa się sam po 8 s (`VENDOR_APPLICATION_STATUS_UNDO_TIMEOUT_MS`) i nie pojawia się
   ponownie po cofnięciu, żeby nie dało się wpaść w pętlę.
   Weryfikacja na prawdziwym komponencie: karta w stanie zwykłym i w trakcie zapisu obok siebie
   (wciśnięty status widoczny, pozostałe przyciski wygaszone, pod nimi „Zapisywanie…”) oraz toast
   z oboma przyciskami.

8. **Eksport CSV** widocznego (przefiltrowanego) zestawu — organizator i tak pracuje w arkuszu
   i robi mailingi.
9. **Symulację oznaczyć jako symulację**: w widoku kaskady wyraźna plakietka „podgląd, nic nie jest
   zapisane” + przycisk „Eksportuj propozycję”, dopóki nie ma zapisu po stronie API.

### P1 — wymaga kontraktu z backendem

10. **Ręczny przydział i „klepnięcie”**: `PATCH` przyjmujący `allocatedStandId` + `allocationState`
    (`suggested` → `confirmed`) niezależnie od `status`. Bez tego §4 `stands_algorithm.md` jest martwy.
    Dziś front wysyła `assignedStands` odtworzone z własnego stanu, czyli nic nie zmienia.
11. **Notatki i historia zmian** (kto, kiedy, z jakiego na jaki status) — widoczne w drawerze.
12. **Ranking zamiast czystego FCFS**: pole `priorityScore` (lub składniki: liczba poprzednich edycji,
    sponsoring, kuracja) i jawna reguła `tier → score → submittedAt`. Reguła powinna być widoczna
    w panelu i dać się wkleić wystawcy jako uzasadnienie.
13. **Edycje**: `editionId` na zgłoszeniu i snapshot hali per edycja. Dziś `hall.json` leży w
    `src/assets`, a `docs/hall-2026.json` i `docs/hall-2027-proposal.json` są tylko presetami editora —
    porównanie „kto stał gdzie rok temu” jest ręczne, mimo że pole `vendor` w hali to zawiera.
14. **Dwa stoiska na wystawcę** (TODO ze `stands_algorithm.md`): `allocatedStandIds: string[]`.
    Lepiej zmienić model teraz niż po pierwszym przydziale.

### P2 — algorytm

15. **Druga tura dla `interestedIfUnavailable`**: po kaskadzie przypisz pozostałe wolne stoiska
    wystawcom, którzy zadeklarowali zainteresowanie bez konkretnego miejsca, dopasowując typ/rozmiar.
    Dziś to pole jest dekoracją, a 17 stoisk może zostać puste przy 50 chętnych.
16. **Dopasowanie typu stoiska**: ostrzeżenie, gdy wszystkie preferencje wystawcy celują w 5 stoisk
    premium; propozycja alternatywy o zbliżonym metrażu.
17. **Mix i sąsiedztwo kategorii**: limity per kategoria oraz ostrzeżenie, gdy sąsiadujące stoiska
    (da się policzyć z `start`/`end` w siatce) trafiają do tej samej kategorii.
18. **Dry-run z deltą**: uruchomienie algorytmu pokazuje różnicę wobec stanu zatwierdzonego
    (kto traci, kto zyskuje, czego nie da się obsłużyć) przed zapisem, zatwierdzanie pojedynczo
    i hurtowo. Determinizm: stabilny remis i widoczny powód przydziału przy każdym wierszu
    („1. wybór”, „3. wybór”, „2. tura”, „ręcznie”).
19. **Raport do negocjacji ręcznej** z powodem i propozycjami: nie sama lista nazw, ale „S12 zajęte
    przez X (wcześniejsze zgłoszenie), wolne alternatywy o podobnym metrażu: S29, M3”.

### P3 — warsztaty

20. Ten sam pasek roboczy i gęsta lista; w wierszu: tytuł, prowadzący, poziom, min–max uczestników,
    cena, czas trwania. Opisy i wymagania w drawerze.
21. **Model harmonogramu**: dzień, godzina, sala, pojemność — i widok siatki z wykrywaniem kolizji
    (ta sama sala, ten sam prowadzący). Bez zmiany modelu (`duration: string`) planowanie w panelu
    jest niemożliwe, więc to decyzja produktowa, nie UI.
22. Sanity-checki: `maxParticipants` > pojemność sali, prowadzący z dwoma warsztatami w tym samym
    slocie, brak typu umowy przy rozliczeniu.

## 5. Do potwierdzenia z backendem

- Czy `PATCH /api/vendors/:id` przyjmuje `allocatedStandId` i `allocationState`, czy tylko
  `assignedStands` + `status`? (Front zakłada dziś to drugie.)
- Czy istnieje historia zmian statusu i pole na notatki.
- Czy `/api/vendors/stands-demand` zwraca liczby, czy tylko poziom `high` — liczby są potrzebne
  do heatmapy w panelu.
- Czy zgłoszenia są wiązane z edycją targów.

## 6. Sugerowana kolejność

1. P0.1–P0.3 (pasek roboczy, gęsta lista, flagi) — ✅ zrobione, problem „50 kart” rozwiązany.
2. P0.4–P0.6 (mapa, widok dzielony, pokrycie hali) — ✅ zrobione.
3. P0.7–P0.9 (status, eksport, oznaczenie symulacji) — P0.7 zrobione, zostają P0.8 i P0.9.
4. P1.10–P1.11 po ustaleniu kontraktu API — dopiero to zamienia panel w narzędzie decyzyjne.
5. P2 i P3 jako osobne tematy, każdy z własnym przebiegiem przez `docs/`.

## Źródła

- [Global Pet Expo — understanding priority points](https://help.globalpetexpo.org/understanding-priority-points)
- [SIMA — what are exhibitor priority points and how do they work](https://help.sima.org/knowledge/what-are-exhibitor-priority-points-and-how-do-they-work)
- [NATDA — priority points allocation system](https://www.natda.org/priority-points-system)
- [NAPEO — priority points system](https://napeo.org/wp-content/uploads/2025/10/NAPEO-Priority-Points-System-updated-9.10.2025.pdf)
- [Classic Exhibits — what you should know about trade show booth selection](https://classicexhibits.com/tradeshow-blog/2009/11/03)
- [Indie Untangled — vendor guidelines (jury process)](https://indieuntangled.com/rhinebeck-trunk-show-2018-vendor-guidelines/)
- [NC State Crafts Fair — information sheet (lottery per media type)](https://crafts.arts.ncsu.edu/wp-content/uploads/sites/77/2025/04/2025-Crafts-Fair-Information-Sheet.pdf)
