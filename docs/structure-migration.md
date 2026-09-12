# Plan Migracji i Restrukturyzacji Ścieżek (App Router & Routing)

Dokument opisuje docelowy podział ścieżek, architekturę folderów oraz zasady bezpieczeństwa dla serwisu internetowego poświęconego Targom Włóczki. Podział uwzględnia trzy główne grupy użytkowników: **Klient końcowy (End Customer)**, **Wystawcy i Prowadzący Warsztaty (Partners)** oraz **Administratorzy (Admin)**.

---

## 1. Cele Restrukturyzacji

1. **Uporządkowanie architektury ścieżek (SEO & Semantyka):** Wprowadzenie jasnych, czytelnych adresów URL opartych na konwencji kebab-case.
2. **Izolacja Strefy Administracyjnej (RBAC):** Odizolowanie zasobów admina pod spójnym prefiksem `/admin` oraz obsługa autoryzacji na poziomie middleware/layoutów.
3. **Wsparcie dla Wystawców i Warsztatowców:** Dedykowane dedykowane ścieżki i formularze zgłoszeniowe (`/vendor/apply`, `/workshops/apply`) bez możliwości wglądu w dane administracyjne.
4. **Logiczny podział kodu (Route Groups):** Skuteczna organizacja plików w folderze projektu (np. Next.js App Router) ułatwiająca rozwój aplikacji.

---

## 2. Zestawienie Ścieżek (Page Directory List)

### A. Strefa Publiczna (End Customer / Odwiedzający)

Dostępna dla każdego użytkownika. Odpowiada za prezentację targów, agendy i planu hali.

| Stara Ścieżka       | Nowa Ścieżka        | W Nawigacji | Rola / Dostęp | Opis / Opis Komponentu                                                                       |
| :------------------ | :------------------ | :---------: | :------------ | :------------------------------------------------------------------------------------------- |
| `/home`             | `/` lub `/home`     |     Tak     | Publiczny     | Strona główna z sekcjami kotwicowanymi (`#workshops`, `#vendors`, `#hall`, `#patterns` itp.) |
| `/hall`             | `/hall`             |     Tak     | Publiczny     | Plan hali, mapa stoisk i rozmieszczenie wystawców                                            |
| `/statutes`         | `/statutes`         |     Tak     | Publiczny     | Ogólny regulamin wydarzenia dla odwiedzających                                               |
| `/info-for-vendors` | `/info-for-vendors` |     Tak     | Publiczny     | Strona informacyjna z ofertą i warunkami dla wystawców/prowadzących                          |

---

### B. Strefa Partnera (Wystawcy & Prowadzący Warsztaty)

Strefa dedykowana podmiotom zgłaszającym swój udział w wydarzeniu.

| Stara Ścieżka              | Nowa Ścieżka        | W Nawigacji | Rola / Dostęp       | Opis / Opis Komponentu                                        |
| :------------------------- | :------------------ | :---------: | :------------------ | :------------------------------------------------------------ |
| `/info-for-vendors-statue` | `/vendor/statute`   |     Nie     | Publiczny / Partner | Regulamin uczestnictwa i wystawiania się na targach           |
| `/vendors-form`            | `/vendor/apply`     |     Nie     | Publiczny / Partner | Formularz zgłoszeniowy dla wystawców stoisk                   |
| _(brak)_                   | `/workshops/apply`  |     Nie     | Publiczny / Partner | **NOWOŚĆ:** Formularz zgłoszeniowy dla prowadzących warsztaty |
| _(brak)_                   | `/portal/dashboard` |     Nie     | Partner (Auth)      | Panel statusu zgłoszenia i zarządzania własnymi danymi        |

---

### C. Strefa Administracyjna (Admin Only)

Strefa przeznaczona wyłącznie dla zespołu organizacyjnego targów. Wymaga zalogowania z rolą administratora.

| Stara Ścieżka           | Nowa Ścieżka                    | W Nawigacji | Rola / Dostęp | Opis / Opis Komponentu                                          |
| :---------------------- | :------------------------------ | :---------: | :------------ | :-------------------------------------------------------------- |
| `/editor`               | `/admin/editor`                 |     Nie     | Admin         | Edytor treści strony głównej, sekcji i aktualności              |
| `/vendors-applications` | `/admin/vendors/applications`   |     Nie     | Admin         | Panel zarządzania aplikacjami i weryfikacji wystawców           |
| _(brak)_                | `/admin/workshops/applications` |     Nie     | Admin         | **NOWOŚĆ:** Panel zarządzania aplikacjami zgłoszeń na warsztaty |

