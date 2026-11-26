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
| eslint                    | 9.39.5          | 10.15.0         |
| @typescript-eslint/\*     | 8.74.0          | 8.74.0          |
| eslint-plugin-react-hooks | 7.1.1           | 7.1.1           |
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
- ~~**ESLint w starym formacie** (`.eslintrc.js` + `.eslintignore`) zamiast flat config.~~ ✅ ESLint 9 + `eslint.config.mjs`.
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

### Krok 0. Inwentaryzacja i zrozumienie kodu — 🟡 w toku

- Przejście przez architekturę: mapa modułów, przepływ danych, strefy routingu.
- `npm run check:unused` (knip) — nieużywany kod, eksporty i zależności.
  - [x] ✅ Usunięte: `PhotoBox.tsx`, `TextCarousel.tsx`, `react-bootstrap`, `bootstrap`.
  - [ ] Pozostałe nieużywane pliki: `Box`, `generateJson`, `KnittingIconOnHover`, `SocialMediaLink`, `useFirstClick`,
        `useOnClickOutside`; zależności FontAwesome; ok. 40 nieużywanych eksportów i 26 typów.
- Porządki w roocie (`konwerter.py`, `mapa3.html`, `todo.txt`, `stands_algorithm.md`, `.codex`) — decyzja: usunąć /
  przenieść do `docs/`.
- Uzupełnienie `README.md` (uruchomienie, skrypty, struktura).

### Krok 1. Tooling: TypeScript i ESLint — 🟡 w toku

- [x] ✅ TypeScript 5.9.3 (ostatnia 5.x; 7.0 to przepisanie w Go — osobna decyzja), usunięte `typeRoots`.
- Uwaga: `target` w `tsconfig.json` dotyczy tylko typecheckingu (`tsc --noEmit`); kod generuje esbuild z własnym
  `target: 'es2019'` (`esbuild.config.mjs`). `jsx` z `tsconfig.json` esbuild czyta i stosuje przy buildzie.
- [x] ✅ **1a. `target` i `lib`** (tylko `tsconfig.json`): `target: "ES2022"`, `lib: ["DOM", "DOM.Iterable", "ES2022"]`,
      `noEmit: true` (wymagane przez `allowImportingTsExtensions`). Sprawdzenie: `yarn typecheck`.
- [x] ✅ **1b. `moduleResolution: "Bundler"`** (tylko `tsconfig.json`) — rozwiązywanie importów jak w esbuildzie,
      z obsługą pola `exports`. Sprawdzenie: `yarn typecheck`.
- [x] ✅ **1c. Nowy transform JSX:** `jsx: "react-jsx"` w `tsconfig.json` + `'plugin:react/jsx-runtime'` w
      `.eslintrc.js` (wyłącza `react/react-in-jsx-scope`). Preset wyłącza też `react/jsx-uses-react`, więc lint wymusza
      zrobienie 1d w tym samym commicie. Sprawdzenie: typecheck, lint, testy
      i przeklikanie strony (zmienia się wygenerowany kod).
- [x] ✅ **1d. Usunięcie zbędnych `import React`** — 152 pliki importują `React`, z czego 111 to samo
      `import React from 'react';`. Usuwać tam, gdzie plik nie używa `React.` (np. `React.ReactNode`); przy
      `import React, { … }` zostawić nazwane importy. Skryptem, potem typecheck, lint, testy.
- [x] ✅ **1e. Aliasy ścieżek:** dodane `paths: { "@/*": ["./src/*"] }` i `eslint-import-resolver-typescript` 4.4.5
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
- [x] ✅ **2a. ESLint 8.49.0 → 8.57.1** (ostatnia 8.x) — samo podbicie, bez zmian w konfiguracji. Potrzebne, bo
      typescript-eslint 8 wymaga ESLint ≥ 8.57.
- [x] ✅ **2b. `@typescript-eslint/parser` i `eslint-plugin` 6.6.0 → 8.74.0** — nadal na starym formacie konfiguracji.
      Razem z nim `eslint-plugin-react` 7.33.2 → 7.37.5: stary plugin nie rozumiał AST typescript-eslint 8 i zgłaszał
      fałszywe `react/prop-types` dla `forwardRef` w `MultiCarousel.tsx`. Zestaw reguł bez zmian (272, porównanie
      `eslint --print-config`).
- [x] ✅ **2c. Pluginy bez zmiany reguł:** `eslint-plugin-jsx-a11y` 6.10.2,
      `eslint-plugin-import` 2.32.0, `eslint-config-prettier` 10.1.8, `eslint-plugin-prettier` 5.5.7 (`react-hooks`
      osobno, krok 2e).
      Aktywnych reguł nadal 90; `eslint-config-prettier` 10 dopisuje tylko wyłączenia (`off`) dla `@stylistic/*` i
      `unicorn/template-indent`, których projekt nie używa.
