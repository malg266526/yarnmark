# Modernizacja projektu — kontekst i plan kroków

Cel: przejść przez projekt od początku, zrozumieć kod, uporządkować go po długim okresie „vibe codingu”, zaktualizować
biblioteki, wprowadzić nowoczesne praktyki (React, architektura) i przećwiczyć tematy z projektu _learning notes_
(m.in. mikrofrontendy i usprawnienia Reactowe).

Stan na: 2026-11-25 (commit `3b2cc80`, branch `master`). Ostatnia aktualizacja postępu: 2026-11-25 (commit `5c5f1b3`).

---

## 1. Stan wyjściowy

### Co działa dobrze

- `npm run typecheck`, `npm run lint`, `npm test` przechodzą bez błędów (378 testów, 68 plików `*.test.ts`,
  runner `node --test --experimental-transform-types`).
- Nowsze obszary (formularze wystawców i warsztatów, panel admina) mają sensowny podział: `src/domain/`, hooki,
  `*Utils.ts`, `*.styled.tsx`, Zod + React Hook Form.
- Istnieje backend API (`https://yarnmark-api.com`, klient w `src/domain/apiClient.ts`), CI w `.github/workflows`
  (deploy, metadane paczki, porównanie rozmiaru w PR), husky.
- Reguły pracy opisane w `AGENTS.md`.

### Stos technologiczny

- SPA budowane **esbuildem** (`esbuild.config.mjs`, `esbuild.serve.mjs`, `esbuild.bundle.mjs`), dev server na porcie 8090.
- Routing: `react-router-dom` v6 (`src/App.tsx`, `<Routes>/<Route>`), strefy: publiczna, partner (`/vendor/*`,
  `/workshops/apply`), admin (`/admin/*` z `AdminLayout`).
- Stylowanie: **styled-components 6** (Bootstrap i react-bootstrap usunięte, globalny reset w `src/styles/reboot.ts`).
- i18n: `i18next` + `react-i18next`, tłumaczenia w `src/translations/pl.tsx` i `en.tsx`.
- Service worker (`src/service-worker.ts`).

### Przestarzałe zależności (najważniejsze)

| Pakiet                    | Obecnie         | Najnowsza       |
| :------------------------ | :-------------- | :-------------- |
| react / react-dom         | 18.2.0          | 19.3.1          |
| @types/react / react-dom  | 18.2.x          | 19.3.x          |
| react-router-dom          | 6.16.0          | 7.18.7          |
| typescript                | 5.9.3           | 7.0.2           |
| eslint                    | 8.49.0          | 10.15.0         |
| @typescript-eslint/\*     | 6.6.0           | 8.74.0          |
| eslint-plugin-react-hooks | 4.6.0           | 7.1.1           |
| esbuild                   | 0.19.2          | 0.28.2          |
| i18next / react-i18next   | 23.5.1 / 13.2.2 | 27.2.9 / 18.0.3 |
| @hookform/resolvers       | 5.9.1           | 7.0.9           |
| @iconify/react            | 4.1.1           | 6.0.4           |
| @types/node               | 20.6.1          | 26.6.10         |
| styled-components         | 6.7.0           | 6.7.0           |
| zod                       | 4.1.12          | 4.6.7           |

Pełna lista: `npm outdated`.

### Zidentyfikowane problemy

- **Konfiguracja TS przestarzała:** `target: ES2019`, `moduleResolution: Node`, `jsx: "react"` (stary transform —
  `import React` w każdym pliku), brak aliasów ścieżek. ✅ `typeRoots: ["./src/types.ts"]` usunięte (wskazywało
  nieistniejący plik i wyłączało automatyczne `@types`); TypeScript podbity do 5.9.3 (wymóg styled-components 6.7).
- **ESLint w starym formacie** (`.eslintrc.js` + `.eslintignore`) zamiast flat config.
- **Duplikacja domen:** wystawcy i warsztaty mają równoległe stosy (formularz, schema, storage, API, panel admina).
- **Bardzo duże pliki:** `pl.tsx`/`en.tsx` (1381 linii), `VendorsApplicationsPage.styled.tsx` (960),
  `Carouselge.tsx` (561), `Editor.tsx` (524), `Menu.tsx` (342), `useVendorForm.ts` (367).
