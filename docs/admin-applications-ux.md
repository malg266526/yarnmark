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
   `tests/vendorApplicationsFilterParams.test.ts`. Sam pasek (chipy ze statusami, pola filtrów)
   sprawdzony wizualnie w izolowanym harnessie HTML z tym samym CSS — liczniki mają rozmiar etykiety
   i są wyśrodkowane w pigułce (zmierzone: badge 20 px w polu treści chipa 20 px, dolne krawędzie
   pól i przycisku równe co do piksela). Działania w samym panelu nie zweryfikowano — `/admin`
   wymaga logowania Google i danych z API.

2. **Gęsty wiersz zamiast karty**: tabela/lista z kolumnami nazwa, data, kategoria, 3 preferencje
   (z liczbą konkurentów), status, flagi. Szczegóły w panelu bocznym (drawer) po kliknięciu —
   karty zostają jako opcjonalny tryb.
3. **Flagi ryzyka** liczone na froncie: duplikat e-maila/nazwy, brak akceptacji regulaminu,
   mniej niż 3 preferencje, wszystkie preferencje w jednym typie stoiska, brak logo, brak opisu.
4. **Mapa hali w panelu** (wyciągnięty wspólny `HallMap` z `Hall.tsx`/`SelectableHall.tsx`,
   zamiast trzeciej kopii schematu): heatmapa popytu z `getStandInterestCounts` (martwy kod →
   wreszcie użyty), klik w stoisko → lista chętnych z priorytetami (gotowe `groupApplicationsByStand`).
5. **Widok dzielony lista ⇄ mapa**: podświetlenie zaznaczonego zgłoszenia na mapie (3 preferencje
   w kolorach priorytetu) i odwrotnie — zaznaczenie stoiska filtruje listę do chętnych.
6. **Pokrycie hali**: pasek „48 stoisk: 31 z chętnymi, 17 bez ani jednego chętnego”, lista stoisk
   bez popytu. To najtańsze narzędzie decyzyjne, jakie można dodać.
7. **Status jako jedna kontrolka** (segmented control lub select) ze stanem „zapisywanie”
   i toastem z „Cofnij” zamiast pięciu przycisków na kartę.
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

1. P0.1–P0.3 (pasek roboczy, gęsta lista, flagi) — same w sobie rozwiązują problem „50 kart”.
   P0.1 zrobione, zostają P0.2 i P0.3.
2. P0.4–P0.6 (mapa, widok dzielony, pokrycie hali) — wspólny `HallMap` przy okazji usuwa duplikację.
3. P0.7–P0.9 (status, eksport, oznaczenie symulacji) — drobne, wysokie zyski.
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
