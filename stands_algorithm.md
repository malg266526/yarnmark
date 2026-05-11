# Dokumentacja Systemu Przydziału Stoisk (Model Kaskadowy)

## 1. Cel i Główne Założenia
System automatyzuje przydział stoisk na podstawie **decyzji Organizatora** oraz **obiektywnego czasu zgłoszenia (Timestamp)**. W odróżnieniu od systemów w pełni automatycznych, tutaj to Ty decydujesz, w którym momencie stoiska zostaną oficjalnie rozdzielone pomiędzy zaakceptowane firmy.

---

## 2. Etapy Procesu

### Etap I: Zbieranie Zgłoszeń
Wystawcy wypełniają formularz na stronie, wybierając 3 preferowane stoiska (Priorytet 1, 2 i 3). Każde zgłoszenie otrzymuje unikalny znacznik czasu (Timestamp) z dokładnością do milisekund.

### Etap II: Weryfikacja (Praca Organizatora)
W panelu administratora przeglądasz listę firm i nadajesz im statusy. Na tym etapie **żadne stoisko nie jest jeszcze zajęte**.

*   **Nowy:** Zgłoszenie oczekujące.
*   **Rozważany:** Firma w trakcie weryfikacji.
*   **Zaakceptowany:** Firma zatwierdzona merytorycznie, bierze udział w przydziale stoisk.
*   **Rezerwowy:** Firma na liście oczekujących, system pominie ją podczas przydziału.

### Etap III: Wielki Finał – Uruchomienie Algorytmu
Gdy większość kluczowych wystawców ma już status „Zaakceptowany”, klikasz przycisk:
**[Uruchom algorytm kaskadowego przypisania stanowisk]**.

---

## 3. Jak działa algorytm (Mechanizm kaskady)
Po kliknięciu przycisku system wykonuje następujące operacje w ułamku sekundy:

1.  **Sortowanie:** System tworzy listę wszystkich wystawców ze statusem **Zaakceptowany**, układając ich od tego, który wysłał formularz najwcześniej.
2.  **Alokacja (Waterfall):** Dla każdej osoby z tej listy system próbuje przypisać stoisko:
  - Najpierw sprawdza **Wybór 1**. Jeśli wolne -> Rezerwuje.
  - Jeśli zajęte -> Sprawdza **Wybór 2**. Jeśli wolne -> Rezerwuje.
  - Jeśli zajęte -> Sprawdza **Wybór 3**. Jeśli wolne -> Rezerwuje.
3.  **Raport:** System generuje listę firm, dla których zabrakło miejsc z ich listy życzeń („Do negocjacji ręcznej”).

---

## 4. Status "Klepnięte" i Iteracje Algorytmu

Po uruchomieniu algorytmu i wygenerowaniu przez niego przypisań, wymagane jest zatwierdzenie wyników przez Organizatora.

*   **Akceptacja pojedyncza:** Każde zasugerowane stoisko może być akceptowane osobno. Dopiero po zatwierdzeniu przypisania przez Organizatora, stoisko zyskuje oficjalny status **"Klepnięte"** i jest ostatecznie zajęte.
*   **Kolejne iteracje:** Stanowiska, które po danej iteracji algorytmu pozostały przypisane do "Zaakceptowanych" wystawców, ale z jakiegoś powodu nie doczekały się Twojej akceptacji stoiska (lub algorytm w ogóle nie znalazł dla nich miejsca z ich priorytetów), mogą przejść do kolejnej iteracji. Możesz ponownie uruchomić algorytm, aby przeliczył układ dla pozostałych wolnych miejsc.

Wcześniej (przed zatwierdzeniem) wystawcy mogą widzieć na mapie jedynie status **"High Interest"** (duża liczba chętnych), co pomaga im ocenić ryzyko przy wyborze preferowanych miejsc.

---

## 5. TODO

* Reasearch możliwości automatycznej wysyłki maili do wystawcy, przy zmianie statusu na "Klepnięte"
* Możliwość rezerwacji dwóch stanowisk
