# Zmiana edycji targów – checklista

Procedura przełączenia strony z edycji, która się odbyła, na kolejną. Punkty są ułożone w kolejności, w jakiej zwykle zapadają decyzje w ciągu roku.

## Jak używać

1. Uruchom `npm run edition:check`. Skrypt wypisze wszystkie daty i lata wpisane w kodzie na sztywno (`plik:linia`), z pominięciem komentarzy, testów, mocków i pozycji z allowlisty.
2. Przejdź przez fazy poniżej i odhaczaj punkty.
3. Po zmianach uruchom skrypt ponownie. Na liście powinny zostać tylko treści, które celowo dotyczą minionej edycji (np. plebiscyt).

Źródła prawdy:

- `src/fairEditionConfig.ts` – lata edycji (`upcomingEditionYear`, `pastEditionYear`)
- `src/toggles.ts` – co jest włączone (sprzedaż biletów, bandy)

Teksty, które korzystają z `{{year}}`, aktualizują się same po zmianie configu. Pozostałe trzeba poprawić ręcznie w **obu** plikach: `src/translations/pl.tsx` i `src/translations/en.tsx`.

Allowlista skryptu (treści z datami, które nie dotyczą edycji, np. biografie prowadzących): `src/edition/editionCheckAllowlist.ts`.

---

## Faza 1 – zaraz po targach

| Co                           | Gdzie                                                                     | Jak                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Lata edycji                  | `src/fairEditionConfig.ts`                                                | `pastEditionYear` = edycja, która minęła; `upcomingEditionYear` = kolejna                            |
| Wyłączenie sprzedaży biletów | `src/toggles.ts` → `TicketsToggles.enabled = false`                       | Wyszarza „Kup bilet” (desktop, `NavigationBand`, mobile `CoreInfoBand`) i ukrywa cenę w `TicketCard` |
| Data w hero i na bilecie     | `welcomeBand.when`, `navigationBand.when`, `tickets.eventDateProvisional` | Automatycznie: „Kwiecień {{year}}” z `upcomingEditionYear`. Dokładny dzień dopiero w fazie 2         |
| Band „Wystawcy {{year}}”     | klucz `vendors`                                                           | Automatycznie z `pastEditionYear`                                                                    |
| Numer edycji                 | `welcomeBand.invitation` („III edycję…”)                                  | Ręcznie                                                                                              |
| Ankieta po targach           | `previousEdition.fillTheSurvey`                                           | Ręcznie: rok i link do nowej ankiety                                                                 |
| Pamiątki z minionej edycji   | `src/pages/main-page/bands/LastEditionBand.tsx`                           | Ręcznie: linki do produktów w sklepie (zawierają rok w URL)                                          |
| Plebiscyt Złotego Obwarzanka | `goldenPretzelBand.title`                                                 | Ręcznie albo wyłączyć `BandsToggles.goldenPretzelEnabled`                                            |
| Tekst SEO                    | `src/App.tsx` (`TransparentText`)                                         | Ręcznie: rok                                                                                         |

## Faza 2 – ogłoszenie daty kolejnej edycji

| Co                           | Gdzie                                                                     | Jak                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Dokładna data i godzina      | `welcomeBand.when`, `navigationBand.when`, `tickets.eventDateProvisional` | Ręcznie: zamienić „Kwiecień {{year}}” na pełną datę                                    |
| Regulamin dla odwiedzających | `src/pages/StatutesPage.tsx`                                              | Ręcznie: data targów, ceny i terminy sprzedaży (tekst jest wpisany bezpośrednio w JSX) |

## Faza 3 – nabór wystawców

| Co                         | Gdzie                                                                                                             | Jak                                                                                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Informacje dla wystawców   | `infoForVendorsPage.title`, `infoForVendorsPage.registration.wantToJoin`, `infoForVendorsPage.registration.start` | Ręcznie: rok i data startu naboru                                                                                                                            |
| Regulamin sprzedaży stoisk | `vendorsStatue` (`title`, `subtitle`, definicje i warunki)                                                        | Ręcznie: **terminy są wiążące prawnie**. Data targów, termin zgłoszeń, termin ogłoszenia wyników, termin płatności, termin zgłoszenia współdzielenia stoiska |
| Logotypy wystawców         | `src/pages/main-page/VendorsList.tsx`                                                                             | Po ogłoszeniu listy: podmiana logotypów. Jednocześnie `pastEditionYear` → nowa edycja albo zmiana tytułu banda                                               |

## Faza 4 – start sprzedaży biletów

| Co                       | Gdzie                                                                                                    | Jak                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Cena                     | `src/pages/main-page/bands/ticket/TicketCard.tsx` (`TicketPrice`)                                        | Ręcznie                                                                   |
| Terminy sprzedaży online | `tickets.onlineDeadline`, `tickets.availableSoon`, `tickets.promoPrice`                                  | Ręcznie                                                                   |
| Gadżet                   | `tickets.gadgetGuaranteed`                                                                               | Ręcznie: rok                                                              |
| Rejs                     | `cashmereTicketsBand.map.priceIncludesYarnmarkTicket`, link w `src/pages/main-page/bands/CruiseBand.tsx` | Ręcznie: rok w tekście i w URL biletu, jeśli `BandsToggles.cruiseEnabled` |
| Włączenie sprzedaży      | `src/toggles.ts` → `TicketsToggles.enabled = true`                                                       | Na końcu, kiedy cena i link są gotowe                                     |

---

## Jak zmniejszać tę listę

Za każdym razem, gdy tekst z rokiem da się zapisać jako `{{year}}`, przenieś go na interpolację z `FairEdition` i przesuń do grupy „automatycznie”. Terminów w regulaminach nie automatyzujemy, bo co roku są ustalane od nowa.
