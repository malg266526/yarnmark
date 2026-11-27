# Modernizacja projektu — kontekst i plan kroków

Cel: przejść przez projekt od początku, zrozumieć kod, uporządkować go po długim okresie „vibe codingu”, zaktualizować
biblioteki, wprowadzić nowoczesne praktyki (React, architektura) i przećwiczyć tematy z projektu _learning notes_
(równoległy projekt, występuje też pod nazwą „rekrutacja”; m.in. mikrofrontendy i usprawnienia Reactowe).

Stan na: 2026-11-25 (commit `3b2cc80`, branch `master`). Ostatnia aktualizacja postępu: 2026-11-25 (commit `5c5f1b3`).

---

## 1. Stan wyjściowy

### Co działa dobrze

- `npm run typecheck`, `npm run lint`, `npm test` przechodzą bez błędów (390 testów, 68 plików `*.test.ts`,
  runner `node --test --experimental-transform-types`).
- Nowsze obszary (formularze wystawców i warsztatów, panel admina) mają sensowny podział: `src/domain/`, hooki,
  `*Utils.ts`, `*.styled.tsx`, Zod + React Hook Form.
- Istnieje backend API (`https://yarnmark-api.com`, klient w `src/domain/apiClient.ts`), CI w `.github/workflows`
  (deploy, metadane paczki, porównanie rozmiaru w PR), husky.
- Reguły pracy opisane w `AGENTS.md`.

### Stos technologiczny

- SPA budowane **Vite** (`vite.config.mts`, `index.html` w roocie), dev server na porcie 8090.
- Routing: `react-router` 8 (`src/App.tsx`, `<Routes>/<Route>`), strefy: publiczna, partner (`/vendor/*`,
  `/workshops/apply`), admin (`/admin/*` z `AdminLayout`).
- Stylowanie: **styled-components 6** (Bootstrap i react-bootstrap usunięte, globalny reset w `src/styles/reboot.ts`).
- i18n: `i18next` + `react-i18next`, tłumaczenia w `src/translations/pl.tsx` i `en.tsx`.
- Service worker (`src/service-worker.ts`).

### Przestarzałe zależności (najważniejsze)

| Pakiet     | Obecnie | Najnowsza |
| :--------- | :------ | :-------- |
| typescript | 5.9.3   | 7.0.2     |
| eslint     | 9.39.5  | 10.15.0   |

Zostają na obecnych wersjach: `typescript-eslint` (najnowsza 8.74.0) wspiera TypeScript tylko do `<6.1.0`, a
`eslint-plugin-import` i `eslint-plugin-react` — ESLint najwyżej w wersji 9.

Pełna lista: `npm outdated`.

### Zidentyfikowane problemy

- **Duplikacja domen:** wystawcy i warsztaty mają równoległe stosy (formularz, schema, storage, API, panel admina).
- **Bardzo duże pliki:** `pl.tsx`/`en.tsx` (1381 linii), `VendorsApplicationsPage.styled.tsx` (960),
  `Carouselge.tsx` (561), `Editor.tsx` (524), `Menu.tsx` (342), `useVendorForm.ts` (367).
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
  - [ ] Pozostałe nieużywane pliki: `Box`, `generateJson`, `KnittingIconOnHover`, `SocialMediaLink`, `useFirstClick`,
        `useOnClickOutside`; zależności FontAwesome; ok. 40 nieużywanych eksportów i 26 typów.
- Porządki w roocie (`konwerter.py`, `mapa3.html`, `todo.txt`, `stands_algorithm.md`, `.codex`) — decyzja: usunąć /
  przenieść do `docs/`.
- Uzupełnienie `README.md` (uruchomienie, skrypty, struktura).

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
- [ ] 🟡 Migracja na transient props `$prop` i usunięcie łatki `shouldForwardProp` (prywatne styled-components i
      komponenty bandu wzorów już zrobione):
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

- Jakie tematy z projektu _learning notes_ (_rekrutacja_) przećwiczyć (do dopasowania kroków 4–7).
- Tryb pracy: wspólne omawianie kodu przed każdym krokiem czy realizacja kroku i omówienie zmian po fakcie.