- ~~**Dwa systemy stylowania** (Bootstrap + styled-components)~~ ✅ Bootstrap usunięty. Nadal jest łatka
  `shouldForwardProp` w `src/index.tsx` (pozostałość migracji styled-components v5 → v6).
- **Brak code splittingu:** wszystkie trasy (w tym cały panel admina) w jednej paczce, brak `React.lazy`/`Suspense`.
- **Ręczne pobieranie danych** w plikach `*Api.ts` / hookach, bez warstwy cache (np. TanStack Query).
- **Brak testów komponentów** — testowane są tylko pure utils.
- **Śmieci w roocie repo:** `konwerter.py`, `mapa3.html`, `todo.txt`, `stands_algorithm.md`, `.codex`.
- `README.md` zawiera tylko linki do środowisk.

---

## 2. Mikrofrontendy — ocena

Dla jednego zespołu i jednej domeny mikrofrontendy są przerostem formy (rozwiązują problem niezależnych zespołów
i deployów, którego tu nie ma). Projekt ma jednak naturalną granicę do przećwiczenia tematu:
**strona publiczna** vs **panel admina** (`/admin/*`).

Rekomendowane podejście dwuetapowe:

1. **Monorepo** (npm/pnpm workspaces): `apps/public`, `apps/admin`, `packages/ui`, `packages/domain`,
   `packages/translations` — wartościowe samo w sobie.
2. **Mikrofrontend jako ćwiczenie:** admin wpięty przez Module Federation (Rspack/Vite) albo jako osobny deploy
   pod `/admin`.

---

## 3. Sugerowana kolejność kroków

Każdy krok to osobny PR. Po każdym: `npm run format`, `npm run typecheck`, `npm run lint`, `npm test` bez błędów.
Aktualizacje zależności izolowane (jedna biblioteka / jedna grupa na PR), wersje przypięte bez `^`/`~`.

### Krok 0. Inwentaryzacja i zrozumienie kodu — [ ] (w toku)

- Przejście przez architekturę: mapa modułów, przepływ danych, strefy routingu.
- `npm run check:unused` (knip) — nieużywany kod, eksporty i zależności.
  - [x] Usunięte: `PhotoBox.tsx`, `TextCarousel.tsx`, `react-bootstrap`, `bootstrap`.
  - [ ] Pozostałe nieużywane pliki: `Box`, `generateJson`, `KnittingIconOnHover`, `SocialMediaLink`, `useFirstClick`,
        `useOnClickOutside`; zależności FontAwesome; ok. 40 nieużywanych eksportów i 26 typów.
- Porządki w roocie (`konwerter.py`, `mapa3.html`, `todo.txt`, `stands_algorithm.md`, `.codex`) — decyzja: usunąć /
  przenieść do `docs/`.
- Uzupełnienie `README.md` (uruchomienie, skrypty, struktura).

### Krok 1. Tooling: TypeScript i ESLint — [ ] (w toku)

- [x] TypeScript 5.9.3 (ostatnia 5.x; 7.0 to przepisanie w Go — osobna decyzja), usunięte `typeRoots`.
- Uwaga: `target` w `tsconfig.json` dotyczy tylko typecheckingu (`tsc --noEmit`); kod generuje esbuild z własnym
  `target: 'es2019'` (`esbuild.config.mjs`). `jsx` z `tsconfig.json` esbuild czyta i stosuje przy buildzie.
- [x] **1a. `target` i `lib`** (tylko `tsconfig.json`): `target: "ES2022"`, `lib: ["DOM", "DOM.Iterable", "ES2022"]`,
      `noEmit: true` (wymagane przez `allowImportingTsExtensions`). Sprawdzenie: `yarn typecheck`.
- [x] **1b. `moduleResolution: "Bundler"`** (tylko `tsconfig.json`) — rozwiązywanie importów jak w esbuildzie,
      z obsługą pola `exports`. Sprawdzenie: `yarn typecheck`.
- [x] **1c. Nowy transform JSX:** `jsx: "react-jsx"` w `tsconfig.json` + `'plugin:react/jsx-runtime'` w
      `.eslintrc.js` (wyłącza `react/react-in-jsx-scope`). Preset wyłącza też `react/jsx-uses-react`, więc lint wymusza
      zrobienie 1d w tym samym commicie. Sprawdzenie: typecheck, lint, testy
      i przeklikanie strony (zmienia się wygenerowany kod).