---

## 3. Mapowanie Sekcji i Kotwic (Main Menu Navigation)

Menu nawigacyjne na stronie głównej odwołuje się do sekcji zawartych w komponentach strony głównej:

- `#mainInfoButtons` – Główne przyciski akcji (np. Kup bilet, Zostań wystawcą)
- `#workshops` – Warsztaty i harmonogram zajęć
- `#vendors` – Lista potwierdzonych wystawców
- `#after` – Strefa After Party / Wydarzenia towarzyszące
- `#patterns` – Darmowe i komercyjne wzory włóczkowe
- `#lagrugru` – Sekcja specjalna / Partner strategiczny
- `#team-and-partners` – Zespół organizacyjny i partnerzy
- `#lastEdition` – Fotorelacja i podsumowanie poprzedniej edycji
- `#food` – Strefa gastronomiczna (Food Trucki)
- `#footer` – Stopka z danymi kontaktowymi i linkami prawnymi

---

## 4. Architektura Folderów w Projektach (App Router)

Poniższa struktura wykorzystuje konwencję grup ścieżek w nawiasach `(group_name)`, co pozwala na logiczny podział kodu i stosowanie osobnych layoutów/middleware bez wpływu na adresy URL.

```text
app/
├── (public)/                       # Strefa Publiczna
│   ├── layout.tsx                  # Główny layout z widocznym Nawigacyjnym Headerem i Footerem
│   ├── page.tsx                    # / (Strona główna z sekcjami kotwicowanymi)
│   ├── hall/
│   │   └── page.tsx                # /hall (Mapa hali)
│   ├── statutes/
│   │   └── page.tsx                # /statutes (Regulamin ogólny)
│   └── info-for-vendors/
│       └── page.tsx                # /info-for-vendors (Informator dla wystawców)
│
├── (partner)/                      # Strefa Wystawców i Prowadzących Warsztaty
│   ├── layout.tsx                  # Dedykowany layout dla formularzy i portalu partnera
│   ├── vendor/
│   │   ├── statute/
│   │   │   └── page.tsx            # /vendor/statute
│   │   └── apply/
│   │       └── page.tsx            # /vendor/apply (Formularz Wystawcy)
│   ├── workshops/
│   │   └── apply/
│   │       └── page.tsx            # /workshops/apply (Formularz Warsztatowca)
│   └── portal/
│       └── dashboard/
│           └── page.tsx            # /portal/dashboard (Panel Wystawcy / Prowadzącego)
│
└── (admin)/                        # Strefa Administracyjna
    └── admin/
        ├── layout.tsx              # Guard/Layout sprawdzający uprawnienia ADMIN
        ├── editor/
        │   └── page.tsx            # /admin/editor (CMS / Edytor Strony)
        ├── vendors/
        │   └── applications/
        │       └── page.tsx        # /admin/vendors/applications (Zarządzanie Wystawcami)
        └── workshops/
            └── applications/
                └── page.tsx        # /admin/workshops/applications (Zarządzanie Warsztatami)
```

---

## 5. Zasady Bezpieczeństwa i Zarządzanie Dostępem (RBAC)

1. **Middleware Guard:**

- Zapytania kierowane na przedrostek `/admin/*` musza przechodzić przez weryfikację tokenu/sesji.
- Jeżeli użytkownik nie posiada roli `ADMIN`, następuje natychmiastowe przekierowanie na stronę główną lub stronę logowania.

2. **Izolacja Komponentów:**

- Formularze aplikacyjne (`/vendor/apply` oraz `/workshops/apply`) wysyłają dane do chronionych końcówek API.
- Prowadzący i wystawcy nie mają bezpośredniego dostępu do interfejsu przeglądania list aplikujących (`/admin/*/applications`).

3. **Menu i Linki:**

- Odnośniki do paneli administracyjnych nie występują w publicznym kodzie nawigacji ani stopki.
