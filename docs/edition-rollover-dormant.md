# Tryb `dormant` – Yarnmark w uśpieniu

Kiedy: zaraz po targach. Strona pokazuje minioną edycję jako archiwum („Wystawcy 2026”, „Warsztaty 2026”) i zapowiada kolejną bez szczegółów.

Przegląd trybów i przełączników: [edition-rollover.md](./edition-rollover.md).

## 1. Config

- [ ] `src/fairEditionConfig.ts`:
  - `mode: 'dormant'`
  - `pastEditionYear` = edycja, która właśnie się odbyła
  - `upcomingEditionYear` = kolejna edycja

Automatycznie po tym kroku:

- tytuły archiwalne z rokiem minionej edycji: Wystawcy, Warsztaty, Patroni medialni, Partnerzy włóczkowi
- data w hero i na bilecie jako „Kwiecień {{year}}” z `upcomingEditionYear` (`welcomeBand.when`, `navigationBand.when`, `tickets.eventDateProvisional`)

## 2. Przełączniki (`src/toggles.ts`)

- [ ] `TicketsToggles.enabled = false` – wyszarza „Kup bilet”, ukrywa cenę, w bandzie biletów pokazuje `tickets.currentlyUnavailable`
- [ ] `BandsToggles.workshopsScheduleEnabled = false` – chowa harmonogram i mapę sal warsztatowych (karty warsztatów zostają jako archiwum)
- [ ] `BandsToggles.goldenPretzelEnabled = false`
- [ ] `BandsToggles.afterEnabled = false`
- [ ] `BandsToggles.foodEnabled = false`
- [ ] `BandsToggles.vendorsEnabled = true`, `BandsToggles.workshopsEnabled = true` – wystawcy i warsztaty minionej edycji zostają widoczne jako archiwum

## 3. Ręcznie

- [ ] Numer edycji w zaproszeniu: `welcomeBand.invitation` („III edycję…”) → numer kolejnej edycji
- [ ] Ankieta po targach: `previousEdition.fillTheSurvey` – rok i link do nowej ankiety
- [ ] Pamiątki: linki do produktów w `src/pages/main-page/bands/LastEditionBand.tsx` (rok w URL)
- [ ] Tekst SEO: `src/App.tsx` (`TransparentText`) – rok

**Nie** czyścimy w tym trybie wystawców, warsztatów ani partnerów – to archiwum minionej edycji.

## 4. Weryfikacja

- [ ] `npm run edition:check` – przejrzyj listę; zostać powinny tylko treści minionej edycji i terminy, które zmienią się w trybie `active`
- [ ] `npm run format`, `npm run lint`, `npm run typecheck`, `npm test`
- [ ] Sprawdź stronę główną na desktopie i telefonie