- [x] ✅ **2d. ESLint 9 + flat config:** `eslint` 9.39.5, `@eslint/js` 9.39.5, `globals` 17.14.0, `typescript-eslint`
      8.74.0 (zamiast osobnych `@typescript-eslint/parser` i `eslint-plugin`); nowy `eslint.config.mjs`; usunięte
      `.eslintrc.js` i `.eslintignore` (wzorce dla obrazków i fontów zbędne — ESLint 9 i tak lintuje tylko JS/TS);
      `lint:fix` bez `--ext`. Dodatkowo, z konieczności:
  - `eslint-plugin-react-hooks` 4.6.0 → 5.2.0 — 4.6.x wywraca się na ESLint 9 (`context.getSource is not a
function`); 5.x to pierwsza linia ze wsparciem ESLint 9, bez reguł React Compilera (te są w 6/7, krok 2e).
  - `linterOptions.reportUnusedDisableDirectives: 'off'` — jak w ESLint 8. ESLint 9 domyślnie ostrzega o zbędnych
    `eslint-disable`; jedyny taki to `useStandDrag.ts:101` (`exhaustive-deps` w 5.2 nic tam nie zgłasza) — do
    decyzji przy 2f.
  - Zestaw reguł: te same reguły projektu i pluginów; różnica tylko w `eslint:recommended` z ESLint 9 — usunięte
    przestarzałe `no-inner-declarations`, `no-new-symbol`; dodane `no-constant-binary-expression`,
    `no-empty-static-block`, `no-new-native-nonconstructor`, `no-unused-private-class-members` (bez nowych błędów).
- [x] ✅ **2e. `eslint-plugin-react-hooks` 5.2.0 → 7.1.1** — włączony preset `recommended-latest` (opis reguł z
      przykładami: `docs/updates/new-rules.md`), `exhaustive-deps` zostaje na `error`. `purity` włączone po poprawce
      `Schedule.tsx` (stabilny `key` zamiast `Math.random()`). Wyłączone do kroku 4: `refs`, `set-state-in-effect`,
      `incompatible-library`. Wynik jednorazowego lintu z całym presetem przed włączeniem (32 zgłoszenia):
  - `refs` — 20 błędów w 6 plikach: `useStandDrag.ts` (przypisywanie `ref.current` w renderze),
    `useIntersectionObserver.ts`, sekcje formularzy (`VendorFormBusinessDescriptionSection`,
    `WorkshopFormDescriptionSection`, `WorkshopFormParticipantsSection`, `WorkshopFormPricingSection` — `field.ref`
    z React Hook Form przekazywany w JSX).
  - `set-state-in-effect` — 9 błędów w 8 plikach: `Hall.tsx`, `MultiCarousel.tsx`, `useLocalStorage.ts`,
    `usePhone.ts` (2), `useAdminNewsletter.ts`, `useAdminUsers.ts`, `useStandPlanDraft.ts`, `SelectableHall.tsx`.
  - `purity` — 1 błąd: `Schedule.tsx:111` (`key={Math.random()}`).
  - `incompatible-library` — 2 ostrzeżenia: `watch()` z React Hook Form w `useVendorForm.ts` i `useWorkshopForm.ts`.
  - Pozostałe reguły presetu (`immutability`, `static-components`, `use-memo`, `globals`, `set-state-in-render`,
    `error-boundaries` i in.) — 0 zgłoszeń.
- [x] ✅ **2f. Porządki w regułach:**
  - [x] ✅ Usunięte reguły formatowania dublujące Prettiera: `linebreak-style`, `object-curly-spacing`,
        `react/jsx-tag-spacing`. Wykryte przez `npx eslint-config-prettier src/App.tsx` (po zmianie: brak konfliktów);
        próbka z naruszeniami zgłaszana była podwójnie (reguła + `prettier/prettier`). Aktywnych reguł 104 → 101,
        żadna nie doszła.
  - [x] ✅ Włączone presety `typescript-eslint` recommended i `jsx-a11y` recommended (przed regułami projektu, żeby
        nasze ustawienia miały pierwszeństwo). Pluginy `@typescript-eslint` i `jsx-a11y` rejestrują teraz presety
        (podwójna rejestracja `jsx-a11y` kończyła się błędem `Cannot redefine plugin`). Zgłoszeń po włączeniu: 10,
        wszystkie z `typescript-eslint`; `jsx-a11y` — 0 (próbka z naruszeniami potwierdza, że reguły działają).
    - `no-explicit-any` (9): `src/types.d.ts` — moduły obrazków typowane jako `string` (loader `file` w esbuildzie
      zwraca URL), usunięta martwa deklaracja `infinite-react-carousel` (brak w zależnościach i importach);
      `useOnClickOutside.ts` — `event: MouseEvent`.
    - `ban-ts-comment` (1): `service-worker.ts` — `@ts-ignore` zastąpione rzutowaniem przez `unknown` do
      `ServiceWorkerGlobalScope` (wygenerowany kod bez zmian: `var sw = self;`).
    - Usunięte reguły projektu identyczne z presetami: `jsx-a11y/alt-text`, `no-unused-vars: 0`,
      `@typescript-eslint/no-unused-vars` (wynikowa konfiguracja bez zmian, porównanie `--print-config`).
      `no-undef: 0` zostaje — preset wyłącza ją tylko dla plików TS.
    - Aktywnych reguł 101 → 137.
  - [x] ✅ `eslint-plugin-prettier` usunięty (pakiet, plugin, reguła `prettier/prettier`, import `.prettierrc.json`)
        i zastąpiony skryptem `format:check` (`prettier --check .`), dodanym do `.husky/pre-commit` i do workflowu
        `pull-request.yml` (krok „Format check”). `eslint-config-prettier` zostaje — wyłącza reguły kolidujące
        z Prettierem. Czasy lokalnie: lint ~20 s → ~16 s, `format:check` ~9 s; łącznie pre-commit wolniejszy o ~5 s,
        ale sprawdza formatowanie wszystkich plików (wcześniej tylko `src/**/*.{ts,tsx}`). Zaległych zmian formatowania: 0.
