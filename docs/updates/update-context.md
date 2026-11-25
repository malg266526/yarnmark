# Modernizacja projektu — kontekst i plan kroków

Cel: przejść przez projekt od początku, zrozumieć kod, uporządkować go po długim okresie „vibe codingu”, zaktualizować
biblioteki, wprowadzić nowoczesne praktyki (React, architektura) i przećwiczyć tematy z projektu _learning notes_
(m.in. mikrofrontendy i usprawnienia Reactowe).

Stan na: 2026-11-25 (commit `3b2cc80`, branch `master`).

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
- Stylowanie: **styled-components 6** + **Bootstrap 5 / react-bootstrap** jednocześnie.
- i18n: `i18next` + `react-i18next`, tłumaczenia w `src/translations/pl.tsx` i `en.tsx`.
- Service worker (`src/service-worker.ts`).

### Przestarzałe zależności (najważniejsze)

| Pakiet                    | Obecnie         | Najnowsza       |
| :------------------------ | :-------------- | :-------------- |
| react / react-dom         | 18.2.0          | 19.3.1          |
| @types/react / react-dom  | 18.2.x          | 19.3.x          |
| react-router-dom          | 6.16.0          | 7.18.7          |
| typescript                | 5.2.2           | 7.0.2           |
| eslint                    | 8.49.0          | 10.15.0         |
| @typescript-eslint/\*     | 6.6.0           | 8.74.0          |
| eslint-plugin-react-hooks | 4.6.0           | 7.1.1           |
| esbuild                   | 0.19.2          | 0.28.2          |
| i18next / react-i18next   | 23.5.1 / 13.2.2 | 27.2.9 / 18.0.3 |
| @hookform/resolvers       | 5.9.1           | 7.0.9           |
| @iconify/react            | 4.1.1           | 6.0.4           |
| @types/node               | 20.6.1          | 26.6.10         |
| styled-components         | 6.0.7           | 6.7.0           |
| zod                       | 4.1.12          | 4.6.7           |

Pełna lista: `npm outdated`.

### Zidentyfikowane problemy

- **Konfiguracja TS przestarzała:** `target: ES2019`, `moduleResolution: Node`, `jsx: "react"` (stary transform —
  `import React` w każdym pliku), brak aliasów ścieżek, dziwne `typeRoots: ["./src/types.ts"]`.
- **ESLint w starym formacie** (`.eslintrc.js` + `.eslintignore`) zamiast flat config.
- **Duplikacja domen:** wystawcy i warsztaty mają równoległe stosy (formularz, schema, storage, API, panel admina).
- **Bardzo duże pliki:** `pl.tsx`/`en.tsx` (1381 linii), `VendorsApplicationsPage.styled.tsx` (960),
  `Carouselge.tsx` (561), `Editor.tsx` (524), `Menu.tsx` (342), `TextCarousel.tsx` (330), `useVendorForm.ts` (367).
- **Dwa systemy stylowania** (Bootstrap + styled-components) oraz łatka `shouldForwardProp` w `src/index.tsx`
  (pozostałość migracji styled-components v5 → v6).
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

### Krok 0. Inwentaryzacja i zrozumienie kodu — ⬜

- Przejście przez architekturę: mapa modułów, przepływ danych, strefy routingu.
- `npm run check:unused` (knip) — nieużywany kod, eksporty i zależności.
- Porządki w roocie (`konwerter.py`, `mapa3.html`, `todo.txt`, `stands_algorithm.md`, `.codex`) — decyzja: usunąć /
  przenieść do `docs/`.
- Uzupełnienie `README.md` (uruchomienie, skrypty, struktura).

### Krok 1. Tooling: TypeScript i ESLint — ⬜

- TypeScript do najnowszej wersji, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, nowszy `target`/`lib`,
  poprawienie `typeRoots`, ewentualnie aliasy ścieżek.
- Usunięcie zbędnych `import React`.
- ESLint → flat config (`eslint.config.js`), typescript-eslint 8, aktualne pluginy (react, react-hooks, jsx-a11y,
  import), eslint-config-prettier.

### Krok 2. Bundler — ⬜

- Decyzja: zostać na esbuild (podbicie do 0.28 + pluginy) czy przejść na **Vite**.
- Vite ułatwia późniejsze Module Federation, Vitest i HMR.
- Zachować działanie service workera i workflowów CI (metadane paczki, porównanie rozmiaru).

### Krok 3. Aktualizacje głównych bibliotek — ⬜

Kolejno, każda osobno:

1. React 19 + `@types/react` 19.
2. react-router 7 (`react-router` zamiast `react-router-dom`), ocena `react-router-hash-link`.
3. i18next + react-i18next.
4. Pozostałe: styled-components, zod, react-hook-form, @hookform/resolvers, @iconify/react, FontAwesome, bootstrap.

### Krok 4. Nowoczesne praktyki Reactowe — ⬜

- Code splitting tras: `React.lazy` + `Suspense` (osobna paczka dla `/admin/*`).
- Error boundaries.
- React Compiler (zamiast ręcznego `useMemo`/`useCallback`).
- Actions / `useActionState` / `useOptimistic` w formularzach i panelu admina.
- TanStack Query jako warstwa pobierania danych i cache nad `apiClient.ts`.

### Krok 5. Refaktor domeny i komponentów — ⬜

- Wspólna abstrakcja „zgłoszenia” (status flow, storage, API, panel) dla wystawców i warsztatów.
- Rozbicie największych plików (`Editor.tsx`, `Carouselge.tsx`, `Menu.tsx`,
  `VendorsApplicationsPage.styled.tsx`, `useVendorForm.ts`).
- Podział tłumaczeń na namespace'y.
- Decyzja: Bootstrap vs styled-components (docelowo jeden system), usunięcie łatki `shouldForwardProp`
  (transient props `$prop`).

### Krok 6. Testy komponentów — ⬜

- Vitest + Testing Library obok istniejących testów utilsów (lub migracja całości na Vitest).
- Testy kluczowych przepływów: formularz wystawcy, formularz warsztatów, logowanie admina.

### Krok 7. Monorepo i mikrofrontend — ⬜

- Workspaces: `apps/public`, `apps/admin`, `packages/ui`, `packages/domain`, `packages/translations`.
- Ćwiczenie: admin jako mikrofrontend (Module Federation) lub osobny deploy pod `/admin`.

---

## 4. Otwarte pytania

- Gdzie jest projekt _learning notes_ / jakie tematy z niego przećwiczyć (do dopasowania kroków 4–7).
- Tryb pracy: wspólne omawianie kodu przed każdym krokiem czy realizacja kroku i omówienie zmian po fakcie.
- Esbuild czy Vite (krok 2).
- Bootstrap czy styled-components jako docelowy system stylowania (krok 5).
