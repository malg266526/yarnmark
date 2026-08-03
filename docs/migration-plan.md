# Plan Migracji Ścieżek — Kroki Wdrożenia

Ten dokument przekłada cele z `structure-migration.md` na konkretne, uszeregowane kroki wdrożenia w tym repozytorium.

**Ważne zastrzeżenie:** `structure-migration.md` opisuje konwencję Next.js App Router (`app/`, `layout.tsx`, `page.tsx`, route groups, middleware). Ten projekt **nie używa Next.js** — to SPA budowane esbuildem, routing oparty o `react-router-dom` v6 (`src/App.tsx`, `<Routes>/<Route>`), bez żadnego backendu/API (dane trzymane w `localStorage` i mockach, patrz `vendorFormStorage.ts`, `vendorsApplicationsStorage.ts`). Poniższy plan realizuje te same cele biznesowe, ale w strukturze zgodnej z react-router, nie z app routerem Next.js.

Dodatkowo `docs/pages.md` jest już nieaktualny względem kodu: `src/App.tsx` ma dziś `/admin/editor`, `/admin/vendor-form`, `/admin/applications` (z `AdminLayout`), czego `pages.md` w ogóle nie pokazuje.

Czasy są szacunkowe (roboczogodziny), zakładają jednego dewelopera i brak nieprzewidzianych blokerów.

---

## 1. Synchronizacja `docs/pages.md` ze stanem faktycznym — ✅ Zrobione

Zaktualizować tabelę ścieżek tak, by odzwierciedlała istniejące już `/admin/*`, zamiast nieaktualnych `/editor`, `/vendors-form`, `/vendors-applications`.

- **Czas na analizę biznesową:** 0.5h (potwierdzić z zespołem, że obecny stan `/admin/*` to docelowy kierunek, a nie stan przejściowy)
- **Czas na refaktor:** 0.5h

## 2. Ujednolicenie nazw pod `/admin` (`applications` → `vendors/applications`) — ✅ Zrobione

Zmiana `/admin/applications` na `/admin/vendors/applications`, żeby zrobić miejsce na przyszłe `/admin/workshops/applications`. Aktualizacja `App.tsx`, linków w `AdminLayout.tsx` (`ADMIN_LINKS`), ewentualnych testów/importów.

- **Czas na analizę biznesową:** 0.5h (potwierdzić docelowe nazewnictwo — narzędzie wewnętrzne, brak ryzyka SEO/zakładek zewnętrznych)
- **Czas na refaktor:** 1h

## 3. Przeniesienie `/info-for-vendors-statue` → `/vendor/statute` — ✅ Zrobione

Nowa publiczna ścieżka partnerska + przekierowanie ze starej ścieżki (analogicznie do istniejących `<Route ... element={<Navigate .../>} />` dla `/editor` i `/vendor-form`).

- **Czas na analizę biznesową:** 1h (sprawdzić, czy stara ścieżka jest gdziekolwiek linkowana z zewnątrz — social media, dokumenty PDF dla wystawców — i czy wymaga trwałego przekierowania)
- **Czas na refaktor:** 1–1.5h

## 4. Wydzielenie strefy „Partner” (`/vendor/*`)

Utworzenie wspólnego layoutu dla strefy partnera (analogicznie do `AdminLayout`), pogrupowanie `VendorStatutePage` i `VendorFormPage` pod wspólnym prefiksem tras w `App.tsx`. Struktura folderów: nowy `src/pages/partner/` obok istniejącego `src/pages/admin/`.

- **Czas na analizę biznesową:** 1h (ustalić, czy przy tylko 2 podstronach partner potrzebuje w ogóle własnej nawigacji/layoutu, czy to nadmiarowe teraz)
- **Czas na refaktor:** 2–3h

## 5. Mechanizm autoryzacji / RBAC dla `/admin/*`

Dziś `AdminLayout` nie ma żadnego guarda — każdy z linkiem wchodzi bez logowania. To największy i najbardziej niepewny punkt planu, bo w projekcie nie istnieje żaden backend/usługa auth.

