# Migracja z esbuild na Vite — plan kroków

Rozwinięcie kroku 2 (Bundler) z `docs/updates/update-context.md`. Każdy krok to osobna zmiana. Po każdym:
`npm run format`, `npm run typecheck`, `npm run lint`, `npm test` bez błędów, a od kroku 4 także przeklikanie strony.
Wersje przypięte bez `^`/`~`.

## Stan wyjściowy

- **Konfiguracja:** `esbuild.config.mjs` (wspólna), `esbuild.serve.mjs` (`npm run start`, `esbuild-server` na porcie
  8090 z live reload i `historyApiFallback`), `esbuild.bundle.mjs` (`npm run bundle`, minifikacja, bez sourcemap;
  opcja `--metafile`, której nic nie używa).
- **Wejścia:** `src/index.tsx`, `src/service-worker.ts`, `src/service-worker-loader.ts`, wszystkie wychodzą bez hasha
  (`entryNames: '[name]'`) w roocie `dist/`; `target: 'es2019'`.
- **Pluginy:**
  - `esbuild-plugin-copy` kopiuje `public/*` do `dist/` (`_headers`, `_redirects`, `robots.txt`, `sitemap.xml`,
    `manifest.json`, ikony, `favicon.ico`, ale też `index.html`);
  - `@craftamap/esbuild-plugin-html` buduje `dist/index.html` z szablonu `public/index.html` i wstawia
    `<script src="/index.js">`;
  - `esbuild-plugin-manifest` generuje `dist/output-info.json` (`files` i `assets`), który czyta service worker.
- **Obrazki i fonty:** loader `file` → `dist/assets/[name]-[hash].[ext]`, import zwraca URL (typy w `src/types.d.ts`).
  W kodzie: 52 × svg, 39 × webp, 33 × avif, 22 × jpg, 8 × jfif, 6 × png, 2 × jpeg. Nic nie jest wstawiane inline.
- **Bundle:** jeden plik `dist/index.js` (~1,46 MB, ~394 KB po gzip; szczegóły w V0).
- **Service worker nie jest obecnie rejestrowany:** `<script src="./service-worker-loader.js?…">` w
  `public/index.html` jest zakomentowany, a `htmlPlugin` celowo pomija oba wejścia service workera. Pliki
  `service-worker.js` i `service-worker-loader.js` są budowane, ale strona ich nie ładuje.
- **Brak `process.env` i `import.meta`** w `src/` — nie ma zmiennych środowiskowych do przeniesienia.
- **Testy:** `node --test` na plikach `*.test.ts` z importami względnymi — nie zależą od bundlera.
- **CI:**
  - `pull-request.yml` i `deploy.yml` wołają `yarn bundle` i używają `dist/`;
  - `bundle-metadata.yml` → `yarn stats --dir=dist --extensions=".js,.html,.css"`: `getDirMetadata.ts` czyta
    **tylko pliki z roota `dist/`** (bez podkatalogów), a `compareMetadata.ts` porównuje master i branch **po nazwie
    pliku**;
  - `transpile-workflow-files` używa CLI esbuilda do transpilacji `workflow-helpers/*.ts`.
- **Docelowe wersje** (stan na 2026-11-26): `vite` 8.4.0, `@vitejs/plugin-react` 6.3.0 (obie wymagają Node
  `^20.19.0 || >=22.12.0`; CI jest na 24). Vite 8 ma w peer dependencies `@types/node` `^20.19.0 || >=22.12.0` —
  projekt ma 20.6.1.

## Kroki

### Krok V0. Punkt odniesienia — ✅ zrobione

- Zbudować obecną wersję (`yarn bundle`) i zapisać: listę plików w `dist/` (z podkatalogami), rozmiar `index.js`
  surowy i po gzip, zawartość `dist/index.html`.
- Zrobić zrzuty ekranu kluczowych tras (`/home`, `/info-for-vendors`, `/hall`, `/vendor/apply`, `/workshops/apply`,
  `/admin`) — do porównania po migracji.
- Bez zmian w kodzie.

