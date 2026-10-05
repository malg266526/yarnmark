# Rekomendacje UX dla formularza wystawców

Dokument opisuje rekomendowane usprawnienia formularza dostępnego pod ścieżką `/vendor/apply`. Kolejność punktów odzwierciedla sugerowany priorytet realizacji.

## Priorytet wysoki

### 1. Powrót na początek formularza po zamknięciu potwierdzenia — ✅ Zrobione

Po kliknięciu „OK” w modalu potwierdzającym wysłanie zgłoszenia strona płynnie przewija się na samą górę, pokazując tytuł strony, odstęp oraz początek wyczyszczonego formularza. Zachowanie zostało zweryfikowane w przeglądarce po pełnym, poprawnym wysłaniu formularza.

### 2. Osobne komunikaty walidacyjne dla każdego pola — ✅ Zrobione

Każde pole ma własny komunikat błędu wyświetlany bezpośrednio pod odpowiadającą mu kontrolką. Rozdzielone zostały między innymi:

- numer telefonu i adres e-mail,
- dane do faktury i logo,
- główna kategoria i ręcznie wpisywana kategoria „inna”.

Wszystkie błędy są widoczne jednocześnie. Pola otrzymują `aria-invalid`, a komunikaty są z nimi powiązane przez `aria-describedby`. Zachowanie i powiązania dostępnościowe zostały zweryfikowane w przeglądarce.

### 3. Blokada wysyłania podczas przetwarzania logo — ✅ Zrobione

Przycisk „Wyślij zgłoszenie” jest nieaktywny podczas przetwarzania przesłanego pliku. Sam mechanizm wysyłania również zatrzymuje próbę zapisu do czasu zakończenia przetwarzania, dzięki czemu nie można przypadkowo uruchomić walidacji ani żądania do API przed przygotowaniem logo. Zachowanie zostało zweryfikowane w przeglądarce.

## Priorytet średni

### 4. Wyraźne oznaczenie pól wymaganych i opcjonalnych — ✅ Zrobione

Wszystkie pola wymagane mają spójne oznaczenie `*`, a pola opcjonalne nie mają dodatkowego oznaczenia. Warunkowe pole kategorii „Inna” otrzymuje gwiazdkę dopiero po jego wyświetleniu. Obecność i liczba oznaczeń zostały zweryfikowane w przeglądarce.

### 5. Usunięcie zegara wyświetlanego przed wysłaniem — ✅ Zrobione

Sekcja z bieżącą datą i godziną została usunięta z formularza przed wysłaniem. Wiarygodny czas zapisania pochodzący z odpowiedzi serwera pozostaje prezentowany dopiero po poprawnym wysłaniu zgłoszenia. Brak zegara przed wysłaniem został zweryfikowany w przeglądarce.

### 6. Widoczny status lokalnego szkicu — ✅ Zrobione

Warto uzupełnić informację o lokalnym zapisie o komunikaty potwierdzające rzeczywisty stan, na przykład:

- „Szkic zapisany”,
- „Przywrócono zapisany szkic”.

Dzięki temu użytkownik wie, czy jego dane zostały zachowane i czy formularz został odtworzony po ponownym otwarciu strony.

Status pojawia się pod informacją o lokalnym zapisie: „Przywrócono zapisany szkic” po otwarciu formularza z zapisanym szkicem, „Szkic zapisany” po pierwszej edycji. Po poprawnym wysłaniu status znika. Logika stanu jest w `vendorFormDraftStatus.ts` (z testami); zachowanie w przeglądarce nie zostało jeszcze zweryfikowane.

## Priorytet niższy

### 7. Podgląd i zarządzanie przesłanym logo — ✅ Zrobione

Po wybraniu logo warto wyświetlić jego podgląd oraz akcje „Zmień” i „Usuń”. Sama nazwa pliku nie daje użytkownikowi wystarczającej pewności, że wybrany został właściwy obraz.

Po wybraniu logo pod polem pliku pojawia się miniatura z przyciskami „Zmień logo” (otwiera wybór pliku) i „Usuń logo” (czyści wybór). Komponent: `VendorFormLogoPreview.tsx`. Zachowanie w przeglądarce nie zostało jeszcze zweryfikowane.

## Formularz warsztatów (`/workshops/apply`)

Usprawnienia 1–7 przeniesiono również do formularza warsztatów, korzystając ze wspólnych elementów z `src/components/form/` (`FormField`, `LogoPreview`, `formFocus.ts`, `formDraftStatusUtils.ts`):

- modal potwierdzenia wysłania z powrotem na górę formularza po jego zamknięciu,
- osobne komunikaty dla każdego pola (także min/max uczestników oraz typ umowy / „Inna”) z przewinięciem i fokusem na pierwsze błędne pole,
- blokada wysyłania podczas przetwarzania logo,
- oznaczenie `*` pól wymaganych,
- usunięty zegar przed wysłaniem,
- status lokalnego szkicu,
- podgląd logo z akcjami „Zmień logo” / „Usuń logo”.

Formularz warsztatów dostał też modal potwierdzenia (wspólny `FormSuccessModal`) zamiast podsumowania pod formularzem: po wysłaniu formularz jest czyszczony, a po zamknięciu modala strona przewija się na górę. Zachowanie w przeglądarce nie zostało jeszcze zweryfikowane.

## Sugerowana kolejność realizacji

W pierwszej kolejności należy wdrożyć punkty 1–3. Mają niewielki zakres techniczny, a rozwiązują najbardziej prawdopodobne momenty dezorientacji podczas wysyłania formularza. Następnie warto zrealizować oznaczenia pól, uproszczenie informacji o czasie oraz status szkicu. Podgląd logo może zostać wykonany niezależnie jako osobne usprawnienie.