- **Czas na analizę biznesową:** 4–8h (kto ma mieć rolę admina, jaki mechanizm logowania — hasło w zmiennej środowiskowej, Firebase Auth, własny backend; wymagania co do sesji/wygasania; czy to w ogóle mieści się w budżecie na SPA bez backendu)
- **Czas na refaktor:** silnie zależny od wybranego rozwiązania — wstępnie 2–5 dni roboczych (16–40h) na guard tras + ekran logowania + integrację z wybranym dostawcą. **Wymaga osobnego doprecyzowania zakresu przed wyceną finalną.**

## 6. Nowa strona `/workshops/apply`

Formularz zgłoszeniowy dla prowadzących warsztaty, wzorowany na istniejącym `vendor-form` (hooki, schema Zod, storage), ale dla nowej domeny danych.

- **Czas na analizę biznesową:** 3–4h (jakie pola różnią się od formularza wystawcy, jaki workflow weryfikacji zgłoszeń warsztatowych)
- **Czas na refaktor:** 8–12h (reużycie wzorców z `src/pages/vendor-form/`: `*Schema.ts`, `*Storage.ts`, hooki, komponenty widoku)

## 7. Nowa strona `/admin/workshops/applications`

Panel zarządzania zgłoszeniami warsztatowymi, analogiczny do istniejącego panelu wystawców (`VendorsApplicationsPage` i towarzyszące pliki).

- **Czas na analizę biznesową:** 2h (czy status flow ma być identyczny jak dla wystawców: `new/considered/accepted/reserve/rejected`, czy inny)
- **Czas na refaktor:** 8h

## 8. `/portal/dashboard` — panel partnera

Panel statusu zgłoszenia i zarządzania własnymi danymi. Zależny od punktu 5 (auth) — bez identyfikacji użytkownika nie da się powiązać zgłoszenia z kontem.

- **Czas na analizę biznesową:** 4h (co partner ma widzieć: status zgłoszenia, edycję danych, powiadomienia)
- **Czas na refaktor:** 16–24h (dodatkowo trzeba zaprojektować powiązanie zgłoszenia z kontem — obecnie dane w `localStorage`/mockach nie mają żadnego identyfikatora użytkownika)

## 9. Aktualizacja nawigacji i stopki

Weryfikacja `Menu.tsx`/`Header.tsx` po zmianach ścieżek — upewnić się, że linki adminowe i partnerskie nadal nie pojawiają się w publicznym menu/stopce.

- **Czas na analizę biznesową:** 0.5h
- **Czas na refaktor:** 1h

## 10. Weryfikacja końcowa

`npm test`, `npm run lint`, `npm run typecheck`, ręczne sprawdzenie każdej nowej/zmienionej ścieżki w przeglądarce (w tym przekierowań ze starych URL-i).

- **Czas na analizę biznesową:** 0h
- **Czas na refaktor:** 2h

---

## Podsumowanie czasów

| Punkt                                   | Analiza biznesowa | Refaktor/implementacja |
| --------------------------------------- | ----------------- | ---------------------- |
| 1. Sync `pages.md`                      | 0.5h              | 0.5h                   |
| 2. Rename `/admin/vendors/applications` | 0.5h              | 1h                     |
| 3. `/vendor/statute`                    | 1h                | 1–1.5h                 |
| 4. Strefa Partner                       | 1h                | 2–3h                   |
| 5. RBAC / auth                          | 4–8h              | 16–40h                 |
| 6. `/workshops/apply`                   | 3–4h              | 8–12h                  |
| 7. `/admin/workshops/applications`      | 2h                | 8h                     |
| 8. `/portal/dashboard`                  | 4h                | 16–24h                 |
| 9. Nawigacja/stopka                     | 0.5h              | 1h                     |
| 10. Weryfikacja końcowa                 | 0h                | 2h                     |
| **Razem**                               | **~16.5–21h**     | **~55.5–93h**          |

Punkty 5 i 8 są największym źródłem niepewności (brak istniejącego backendu/auth) — zalecane osobne doprecyzowanie zakresu przed przystąpieniem do wyceny sprintu.
