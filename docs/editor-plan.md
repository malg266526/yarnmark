# Plan Rozwoju Edytora Hali i Panelu Administratora

Dokument zbiera diagnozę obecnego edytora hali (`/admin/editor`), ocenę powiązanych obszarów (strona dla wystawców, formularz zgłoszeniowy, panel administratora) oraz uszeregowany plan wdrożenia.

**Status dokumentu:** plan przyjęty, Etap 1 w przygotowaniu.

Analiza powstała z lektury kodu i danych w repozytorium. Wnioski oznaczone jako **niezweryfikowane** nie zostały potwierdzone pomiarem w działającej aplikacji. Czasy są zgrubne (roboczogodziny/dni), zakładają jednego dewelopera i nie uwzględniają ustalania kontraktu z backendem.

---

## 1. Decyzje podjęte

| Decyzja                                                | Wybór                                  | Konsekwencja                                                                                                                                                        |
| :----------------------------------------------------- | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Źródło prawdy dla układu                               | **Na razie `localStorage` + eksport**  | Rozjazd danych między edytorem a stroną wystawców pozostaje; publikacja zmian nadal wymaga ręcznego skopiowania JSON-a, commita i builda. Do rewizji przy Etapie 3. |
| Pierwszy etap wdrożenia                                | **Etap 1 — naprawa edycji i usuwania** | Brak zależności od backendu, najszybciej odczuwalna zmiana.                                                                                                         |
| Zachowanie przy powiększeniu stoiska poza krawędź hali | **Przycięcie pozycji do hali**         | Spójne z istniejącym `clampStandOriginToHall`.                                                                                                                      |

---

## 2. Diagnoza edytora

### 2.A Wymiary hali są stałymi kompilacyjnymi

`src/components/editor/utils/hallGeometry.ts:2-5` trzyma `HALL_WIDTH_M = 26`, `HALL_HEIGHT_M = 46` i wyliczone z nich `GRID_COLS`/`GRID_ROWS`. Rozmiar kratki (0,5 m) oraz rozmiary typów stoisk (`utils/getSizeForOrientation.ts:1-6`) są również zahardkodowane. Zmiana wymiarów hali wymaga edycji kodu, builda i deployu.

Te same stałe importują `src/components/Hall.tsx:9` i `src/pages/vendor/apply/components/SelectableHall.tsx:9`, więc jedna zmiana rusza stronę publiczną i formularz zgłoszeniowy.

**Niespójność do rozstrzygnięcia:** geometria daje 26 × 46 m = **1196 m²**, a treść strony dla wystawców (`src/translations/pl.tsx:254`) mówi **1142 m²**.

### 2.B Edycja stoiska — trzy osobne defekty