- [x] **1d. Usunięcie zbędnych `import React`** — 152 pliki importują `React`, z czego 111 to samo
      `import React from 'react';`. Usuwać tam, gdzie plik nie używa `React.` (np. `React.ReactNode`); przy
      `import React, { … }` zostawić nazwane importy. Skryptem, potem typecheck, lint, testy.
- [x] **1e. Aliasy ścieżek:** dodane `paths: { "@/*": ["./src/*"] }` i `eslint-import-resolver-typescript` 4.4.5
      (resolver w `.eslintrc.js`, bez niego `import/no-unresolved` odrzuca `@/…`). ✅ Importy przepisane na `@/` tam,
      gdzie alias jest krótszy (ostrzeżenie WebStorma „Import can be shortened”): 804 importy w 176 plikach. Wyjątek: 43
      pliki osiągalne z testów (`*.test.ts` i ich zależności) zostają przy ścieżkach względnych, bo `node --test` nie
      rozumie aliasu.
      Pierwotny opis (opcjonalnie): `paths: { "@/*": ["./src/*"] }` (esbuild czyta `paths` z tsconfig;
      `node --test` nie, ale testy importują tylko utilsy). Przepisanie 552 importów `../../../…` to osobna decyzja —
      `@/` w nowym/zmienianym kodzie albo partiami, katalog po katalogu.
- Kolejność: 1a → 1b → 1c → 1d, 1e na końcu albo wcale.
- ESLint → flat config, typescript-eslint 8, aktualne pluginy. Stan wyjściowy: ESLint 8.49 z `.eslintrc.js` +
  `.eslintignore`; `@typescript-eslint` 6.6 podpięty bez żadnego presetu (działa tylko `no-unused-vars`); `jsx-a11y`
  podpięty, ale włączona tylko `alt-text`; reguły formatowania dublujące Prettiera (`object-curly-spacing`,
  `linebreak-style`, `react/jsx-tag-spacing`); skrypt `lint:fix` używa `--ext`, którego nie ma w ESLint 9.
- Cel: **ESLint 9 (9.39.5), nie 10** — `eslint-plugin-react`, `eslint-plugin-import` i `eslint-plugin-jsx-a11y`
  w najnowszych wersjach obsługują ESLint najwyżej w wersji 9.
- [x] **2a. ESLint 8.49.0 → 8.57.1** (ostatnia 8.x) — samo podbicie, bez zmian w konfiguracji. Potrzebne, bo
      typescript-eslint 8 wymaga ESLint ≥ 8.57.
- [x] **2b. `@typescript-eslint/parser` i `eslint-plugin` 6.6.0 → 8.74.0** — nadal na starym formacie konfiguracji.
      Razem z nim `eslint-plugin-react` 7.33.2 → 7.37.5: stary plugin nie rozumiał AST typescript-eslint 8 i zgłaszał
      fałszywe `react/prop-types` dla `forwardRef` w `MultiCarousel.tsx`. Zestaw reguł bez zmian (272, porównanie
      `eslint --print-config`).
- [ ] **2c. Pluginy bez zmiany reguł:** `eslint-plugin-jsx-a11y` 6.10.2,
      `eslint-plugin-import` 2.32.0, `eslint-config-prettier` 10.1.8, `eslint-plugin-prettier` 5.5.7 (`react-hooks`
      osobno, krok 2e).
- [ ] **2d. ESLint 9 + flat config:** `eslint` 9.39.5, `@eslint/js`, `globals`; nowy `eslint.config.mjs` (paczka
      `typescript-eslint` zamiast osobnych parsera i pluginu); usunięcie `.eslintrc.js` i `.eslintignore`; poprawka
      skryptu `lint:fix`. Reguły przeniesione 1:1 — sprawdzenie przez porównanie `eslint --print-config` przed i po
      oraz identyczny wynik lintu.
- [ ] **2e. `eslint-plugin-react-hooks` 4.6.0 → 7.1.1** — wersja 7 dodaje reguły React Compilera (m.in. `purity`,
      `refs`, `set-state-in-effect`), które mogą pokazać dużo nowych błędów. Najpierw policzyć i pokazać wyniki, potem
      decyzja, co włączyć.
