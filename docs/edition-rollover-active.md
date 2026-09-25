# Tryb `active` – Yarnmark się rozkręca

Kiedy: gdy zaczynają spływać dane nowej edycji. Czyścimy archiwum minionej edycji, tytuły tracą rok, a nowe treści włączamy stopniowo, w miarę jak są gotowe.

Przegląd trybów i przełączników: [edition-rollover.md](./edition-rollover.md).

## 1. Przełączenie trybu i czyszczenie archiwum

- [ ] `src/fairEditionConfig.ts` → `mode: 'active'` – tytuły Wystawcy, Warsztaty, Patroni medialni, Partnerzy włóczkowi tracą rok automatycznie
- [ ] Wystawcy: `BandsToggles.vendorsEnabled = false`, potem wyczyść logotypy w `src/pages/main-page/VendorsList.tsx` (i nieużywane pliki w `src/assets/images/minifiedLogos/`)
- [ ] Warsztaty: `BandsToggles.workshopsEnabled = false`, potem wyczyść `WorkshopsConfig` w `src/pages/main-page/workshops/workshopsConfig.tsx` (i opisy warsztatów w tłumaczeniach)
- [ ] Partnerzy: wyczyść `PARTNERS` i `WOOL_PATRONS` w `src/pages/main-page/bands/TeamAndPartnersBand.tsx` albo zostaw do czasu nowych logotypów

## 2. Ogłoszenie daty

- [ ] Dokładna data i godzina: `welcomeBand.when`, `navigationBand.when`, `tickets.eventDateProvisional` – zamień „Kwiecień {{year}}” na pełną datę
- [ ] Regulamin dla odwiedzających: `src/pages/StatutesPage.tsx` – data targów, ceny, terminy sprzedaży (tekst wpisany bezpośrednio w JSX)

## 3. Nabór wystawców

- [ ] Informacje dla wystawców: `infoForVendorsPage.title`, `infoForVendorsPage.registration.wantToJoin`, `infoForVendorsPage.registration.start` – rok i data startu naboru
- [ ] Regulamin sprzedaży stoisk: `vendorsStatue` (`title`, `subtitle`, definicje, warunki). **Terminy są wiążące prawnie**: data targów, termin zgłoszeń, ogłoszenia wyników, płatności, zgłoszenia współdzielenia stoiska
- [ ] Mapa hali ze stoiskami: `src/assets/hall.json` – układ i rezerwacje na nową edycję (`BandsToggles.hallMapEnabled`)
- [ ] Po ogłoszeniu listy: nowe logotypy w `VendorsList.tsx`, potem `BandsToggles.vendorsEnabled = true`

## 4. Warsztaty

- [ ] Nowe warsztaty w `WorkshopsConfig` (+ opisy w tłumaczeniach), potem `BandsToggles.workshopsEnabled = true`
- [ ] Mapa sal: `src/assets/images/workshops/mapka_warsztaty.*`
- [ ] Harmonogram generuje się z `WorkshopsConfig` (`Schedule.tsx`) – gdy godziny i sale są pewne: `BandsToggles.workshopsScheduleEnabled = true`

## 5. Partnerzy

- [ ] Nowe logotypy w `PARTNERS` i `WOOL_PATRONS` (`TeamAndPartnersBand.tsx`)

## 6. Sprzedaż biletów

- [ ] Cena: `TicketPrice` w `src/pages/main-page/bands/ticket/TicketCard.tsx`
- [ ] Terminy sprzedaży: `tickets.onlineDeadline`, `tickets.availableSoon`, `tickets.promoPrice`
- [ ] Gadżet: `tickets.gadgetGuaranteed` – rok
- [ ] Rejs (jeśli `BandsToggles.cruiseEnabled`): `cashmereTicketsBand.map.priceIncludesYarnmarkTicket` i link w `src/pages/main-page/bands/CruiseBand.tsx` – rok w tekście i URL
- [ ] Na końcu, gdy cena i link są gotowe: `TicketsToggles.enabled = true`

## 7. Dodatkowe bandy

- [ ] Plebiscyt: rok w `goldenPretzelBand.title`, potem `BandsToggles.goldenPretzelEnabled = true`
- [ ] After: treści, potem `BandsToggles.afterEnabled = true`
- [ ] Gdzie zjeść: treści, potem `BandsToggles.foodEnabled = true`

## 8. Weryfikacja (po każdym etapie)

- [ ] `npm run edition:check` – na końcu nie powinno zostać nic z minionej edycji
- [ ] `npm run format`, `npm run lint`, `npm run typecheck`, `npm test`
- [ ] Sprawdź stronę główną na desktopie i telefonie