- Kolejność: 2a → 2b → 2c → 2d → 2e → 2f.

### Krok 2. Bundler — ⬜ do zrobienia

- Decyzja: zostać na esbuild (podbicie do 0.28 + pluginy) czy przejść na **Vite**.
- Vite ułatwia późniejsze Module Federation, Vitest i HMR.
- Zachować działanie service workera i workflowów CI (metadane paczki, porównanie rozmiaru).

### Krok 3. Aktualizacje głównych bibliotek — ⬜ do zrobienia

Kolejno, każda osobno:

1. ✅ React 19 + `@types/react` 19: `react` / `react-dom` 18.2.0 → 19.3.1, `@types/react` 18.2.21 → 19.3.3,
   `@types/react-dom` 18.2.7 → 19.3.0 (także w `resolutions`). Bez zmian w kodzie: typecheck, lint, testy i bundle
   przechodzą; brak usuniętych API (`ReactDOM.render`, `findDOMNode`, `defaultProps`, `propTypes`, string refs);
   peer dependencies pozostałych bibliotek obejmują React 19. Sprawdzone w headless Chromium: 11 tras renderuje się bez
   błędów Reacta w konsoli, formularz wystawcy (wpisywanie, walidacja) i przełączanie menu działają.
2. ✅ react-router 8.5.3 (zamiast planowanej 7 — v8 wyszła w czerwcu 2026): `react-router-dom` 6.16.0 usunięty
   (w v8 pakiet nie istnieje), importy w 8 plikach przepisane na `react-router`. v8 wymaga React ≥ 19.2.7 i Node ≥ 22.22,
   więc Node w CI podbity do 24 we wszystkich workflowach (było 18/20; w `bundle-metadata.yml` `node_version` nie był
   w ogóle zdefiniowany — `env` wywołującego nie przechodzi do workflowu `workflow_call`). Pozostałe zmiany łamiące v8
   (middleware, `meta`, loadery) dotyczą data routera, którego projekt nie używa. `react-router-hash-link` i
   `@types/react-router-hash-link` usunięte (importowały `react-router-dom`; żaden link nie używał kotwic `#`) —
   `Link.tsx` używa `Link`/`LinkProps` z `react-router`. Sprawdzone w headless Chromium: 11 tras, nawigacja
   wewnętrzna bez przeładowania (`/info-for-vendors` → `/vendor/statute`), link zewnętrzny otwiera nową kartę, menu.
3. ✅ i18next 23.5.1 → 27.2.9 i react-i18next 13.2.2 → 18.0.3 (obie wymagają Node ≥ 22 — CI już na 24). Bez zmian
   w kodzie. Przejrzane zmiany łamiące v24–v27 / v14–v18 pod kątem tego, czego projekt używa (`init` z `lng`,
   `resources`, `interpolation.escapeValue: false`; `I18nextProvider`, `useTranslation`, `Trans`, `changeLanguage`):
   brak pustych tłumaczeń (`returnEmptyString: false` w v27), brak kluczy liczby mnogiej (format v4 w v24), brak
   `fallbackLng` (domyślne `dev` i tak nie miało zasobów). Sprawdzone w headless Chromium: tekst 8 tras po polsku
   i angielsku identyczny jak ze starą wersją (różnice tylko w losowej treści, iframe Google i danych z API),
   przełączanie języka działa (tekst, `Trans` z linkiem, `localStorage`, `<html lang>`).