- [ ] **2f. Porządki w regułach (opcjonalnie):** usunięcie reguł formatowania dublujących Prettiera; rozważenie
      zastąpienia `eslint-plugin-prettier` osobnym `prettier --check` (szybszy lint); włączenie presetów
      `typescript-eslint` recommended i `jsx-a11y` recommended (nowe błędy do naprawy — osobno).
- Kolejność: 2a → 2b → 2c → 2d → 2e → 2f.

### Krok 2. Bundler — [ ]

- Decyzja: zostać na esbuild (podbicie do 0.28 + pluginy) czy przejść na **Vite**.
- Vite ułatwia późniejsze Module Federation, Vitest i HMR.
- Zachować działanie service workera i workflowów CI (metadane paczki, porównanie rozmiaru).

### Krok 3. Aktualizacje głównych bibliotek — [ ]

Kolejno, każda osobno:

1. React 19 + `@types/react` 19.
2. react-router 7 (`react-router` zamiast `react-router-dom`), ocena `react-router-hash-link`.
3. i18next + react-i18next.
4. Pozostałe: zod, react-hook-form, @hookform/resolvers, @iconify/react, FontAwesome (✅ styled-components 6.7.0,
   ✅ bootstrap usunięty).

### Krok 4. Nowoczesne praktyki Reactowe — [ ]

- Code splitting tras: `React.lazy` + `Suspense` (osobna paczka dla `/admin/*`).
- Error boundaries.
- React Compiler (zamiast ręcznego `useMemo`/`useCallback`).
- Actions / `useActionState` / `useOptimistic` w formularzach i panelu admina.
- TanStack Query jako warstwa pobierania danych i cache nad `apiClient.ts`.

### Krok 5. Refaktor domeny i komponentów — [ ]

- Wspólna abstrakcja „zgłoszenia” (status flow, storage, API, panel) dla wystawców i warsztatów.
- Rozbicie największych plików (`Editor.tsx`, `Carouselge.tsx`, `Menu.tsx`,
  `VendorsApplicationsPage.styled.tsx`, `useVendorForm.ts`).
- Podział tłumaczeń na namespace'y.
- [x] Jeden system stylowania: Bootstrap usunięty, potrzebne reguły Reboot przeniesione do `src/styles/reboot.ts`
      (zweryfikowane pomiarem computed styles na 9 widokach).
- [ ] (w toku) Migracja na transient props `$prop` i usunięcie łatki `shouldForwardProp`:
  - [x] Wszystkie prywatne (niewyeksportowane) styled-components oraz komponenty bandu wzorów.
  - [ ] Współdzielone/eksportowane: `Typography`, `FlexColumnLayout`, `RowLayout`, `BandRootLayout`, `Icon`, `Card`,
        `CtaButton`, `Curtain`, `CardLayout` (+ `MobileCardLayout`), `Ribbon`, `LeftBackgroundImage`, `HeaderCell`/`BodyCell`,
        `Carouselge.ItemBackground`.
  - [ ] Na końcu: usunięcie `StyleSheetManager shouldForwardProp` z `src/index.tsx` i `@emotion/is-prop-valid`.

### Krok 6. Testy komponentów — [ ]

- Vitest + Testing Library obok istniejących testów utilsów (lub migracja całości na Vitest).
- Testy kluczowych przepływów: formularz wystawcy, formularz warsztatów, logowanie admina.

### Krok 7. Monorepo i mikrofrontend — [ ]

- Workspaces: `apps/public`, `apps/admin`, `packages/ui`, `packages/domain`, `packages/translations`.
- Ćwiczenie: admin jako mikrofrontend (Module Federation) lub osobny deploy pod `/admin`.

---

## 4. Otwarte pytania

- Gdzie jest projekt _learning notes_ / jakie tematy z niego przećwiczyć (do dopasowania kroków 4–7).
- Tryb pracy: wspólne omawianie kodu przed każdym krokiem czy realizacja kroku i omówienie zmian po fakcie.
- Esbuild czy Vite (krok 2).
- ~~Bootstrap czy styled-components jako docelowy system stylowania (krok 5).~~ ✅ styled-components.