1. **Zmiana rozmiaru nie działa.** Pola szerokości i wysokości zapisują `stand.width/height`, ale kształt na siatce rysuje się wyłącznie z `start`/`end` (`Editor.tsx:233`, `utils/isWithinBox.ts`). Przycisk `Aktualizuj` woła `updateStand(currentStand)` (`StandForm.tsx:197`) i nie przelicza `start`/`end`.
2. **Przesunięcie przez formularz nie działa.** `start`/`end` w formularzu to zaznaczenie z `useMouseHandlers`, przekazywane jako propsy (`Editor.tsx:384`), a `Aktualizuj` ich nie używa. Pozycję można zmienić tylko przeciąganiem.
3. **Enter w formularzu duplikuje stoisko.** `submit` zawsze woła `addStand` (`StandForm.tsx:82`), a `addStand` nadaje nowe `id` (`EditorContext.tsx:45`). Edycja + Enter (lub klik „Dodaj stoisko") tworzy kopię, często w miejscu ostatniego zaznaczenia. Ścieżka psująca dane.

Dodatkowo kliknięcie stoiska na siatce go **nie zaznacza** — `handleCellMouseDown` (`Editor.tsx:241`) rozpoczyna nowe zaznaczenie, chyba że stoisko już jest wybrane. Przeciąganie wymaga uprzedniego zaznaczenia (`Editor.tsx:244`). Każda operacja na stoisku zaczyna się więc od znalezienia go na liście.

Logika „czy to tryb edycji" jest zduplikowana w dwóch miejscach: `useStandForm.ts:8` i `StandForm.tsx:84`.

### 2.C Usuwanie przez listę

`StandList.tsx:69-85` renderuje dla każdego stoiska wyłącznie `index` — bez typu, wystawcy i powierzchni. Kolejność to kolejność dodania. Brak szukajki, filtra, grupowania i sortowania. Przy 52 stoiskach to kolumna 52 niemal identycznych kafelków. `Usuń` działa natychmiast, bez potwierdzenia (`StandList.tsx:77-80`), podczas gdy „Wyczyść wszystko" potwierdzenie ma. W całym edytorze nie ma undo.

### 2.D Brak jednego źródła prawdy dla układu hali

Układ żyje dziś w pięciu niezależnych miejscach:

| #   | Miejsce                                                 | Kto czyta                                 | Zawiera wystawców  |
| :-- | :------------------------------------------------------ | :---------------------------------------- | :----------------- |
| 1   | `localStorage['stands']`                                | edytor (`EditorContext.tsx:41`)           | kopia robocza      |
| 2   | `docs/hall-2026.json`, `docs/hall-2027-proposal.json`   | presety edytora (`utils/hallPresets.ts`)  | nie                |
| 3   | `src/assets/hall.json`                                  | `Hall.tsx:5` **i** `SelectableHall.tsx:4` | tak, 48 stoisk     |
| 4   | `src/domain/vendorApplications/vendorFormStandIds.ts:5` | normalizacja `id` → `index`               | ręcznie przepisane |
| 5   | `src/assets/mapa_hali_jasna.svg`                        | publiczna strona `/hall` (`HallMapPage`)  | statyczny obrazek  |

Do tego przydziały stoisk żyją w zewnętrznym API jako `allocatedStandId` na zgłoszeniu.

**Dane już się rozjechały:** `src/assets/hall.json` i `docs/hall-2026.json` mają te same 52 stoiska o tych samych `id` i indeksach, ale **44 z 52 stoisk mają inne współrzędne** (np. `S17`: rząd 50 vs 56). Edytor edytuje inny układ niż ten, który widzą wystawcy.

Komentarz w `vendorFormStandIds.ts:1-4` („Hand-typed snapshot of hall.json. Keep in sync when hall.json changes") zapowiada kolejne rozjazdy.

Obecny obieg publikacji: edytuj → `Generuj JSON` (`utils/saveHallToFile.ts`) → ręcznie skopiuj do `src/assets/hall.json` → ręcznie zaktualizuj `vendorFormStandIds.ts` → commit → build → deploy.

### 2.E Wydajność siatki

92 × 52 = **4784 komponenty `Square`** (`Editor.tsx:328-374`), każdy ze czterema inline'owymi handlerami tworzonymi na każdym renderze. Brak `memo` i wirtualizacji. Przy przeciąganiu `dragOver` woła `setPreview` na każdej zmianie komórki, co przerysowuje wszystkie 4784 elementy.

**Niezweryfikowane:** nie zmierzono tego w przeglądarce. To najbardziej prawdopodobny kandydat na przyczynę ociężałości, ale przed optymalizacją należy wykonać pomiar.

Dla kontrastu `Hall.tsx` renderuje tę samą halę jako 52 pozycjonowane prostokąty — podejście, które edytor powinien przejąć.

### 2.F Brak walidacji i pomocy przy układaniu

- **Brak detekcji nakładania.** `getStandAtCell` (`Editor.tsx:232`) używa `.find` — pierwsze trafienie wygrywa, drugie stoisko jest niewidoczne. Nic tego nie blokuje ani nie zgłasza.
- **Brak pojęcia alejki** — żadnej walidacji szerokości przejść ani minimalnych odstępów.
- **Brak zoomu, panoramowania, strzałek klawiatury, przyciągania, linii pomocniczych i undo.**
- **Brak podsumowania układu** — liczby stoisk per typ, m² sprzedawalne, wykorzystanie hali.
- **Rozmiar trzymany dwa razy.** Stoiska `a0` i `A3` mają `width`/`height` niezgodne z własnym `start`/`end` (`a0`: 5×3 w polach, 6,5×3 wg kratek) — w obu plikach JSON.

### 2.G Higiena kodu

Instrumentacja debugowa trafiająca na produkcję: `EditorContext.tsx:50,58,59`, `StandForm.tsx:86`, `useStandForm.ts:41`, `utils/useMouseHandlers.ts:30` oraz efekt porównujący wysokości linijek `Editor.tsx:278-298`. Martwy kod: `generateStandsJSON` w `utils/generateJson.ts` nie jest nigdzie używany.

---

## 3. Struktura projektu

Struktura repozytorium jest spójna: `domain/` (API, schematy Zod, logika), `pages/<obszar>/{components,hooks,utils,tests}`, `*.styled.tsx`, kontrakty widoków `*ViewContracts.ts`. Formularze wystawców i warsztatów trzymają ten podział wzorowo.

Edytor jest jedynym obszarem, który z niego wypada:

- siedzi w `src/components/editor/`, a nie w `src/pages/admin/editor/`, mimo że jest stroną administracyjną pod `/admin/editor`;
- `Editor.tsx` to 427 linii: 14 styled-components, logika i duże drzewo JSX w jednym pliku;
- `EditorContext.tsx` nie pilnuje żadnych niezmienników (nakładanie, unikalność indeksu);
- brak testów widoku — testy pokrywają tylko czyste utils.

---

## 4. Porównanie finansowe

### 4.1 Czego brakuje

W całym projekcie **nie istnieje żadna cena stoiska** — ani cennik, ani pole kwoty w modelu stoiska, ani w zgłoszeniu wystawcy. Są tylko ceny biletów i warsztatów. Bez podania cen nie da się policzyć przychodu.

**Potrzebne dane wejściowe:** ceny Premium / Standard / Mini za 2026 oraz informacja, czy cennik na 2027 się zmienia.

### 4.2 Co wynika z danych

`src/assets/hall.json` zawiera realne obsadzenie z zeszłego roku.

|                           | 2026 (zrealizowane) | Propozycja 2027 | Różnica |
| :------------------------ | ------------------: | --------------: | :------ |
| Premium (3×5,5 m)         |                   5 |               5 | 0       |
| Standard (3×3,5 m)        |                  36 |              37 | **+1**  |
| Mini (3×2 m)              |                   7 |              11 | **+4**  |
| **Stoisk sprzedawalnych** |              **48** |          **53** | **+5**  |
| Obsadzenie                |    **48/48 = 100%** |               — | —       |
| Powierzchnia sprzedawalna |              504 m² |          534 m² | +30 m²  |
| Udział w hali (1196 m²)   |              42,1 % |          44,6 % | +2,5 pp |

Wzór na przychód:

```
2026 = 5·P + 36·S + 7·M
2027 = 5·P + 37·S + 11·M
Δ    = 1·S + 4·M
```

### 4.3 Dwa wnioski ważniejsze od samej kwoty

1. **Zeszłoroczne obsadzenie to 100 %.** Wszystkie 48 stoisk miały wystawcę — przychód był ograniczony liczbą stoisk, nie popytem. Każde dodatkowe stoisko to z dużym prawdopodobieństwem dodatkowy przychód.
2. **48 stoisk to tylko 38 wystawców.** Dziesięciu wystawców wzięło po dwa stoiska (Biferno, Wełna Bawełna, Kokonki, Gabo Wool, Centrum Włóczek Bafpol, Brioszka, Pimotki, Mila Druciarnia, Furora Yarns, 7oczek) — **26 % wystawców chce więcej niż jedno stoisko**. Tymczasem formularz pozwala wskazać 3 _preferencje_ na _jedno_ stoisko (`VENDOR_FORM_MAX_PREFERRED_STANDS = 3`), a zgłoszenie ma jedno `allocatedStandId`. Algorytm kaskadowy w obecnym kształcie nie jest w stanie odtworzyć zeszłorocznej rzeczywistości. `stands_algorithm.md` §5 ma to jako TODO — dane pokazują, że to podstawowy przypadek dla jednej czwartej wystawców.

---

## 5. Formularze i panel administratora — luki

1. **„High Interest" jest funkcją martwą.** `useVendorForm.ts:24,40` ustawia `standInterestCounts` na stałą pustą mapę; `getStandInterestCounts` używane jest wyłącznie w testach. Cała ścieżka UI istnieje (badge w `SelectableHall.tsx:97`), ale nigdy się nie wyświetli. To jedyny sygnał ryzyka, jaki wg `stands_algorithm.md` wystawca miał widzieć przy wyborze stoiska.
2. **Wystawca nie widzi dostępności na żywo.** `SelectableHall.tsx:48` uznaje stoisko za zajęte tylko po statycznym `color === 'taken'` z `hall.json`. Przydziały z API (`allocatedStandId`) nie są czytane, więc można wybrać stoisko już komuś przyznane.
3. **Wystawca nie widzi ceny** wybieranego stoiska, bo cen nie ma w systemie.
4. **Algorytm kaskadowy jest tylko symulacją.** `getCascadeChoiceReservations` (`standAllocationUtils.ts`) liczy przydział przy renderze i nic nie zapisuje. Pola `allocationState`/`allocationIteration` istnieją w modelu, ale żaden kod ich nie ustawia.
5. **Kontrakt backendu jest założeniem.** `server/` jest pusty, API to zewnętrzne `https://yarnmark-api.com`.

---

## 6. Propozycja docelowa

### 6.1 Model danych (Etap 3+)

```ts
HallLayout {
  editionYear, name, status: 'draft' | 'published',
  hall: { widthM, heightM, gridSizeM },
  standTypes: [{ id, label, widthM, heightM, price }],
  stands: [{ id, index, typeId, origin: { row, col }, isHorizontal, vendorId?, description? }]
}
```

Założenia modelu:

- rozmiar stoiska wynika z typu i orientacji — nie jest trzymany drugi raz jako `width`/`height` ani jako `end`;
- pozycja to `origin`, `end` jest wyliczane;
- wymiary hali i cennik są danymi, nie stałymi w kodzie;
- `draft` vs `published` — edytor pracuje na szkicu, strona publiczna czyta tylko wersję opublikowaną; publikacja jednym przyciskiem zamiast pięciu kroków ręcznych.

### 6.2 Edytor — model interakcji

| Dziś                                      | Docelowo                                                                               |
| :---------------------------------------- | :------------------------------------------------------------------------------------- |
| klik na stoisko zaczyna nowe zaznaczenie  | klik **zaznacza** stoisko; nowe rysuje się na pustym polu                              |
| edycja tylko z listy                      | panel właściwości otwiera się po kliknięciu na siatce                                  |
| rozmiar nieedytowalny                     | zmiana typu/orientacji od razu przelicza kształt; uchwyty do rozciągania               |
| Enter duplikuje                           | rozdzielone `Dodaj` i `Zapisz zmiany`; Enter robi to, co widoczny przycisk             |
| usuwanie tylko z listy, bez potwierdzenia | `Delete` na zaznaczonym, przycisk w panelu, potwierdzenie                              |
| brak undo                                 | historia Ctrl+Z / Ctrl+Shift+Z                                                         |
| nakładanie niewidoczne                    | podświetlenie kolizji i blokada publikacji                                             |
| lista 52 identycznych kafelków            | lista z filtrem, szukajką, grupowaniem po typie, kolumnami (indeks, typ, m², wystawca) |
| brak nawigacji po mapie                   | zoom (Ctrl+scroll), panoramowanie, „dopasuj do ekranu"                                 |
| 4784 divy                                 | stoiska jako pozycjonowane prostokąty na tle siatki (jak w `Hall.tsx`)                 |

### 6.3 Docelowy panel administratora

```
/admin
├── Pulpit            ← NOWE: zgłoszenia po statusach, obsadzenie hali, przychód, decyzje do podjęcia
├── Hala
│   ├── Edytor układu ← edytor na szkicu + publikacja
│   └── Przydziały    ← NOWE: mapa + kolejka zgłoszeń, przydział przeciąganiem
├── Wystawcy
│   ├── Zgłoszenia    ← istnieje
│   └── Wystawcy      ← NOWE: wystawca jako byt, nie wiersz zgłoszenia
├── Warsztaty         ← istnieje
├── Finanse           ← NOWE: cennik, przychód 2026 vs 2027, scenariusze
└── Użytkownicy       ← istnieje
```

Najważniejszy nowy ekran to **Przydziały**: mapa hali obok kolejki zaakceptowanych zgłoszeń, przydział przeciąganiem, przycisk „Uruchom kaskadę" **zapisujący** sugestie (`allocationState: 'suggested'`) i zatwierdzanie pojedynczych przydziałów („Klepnięte" → `confirmed`). Wymaga obsługi dwóch stoisk na wystawcę.

### 6.4 Optymalizacja układu

Przy 100 % obsadzenia pytanie „jaki układ jest optymalny" znaczy „ile stoisk zmieści się przy zachowaniu alejek". Kolejność:

1. **Najpierw narzędzie do mierzenia, nie optymalizator** — panel pokazujący na żywo liczbę stoisk per typ, m² sprzedawalne, % wykorzystania hali, przychód wg cennika, listę kolizji i zbyt wąskich alejek. Pozwala ręcznie porównywać warianty i jest o rząd wielkości tańszy niż solver.
2. **Potem ewentualnie generator wariantów** — układanie rzędów przy zadanej szerokości alejki i porównanie wariantów po przychodzie. Dopiero jeśli punkt 1 pokaże, że ręczne szukanie jest wąskim gardłem.

---

## 7. Etapy wdrożenia

Każdy etap wymaga osobnej akceptacji i sam w sobie daje wartość.

| #   | Etap                                                            | Efekt                                                                               | Szac.      | Status             |
| :-- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------- | :--------- | :----------------- |
| 1   | Naprawa edycji i usuwania w edytorze                            | zaznaczanie na siatce, działająca zmiana rozmiaru, brak duplikatów, lista z filtrem | 1–2 dni    | ✅ zrobione        |
| 2   | Panel podsumowania + detekcja kolizji                           | liczby i błędy układu na żywo                                                       | 0,5–1 dnia | ⬜ niezaczęte      |
| 3   | Model `HallLayout` + jedno źródło prawdy                        | edytor, strona wystawców i formularz czytają to samo                                | 2–3 dni    | ⬜ odłożone (p. 1) |
| 4   | Konfigurowalne wymiary hali + cennik w danych                   | zmiana wymiarów i cen bez builda                                                    | 1 dzień    | ⬜ niezaczęte      |
| 5   | Zakładka Finanse (2026 vs 2027, scenariusze)                    | porównanie przychodu                                                                | 1 dzień    | ⬜ niezaczęte      |
| 6   | Zoom / panoramowanie / undo + wydajność siatki                  | komfort pracy                                                                       | 1–2 dni    | ⬜ niezaczęte      |
| 7   | Ekran Przydziały + zapisywana kaskada + dwa stoiska na wystawcę | realny proces przydziału                                                            | 3–4 dni    | ⬜ niezaczęte      |
| 8   | Podłączenie „High Interest" i dostępności na żywo do formularza | wystawca widzi ryzyko i zajętość                                                    | 1 dzień    | ⬜ niezaczęte      |
| 9   | Przeniesienie edytora do `pages/admin/editor/` + testy widoku   | zgodność ze strukturą projektu                                                      | 0,5–1 dnia | ⬜ niezaczęte      |

Etapy 3 i 4 wymagają backendu albo świadomej decyzji o pozostaniu przy JSON w repozytorium. Etapy 1, 2, 5, 6 i 9 są wykonalne w całości na froncie.

---

## 8. Etap 1 — zakres szczegółowy

**Zaznaczanie**

- [x] 1.1 Klik na istniejące stoisko na siatce zaznacza je do edycji i wypełnia formularz; nowe stoisko rysuje się tylko na pustym obszarze. — ✅ zrobione
- [x] 1.2 Zaznaczone stoisko ma widoczną obwódkę (dziś rozpoznaje się je tylko po kursorze `grab`). — ✅ zrobione

**Edycja**

- [x] 1.3 Zmiana typu, orientacji, szerokości lub wysokości przelicza kształt zaznaczonego stoiska wokół jego lewego górnego narożnika. Przy wyjściu za krawędź hali pozycja jest przycinana do hali. — ✅ zrobione
- [x] 1.4 Rozdzielenie akcji: w trybie edycji formularz zapisuje zmiany (`Zapisz zmiany`), w trybie dodawania dodaje nowe stoisko. Enter wykonuje akcję widocznego przycisku. — ✅ zrobione
- [x] 1.5 `Anuluj` wychodzi z trybu edycji bez zapisu. — ✅ zrobione

**Usuwanie**

- [x] 1.6 Klawisz `Delete`/`Backspace` usuwa zaznaczone stoisko. — ✅ zrobione
- [x] 1.7 Przycisk `Usuń` w panelu stoiska, obok `Zapisz zmiany`. — ✅ zrobione
- [x] 1.8 Potwierdzenie przed usunięciem (istniejący `ConfirmModal`). — ✅ zrobione, także dla przycisku na liście

**Lista stoisk**

- [x] 1.9 Szukajka po numerze i wystawcy. — ✅ zrobione
- [x] 1.10 Wiersz pokazuje numer, powierzchnię w m² i wystawcę; typ znalazł się w nagłówku grupy, a nie w wierszu — przy grupowaniu powtarzanie go w każdym wierszu byłoby szumem. — ✅ zrobione z odstępstwem
- [x] 1.11 Grupowanie po typie, w obrębie typu sortowanie naturalne (`S2` przed `S10`). — ✅ zrobione
- [x] 1.12 Klik na wiersz zaznacza stoisko także na siatce i przewija widok do tego stoiska. — ✅ zrobione

**Higiena**

- [x] 1.13 Nowa logika geometrii jako czyste utils (`utils/standGeometryUtils.ts`) wraz z testami. — ✅ zrobione (10 testów)
- [x] 1.14 Nowe teksty w `src/translations/pl.tsx` i `en.tsx` — zero hardkodu w JSX. — ✅ zrobione (`saveChanges`, `cancel`, `removeStand`, `removeStandConfirm`, cała sekcja `standList`)
- [x] 1.15 `npm run format`, następnie `npm run typecheck`, `npm run lint`, `npm test` — wszystkie bez błędów. — ✅ po każdym kroku; obecnie 158 testów, 0 błędów

**Poza zakresem Etapu 1:** undo, zoom i panoramowanie, detekcja kolizji (Etap 2), wydajność siatki (Etap 6), zmiany w `Hall.tsx`, `SelectableHall.tsx` i plikach JSON.

**Pliki w zakresie:** `Editor.tsx`, `StandForm.tsx`, `StandList.tsx`, `useStandForm.ts`, `EditorContext.tsx`, nowy `utils/standGeometryUtils.ts` + test, `src/translations/pl.tsx`, `src/translations/en.tsx`.

### Dziennik Etapu 1

**Krok 1 — edycja zapisuje zmiany kształtu (1.3, 1.4, 1.5, 1.13).** Nowy `utils/standGeometryUtils.ts` (`getResizedStandBox`, `resizeStand`, `resizeStandToDeclaredSize`) przelicza prostokąt stoiska względem lewego górnego narożnika i przycina go do hali. `useStandForm` używa go przy zmianie typu, orientacji oraz pól szerokości i wysokości, posiada jedno źródło `isEditMode` i w trybie edycji zapisuje przez `updateStand` zamiast dodawać nowe stoisko. `StandForm` pokazuje `Zapisz zmiany` + `Anuluj` albo `Dodaj stoisko`, nigdy obu naraz. Klucz `standForm.update` zastąpiony przez `saveChanges` i `cancel` w `pl.tsx` i `en.tsx`.

Weryfikacja w przeglądarce (headless Chrome przez CDP, dev server na 8090): zmiana typu `standard` → `premium` przesunęła dolną krawędź stoiska z rzędu 16 na 20, ręczne wpisanie szerokości 6 m rozszerzyło je z kolumny 9 na 15, Enter w formularzu zapisał zmiany i **nie** utworzył duplikatu (lista nadal 1 stoisko), `Anuluj` wrócił do trybu dodawania, a dodanie nowego stoiska nadal działa. Zero błędów w konsoli.

**Krok 2 — zaznaczanie stoiska na siatce (1.1, 1.2).** Kliknięcie stoiska na siatce zaznacza je do edycji i od razu rozpoczyna przeciąganie; kliknięcie pustej kratki wychodzi z trybu edycji i zaczyna nowe stoisko. Kliknięcie w obrębie stoiska nie przesuwa już zielonego prostokąta zaznaczenia. Zaznaczone stoisko dostało grubą czerwoną obwódkę (4 px) z białą otoczką po obu stronach, dzięki czemu czyta się na każdym kolorze stoiska z palety; obwódka jest rysowana jako jeden element nad siatką (`getStandOutlineRect` + `ROW_PITCH_PX`), a nie jako ramki na 4784 komórkach. Logika „czy stoisko już istnieje" wyekstrahowana do `utils/standSelectionUtils.ts` i współdzielona przez `Editor` i `useStandForm`.

Poza zakresem 1.1–1.2, ale konieczne: `useStandDrag` po przeciągnięciu aktualizuje też `currentStand`. Bez tego formularz trzymał stare współrzędne i kolejne `Zapisz zmiany` cofało przesunięcie — zaznaczanie klikiem czyni tę ścieżkę łatwą do trafienia.

Weryfikacja w przeglądarce: kliknięcie stoiska wypełnia formularz i przełącza przycisk na `Zapisz zmiany`, kliknięcie drugiego stoiska przełącza zaznaczenie, kliknięcie pustej kratki czyści formularz i wraca do `Dodaj stoisko` (lista stoisk bez zmian), obwódka ma wymiary co do piksela zgodne z `getStandOutlineRect` (68, 170, 101 × 118 px), a przeciągnięcie stoiska o 8 kolumn i następujące po nim `Zapisz zmiany` zachowuje nową pozycję. Zero błędów w konsoli.

**Krok 3 — usuwanie stoiska (1.6, 1.7, 1.8).** Nowy `useStandRemoval.ts` jest jedyną ścieżką usuwania: trzyma stoisko oczekujące na potwierdzenie, obsługuje skrót klawiszowy i po usunięciu zaznaczonego stoiska resetuje formularz do trybu dodawania. Wszystkie trzy wyzwalacze — `Delete`/`Backspace`, przycisk `Usuń stoisko` w formularzu i przycisk `Usuń` przy wierszu listy — przechodzą przez ten sam `ConfirmModal`. Wcześniej przycisk na liście kasował stoisko natychmiast, bez pytania (p. 2.C); teraz jest spójny z resztą. Skrót klawiszowy jest wyciszany, gdy fokus stoi w polu formularza, więc kasowanie znaków w `Nazwa wystawcy` nie usuwa stoiska — warunek siedzi w czystym `utils/editorKeyboardUtils.ts`.

Weryfikacja w przeglądarce: zaznaczenie stoiska i `Delete` otwiera okno „Remove stand S1? This cannot be undone." bez usuwania czegokolwiek, potwierdzenie usuwa stoisko i czyści formularz do `Dodaj stoisko`, `Anuluj` zostawia stoisko nietknięte, `Backspace` w polu `Wystawca` nie rusza listy, a przyciski w formularzu i na liście usuwają przez to samo okno. Zero błędów w konsoli.

**Krok 4 — użyteczna lista stoisk (1.9, 1.10, 1.11, 1.12).** Cała logika listy siedzi w czystym `utils/standListUtils.ts`: wyszukiwanie po numerze i wystawcy, sortowanie naturalne, grupowanie po typie w stałej kolejności (premium → standard → mini → inne) i liczenie powierzchni z prostokąta na siatce, z odwrotem do zadeklarowanych wymiarów, gdy stoisko nie ma współrzędnych. Wiersz pokazuje numer, powierzchnię i wystawcę (albo „bez wystawcy"), typ jest w nagłówku grupy razem z licznikiem. Lista dostała własny obszar przewijania (420 px), żeby 52 stoiska nie rozpychały strony. Kliknięcie wiersza nie tylko zaznacza stoisko, ale też przewija widok do niego — przy hali o 92 rzędach samo zaznaczenie było niewidoczne dla większości stoisk.

Weryfikacja w przeglądarce na prawdziwym presecie 2026 (52 stoiska): nagłówki grup pokazują `premium (5)`, `standard (36)`, `mini (7)`, `other (4)`, co zgadza się z danymi z §4.2; kolejność w DOM to `P1…P5, C1, S1, S2, S3 … S9, S10 … S35, M1 … M7, a0, a1, A2, A3`, czyli sortowanie naturalne, nie alfabetyczne; szukanie `S1` zawęża do 11 stoisk, `bawe` znajduje stoisko po nazwie wystawcy, `zzz` pokazuje komunikat o braku wyników, a pusty edytor komunikat o braku stoisk. Kliknięcie wiersza `M4` przewinęło stronę do stoiska na wysokości ok. 27 m i zaznaczyło je czerwoną obwódką. Zero błędów w konsoli.

---

## 9. Otwarte pytania

- [ ] **Ceny stoisk** — Premium / Standard / Mini za 2026 oraz ewentualne zmiany na 2027. Blokuje Etap 5.
- [ ] **Powierzchnia hali** — 1196 m² (26 × 46 z kodu) czy 1142 m² (treść strony)?
- [ ] **Backend dla układu hali** — czy powstanie, czy zostajemy przy JSON w repozytorium? Blokuje Etapy 3 i 4.
- [ ] **Ograniczenia hali** — minimalna szerokość alejki, wyjścia ewakuacyjne, słupy, rampa. Potrzebne do walidacji układu i liczenia optymalnego rozstawienia.
- [ ] **Logi debugowe** (p. 2.G) — usunąć przy okazji Etapu 1 czy zostawić? Kod jest wcześniejszy niż ten plan, więc czeka na decyzję.