4. ✅ Pozostałe (jednym krokiem): zod 4.1.12 → 4.6.7, react-hook-form 7.89.0 → 7.92.0, @hookform/resolvers
   5.9.1 → 7.0.9 (v6/v7 zmieniają tylko resolvery Effect i TypeBox — używamy `resolvers/zod`), @iconify/react 4.1.1 →
   6.0.4, FontAwesome 7.1.0 → 7.3.1 i react-fontawesome 3.1.0 → 3.5.0 (✅ styled-components 6.7.0, ✅ bootstrap
   usunięty). Bez zmian w kodzie. Sprawdzone w headless Chromium (stare vs nowe wersje): walidacja formularzy
   `/vendor/apply` i `/workshops/apply` identyczna. Ikony Iconify są tylko w pasmach wyłączonych w `src/toggles.ts`
   (`foodEnabled`, `goldenPretzelEnabled`, `afterEnabled`) — sprawdzone w osobnej stronie testowej z prawdziwym
   pakietem (6 ikon, poprawne rozmiary). FontAwesome używa tylko nieużywany `SocialMediaLink.tsx` (krok 0) — tylko
   typecheck.
5. ✅ Drobne aktualizacje (osobny krok): prettier 3.6.2 → 3.10.1, @emotion/is-prop-valid 1.2.1 → 1.4.0,
   esbuild-plugin-manifest 1.0.3 → 1.0.5, @types/argv 0.0.5 → 0.0.8, @types/bytes 3.1.1 → 3.1.7. Nowy styl Prettiera
   (unie typów w jednej linii, `extends Omit<…>` z rozbitymi argumentami) przyjęty w 5 plikach. Nowe typy `bytes`
   (`string | null`) ujawniły `null`/`NaN` w porównaniu rozmiaru bundla dla plików obecnych tylko po jednej stronie —
   `compareMetadata.ts` liczy brakujący wpis jako 0 i formatuje przez `formatBytes`.

### Krok 4. Nowoczesne praktyki Reactowe — ⬜ do zrobienia

- Code splitting tras: `React.lazy` + `Suspense` (osobna paczka dla `/admin/*`).
- Error boundaries.
- React Compiler (zamiast ręcznego `useMemo`/`useCallback`).
- Actions / `useActionState` / `useOptimistic` w formularzach i panelu admina.
- TanStack Query jako warstwa pobierania danych i cache nad `apiClient.ts`.

### Krok 5. Refaktor domeny i komponentów — ⬜ do zrobienia

- Wspólna abstrakcja „zgłoszenia” (status flow, storage, API, panel) dla wystawców i warsztatów.
- Rozbicie największych plików (`Editor.tsx`, `Carouselge.tsx`, `Menu.tsx`,
  `VendorsApplicationsPage.styled.tsx`, `useVendorForm.ts`).
- Podział tłumaczeń na namespace'y.
- [x] ✅ Jeden system stylowania: Bootstrap usunięty, potrzebne reguły Reboot przeniesione do `src/styles/reboot.ts`
      (zweryfikowane pomiarem computed styles na 9 widokach).
- [ ] 🟡 Migracja na transient props `$prop` i usunięcie łatki `shouldForwardProp`:
  - [x] ✅ Wszystkie prywatne (niewyeksportowane) styled-components oraz komponenty bandu wzorów.
  - [ ] Współdzielone/eksportowane: `Typography`, `FlexColumnLayout`, `RowLayout`, `BandRootLayout`, `Icon`, `Card`,
        `CtaButton`, `Curtain`, `CardLayout` (+ `MobileCardLayout`), `Ribbon`, `LeftBackgroundImage`, `HeaderCell`/`BodyCell`,
        `Carouselge.ItemBackground`.
  - [ ] Na końcu: usunięcie `StyleSheetManager shouldForwardProp` z `src/index.tsx` i `@emotion/is-prop-valid`.

### Krok 6. Testy komponentów — ⬜ do zrobienia

- Vitest + Testing Library obok istniejących testów utilsów (lub migracja całości na Vitest).
- Testy kluczowych przepływów: formularz wystawcy, formularz warsztatów, logowanie admina.

### Krok 7. Monorepo i mikrofrontend — ⬜ do zrobienia

- Workspaces: `apps/public`, `apps/admin`, `packages/ui`, `packages/domain`, `packages/translations`.
- Ćwiczenie: admin jako mikrofrontend (Module Federation) lub osobny deploy pod `/admin`.

---

## 4. Otwarte pytania

- Gdzie jest projekt _learning notes_ / jakie tematy z niego przećwiczyć (do dopasowania kroków 4–7).
- Tryb pracy: wspólne omawianie kodu przed każdym krokiem czy realizacja kroku i omówienie zmian po fakcie.
- Esbuild czy Vite (krok 2).
- ~~Bootstrap czy styled-components jako docelowy system stylowania (krok 5).~~ ✅ styled-components.
