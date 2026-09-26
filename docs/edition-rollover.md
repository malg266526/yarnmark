# Zmiana edycji targów

Strona działa w jednym z dwóch trybów, ustawianych w `src/fairEditionConfig.ts` (`FairEdition.mode`):

| Tryb      | Kiedy                                                              | Checklista                                                   |
| --------- | ------------------------------------------------------------------ | ------------------------------------------------------------ |
| `dormant` | Po targach. Yarnmark „śpi” i przygotowuje kolejną edycję           | [edition-rollover-dormant.md](./edition-rollover-dormant.md) |
| `active`  | Spływają dane nowej edycji: wystawcy, warsztaty, bilety, partnerzy | [edition-rollover-active.md](./edition-rollover-active.md)   |

Roczny cykl: targi → `dormant` → (nowe dane) → `active` → targi → `dormant` → …

## Co zmienia sam tryb

Przełączenie `FairEdition.mode` automatycznie zmienia tylko tytuły archiwalne:

| Tytuł                       | `dormant`                  | `active`              |
| --------------------------- | -------------------------- | --------------------- |
| Wystawcy (band, nawigacja)  | „Wystawcy 2026”            | „Wystawcy”            |
| Warsztaty (desktop, mobile) | „Warsztaty 2026”           | „Warsztaty”           |
| Patroni medialni            | „PATRONI MEDIALNI 2026”    | „PATRONI MEDIALNI”    |
| Partnerzy włóczkowi         | „PARTNERZY WŁÓCZKOWI 2026” | „PARTNERZY WŁÓCZKOWI” |

Rok pochodzi z `FairEdition.pastEditionYear`. Mechanizm: w trybie `dormant` wywołania dostają `EDITION_TITLE_OPTIONS` = `{ context: 'archive', year }`, więc i18next wybiera klucz z sufiksem `_archive` (np. `vendors_archive: 'Wystawcy {{year}}'`). W trybie `active` używany jest klucz podstawowy (`vendors: 'Wystawcy'`). Nowy tytuł archiwalny = para kluczy w `pl.tsx` i `en.tsx` + wywołanie `t('klucz', EDITION_TITLE_OPTIONS)`.

Bandy i sprzedaż **nie** przełączają się same z trybem. W trybie `active` dane spływają stopniowo, więc każdą rzecz włącza się osobno w `src/toggles.ts`, kiedy jej treść jest gotowa.

## Przełączniki (`src/toggles.ts`)

| Przełącznik                             | Co steruje                                                                        | `dormant` | `active`                        |
| --------------------------------------- | --------------------------------------------------------------------------------- | --------- | ------------------------------- |
| `TicketsToggles.enabled`                | „Kup bilet” (desktop, nawigacja, mobile), cena na bilecie, opis w bandzie biletów | `false`   | `true` od startu sprzedaży      |
| `BandsToggles.vendorsEnabled`           | Band wystawców, przycisk w nawigacji, link w menu                                 | `true`    | `true` po ogłoszeniu listy      |
| `BandsToggles.workshopsEnabled`         | Band warsztatów (desktop i mobile), link w menu                                   | `true`    | `true` po ogłoszeniu warsztatów |
| `BandsToggles.workshopsScheduleEnabled` | Harmonogram i mapa sal warsztatowych                                              | `false`   | `true` gdy harmonogram gotowy   |
| `BandsToggles.goldenPretzelEnabled`     | Plebiscyt Złotego Obwarzanka                                                      | `false`   | wg potrzeb                      |
| `BandsToggles.afterEnabled`             | Band After i link w menu                                                          | `false`   | wg potrzeb                      |
| `BandsToggles.foodEnabled`              | Band „Gdzie zjeść”, link w menu, przycisk w nawigacji                             | `false`   | wg potrzeb                      |

## Skrypt `npm run edition:check`

Wypisuje wszystkie daty i lata wpisane w kodzie na sztywno (`plik:linia`), z pominięciem komentarzy, testów, mocków i pozycji z allowlisty (`src/edition/editionCheckAllowlist.ts`). Uruchom go przed i po przejściu checklisty – na końcu powinny zostać tylko treści, które celowo dotyczą konkretnej edycji.

## Zasady

- Teksty z rokiem, które da się zapisać jako `{{year}}`, przenosimy na interpolację z `FairEdition`. Każda taka zmiana skraca obie checklisty.
- Terminów w regulaminach nie automatyzujemy – co roku są ustalane od nowa i są wiążące prawnie.
- Każdą zmianę tekstu robimy w **obu** plikach: `src/translations/pl.tsx` i `src/translations/en.tsx`.