Wynik (2026-11-26, commit `67dad78`, build w czystej kopii repozytorium — lokalny `dist/` zawiera stare pliki z
dev servera, np. `index.js.map`). Pliki w `docs/updates/vite-baseline/`:

- **Czas builda:** ~1,6 s (`node ./esbuild.bundle.mjs`).
- **`dist/`:** 161 plików, ~90,3 MB, z czego `assets/` 148 plików, ~88,5 MB (32 avif, 7 jfif, 2 jpeg, 22 jpg, 6 png,
  41 svg, 38 webp). Pełna lista: `dist-files.txt`.
- **Root `dist/`** (13 plików): `index.html` 3 004 B, `index.js` 1 455 412 B (~1,46 MB; gzip -9: 393 808 B, gzip
  -6: 395 313 B), `service-worker.js` 2 394 B, `service-worker-loader.js` 147 B, `output-info.json` 5 898 B (`files`:
  tylko `./index.js`; `assets`: 148 ścieżek), z `public/`: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`,
  `manifest.json`, `favicon.ico`, `icon512_maskable.png`, `icon512_rounded.png`. Brak plików CSS.
- **Metadane jak w CI** (`yarn stats --extensions=".js,.html,.css"`): `ci-metadata.json` — `index.html`, `index.js`,
  `service-worker.js`, `service-worker-loader.js`.
- **`index.html` po buildzie:** `index.html` (sformatowany Prettierem; jedyny wstawiony skrypt to
  `<script src="/index.js">`, loader service workera w komentarzu).
- **Trasy:** 8 tras × 2 widoki (desktop 1440 × 900, mobile 390 × 844), zrzuty całych stron w `screenshots/`, raport
  w `routes-report.json` (końcowy URL, wysokość strony, zepsute obrazki, błędy konsoli). Wszystkie trasy się
  renderują, przekierowań brak, zepsutych obrazków 0. Błędy konsoli to znany szum środowiska testowego: CORS do
  `yarnmark-api.com` z `localhost` (`/home`, `/hall`, `/vendor/apply`) i logowanie Google na `/admin`. Treść pasma
  zespołu na `/home` jest losowa — różnice w tym pasmie nie są regresją.
- **Powtórzenie po migracji:** `screenshots.mjs <adres> <katalog>` (wymaga Playwrighta, ścieżka w zmiennej `PW`) na
  buildzie Vite (`vite preview`), potem porównanie zrzutów i raportu.

### Krok V1. `@types/node` zgodne z Vite — ✅ zrobione

- `@types/node` 20.6.1 → wersja z linii 24 (zgodna z Node w CI i z peer dependency Vite).
- Osobno, przed Vite, żeby ewentualne nowe błędy typów nie mieszały się z migracją.
- Sprawdzenie: `yarn typecheck` (API Node używają pliki `workflow-helpers/*.ts`; `esbuild.*.mjs` nie są objęte
  typecheckiem).

Wynik: `@types/node` 20.6.1 → 24.19.4 (najnowsza z linii 24; doszła zależność `undici-types` 7.24.6). Bez zmian w
kodzie. Typecheck, lint, `format:check`, testy (378/378), `yarn bundle` i `yarn transpile-workflow-files` bez błędów.

### Krok V2. Instalacja Vite obok esbuilda — ✅ zrobione

- Dodać `vite` 8.4.0 i `@vitejs/plugin-react` 6.3.0 (devDependencies).
- Nowy `vite.config.mts` z ustawieniami odpowiadającymi obecnym:
  - `plugins: [react()]`;
  - `resolve.alias`: `@` → `src` (zamiast `paths` z `tsconfig.json`, które czyta esbuild);
  - `server.port: 8090`, `server.strictPort: true`, `server.open: true`;
  - `build.outDir: 'dist'`, `build.target: 'es2019'`, `build.sourcemap: false`;
  - `build.assetsInlineLimit: 0` — Vite domyślnie wstawia pliki < 4 KB jako `data:` URL; dziś każdy obrazek jest
    osobnym plikiem.
- Stare skrypty `start` i `bundle` zostają, Vite uruchamiany na próbę: `npx vite`, `npx vite build`.

Wynik: `vite` 8.4.0 i `@vitejs/plugin-react` 6.3.0 w devDependencies (bez nowych ostrzeżeń o peer dependencies;
`esbuild` jest dla Vite 8 opcjonalny, więc 0.19.2 nie koliduje). Konfiguracja w `vite.config.mts`, nie `.ts` — bez
`"type": "module"` w `package.json` Vite wczytywał `.ts` jako CommonJS i ostrzegał, że ten tryb przestanie być
obsługiwany; `.mts` jest zawsze modułem ES. Plik jest objęty typecheckiem (`tsconfig.json` nie ma `include`).
Sprawdzone na próbnym serwerze (`npx vite --port 8092`, bo 8090 zajmuje dev server esbuilda): `src/index.tsx`
i zależności się transformują, alias `@/` rozwiązuje się do `/src/…`, importy obrazków (svg, jfif, avif, webp)
zwracają URL jak dotąd. `/` zwraca 404 i `npx vite build` nie ma jeszcze punktu wejścia — oba wymagają `index.html`
w roocie (krok V3). Typecheck, lint, `format:check`, testy (378/378) i `yarn bundle` bez błędów.

### Krok V3. `index.html` w roocie projektu

- Vite traktuje `index.html` jako punkt wejścia i oczekuje go w roocie projektu, a cały `public/` kopiuje 1:1 do
  `dist/`. Dlatego `public/index.html` → `index.html` (przeniesienie, nie kopia — inaczej Vite skopiuje też stary
  szablon).
- Dodać `<script type="module" src="/src/index.tsx"></script>` (dziś wstawia go `htmlPlugin`).
- Zakomentowany loader service workera używa składni szablonu esbuilda (`<%- define.hash %>`) — Vite jej nie zna.
  Decyzja: usunąć tę linię albo zostawić komentarz bez `define.hash` (krok V6 decyduje o service workerze).
- `esbuild-plugin-copy` przestaje być potrzebny — `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`,
  `manifest.json`, ikony i `favicon.ico` kopiuje Vite z `public/`.
- Uwaga: po przeniesieniu stary `npm run bundle` przestanie działać (szablon `htmlPlugin` wskazuje
  `public/index.html`) — V3 i V4 robić razem albo w V3 zaktualizować ścieżkę w `esbuild.config.mjs`.

### Krok V4. Skrypty `start` i `bundle` na Vite

- `start` → `vite`, `bundle` → `vite build`; dodać `preview` → `vite preview --port 8090` (podgląd builda).
- SPA fallback (`historyApiFallback`) Vite ma domyślnie w dev i w `preview`.
- Typy: dodać `vite/client` (np. `"types": ["vite/client"]` w `tsconfig.json`); deklaracje obrazków w
  `src/types.d.ts` (`*.jpg`, `*.png`, `*.svg`, `*.webp`, `*.avif`, `*.jfif`, `*.jpeg`) dublują typy Vite — do
  decyzji, czy je usunąć.
- **Uwaga dla AGENTS.md:** sekcja „Local Development” opisuje `esbuild.serve.mjs` (`pkill -f esbuild.serve.mjs`) —
  wymaga aktualizacji.
- Sprawdzenie:
  - dev: wszystkie trasy, obrazki (wszystkie formaty), fonty Google, przełączanie języka, formularze, HMR po edycji
    komponentu;
  - build: porównanie z punktem odniesienia z V0 — pliki z `public/` są w `dist/`, `dist/index.html` ma te same
    meta tagi, skrypt gtag, JSON-LD i linki do fontów; trasy działają w `vite preview`; rozmiar bundla.

### Krok V5. Nazwy plików i metadane w CI

- Vite domyślnie zapisuje JS i CSS jako `dist/assets/index-[hash].js`. Psuje to dwa workflowy:
  - `getDirMetadata.ts` czyta tylko root `dist/`, więc w metadanych zostałby sam `index.html`;
  - `compareMetadata.ts` porównuje po nazwie, więc hash w nazwie zrobi z każdego pliku „usunięty” + „nowy”.
- Do wyboru:
  - **Bez hashy, jak dziś:** `build.rollupOptions.output.entryFileNames: '[name].js'` (i analogicznie
    `chunkFileNames`) w roocie `dist/` — workflowy bez zmian. Minus: przeglądarka może trzymać stary `index.js`
    z cache.
  - **Hashe (domyślne Vite):** `getDirMetadata.ts` rekurencyjnie + usuwanie hasha z nazwy przed porównaniem. Lepsze
    cache'owanie, zwłaszcza po code splittingu w kroku 4 planu.
- Sprawdzenie: lokalnie `yarn bundle`, `yarn transpile-workflow-files`, `yarn stats` i `yarn compare-stats` na dwóch
  buildach — tabela musi pokazywać te same pliki po obu stronach.

### Krok V6. Service worker

- Dziś nie jest rejestrowany (patrz stan wyjściowy), ale jest budowany i oczekuje `./output-info.json` z listą
  plików. Vite nie zbuduje go sam: potrzebne osobne wejście z nazwą bez hasha (`/service-worker.js` w roocie).
- Do wyboru:
  - **Parzystość:** dodatkowe wejścia w `build.rollupOptions.input` z `entryFileNames` bez hasha dla service
    workera + mały plugin Vite generujący `output-info.json` w tym samym kształcie (`files`, `assets`), np. z
    `build.manifest`.
  - **`vite-plugin-pwa` (2.0.0, tryb `injectManifest`):** lista plików do precache wstrzykiwana do service workera
    przy buildzie, bez `output-info.json`. Większa zmiana — wymaga przepisania `fetchOutputInfoData`.
  - **Usunięcie:** skoro nie jest rejestrowany — usunąć `service-worker.ts`, `service-worker-loader.ts`
    i `output-info.json` (decyzja produktowa, nie techniczna).
- Filtr `!event.request.url.includes('esbuild-livereload')` w `service-worker.ts` dotyczy tylko esbuild-servera —
  do usunięcia albo zamiany na ścieżki Vite (`/@vite/`, `/@react-refresh`).

### Krok V7. Sprzątanie

- Usunąć `esbuild.config.mjs`, `esbuild.serve.mjs`, `esbuild.bundle.mjs`.
- Usunąć zależności: `esbuild-server`, `@craftamap/esbuild-plugin-html`, `esbuild-plugin-copy`,
  `esbuild-plugin-manifest` (jeśli V6 go nie potrzebuje).
- `esbuild` nadal używa `transpile-workflow-files`. Do wyboru: podbić `esbuild` do 0.28.2 (zgodne z peer dependency
  Vite) albo przejść w `workflow-helpers` na `node --experimental-transform-types`, jak już robi `edition:check`, i
  usunąć `esbuild` z zależności.
- `argv` zostaje (używają go `workflow-helpers`).
- Zaktualizować `AGENTS.md` (dev server, harness „with the project's esbuild”), `README.md`, `eslint.config.mjs`
  (`globals.node` dla `vite.config.mts`, jeśli lint ma go obejmować) i `docs/updates/update-context.md`.
- Sprawdzenie: `npm run check:unused` (knip) — brak osieroconych plików i zależności po esbuildzie.

## Poza zakresem migracji (kolejne kroki planu)

- Code splitting tras (`React.lazy`, krok 4 planu) — w Vite działa bez dodatkowej konfiguracji (moduły ES i chunki);
  od tej decyzji zależy wybór w V5.
- Vitest zamiast `node --test` (krok 6 planu) — po Vite naturalny, ale osobny krok.
- React Compiler (krok 4 planu) — w Vite przez `babel-plugin-react-compiler` w `@vitejs/plugin-react`.

## Otwarte decyzje

- V3: usunąć zakomentowany loader service workera z `index.html` czy go zostawić.
- V4: usunąć deklaracje obrazków z `src/types.d.ts` czy zostawić.
- V5: nazwy plików bez hashy (bez zmian w CI) czy hashe (zmiany w `getDirMetadata.ts` i `compareMetadata.ts`).
- V6: service worker — parzystość, `vite-plugin-pwa` czy usunięcie.
- V7: `esbuild` 0.28.2 dla `workflow-helpers` czy `node --experimental-transform-types`.
