# Nowe reguły ESLint: `eslint-plugin-react-hooks` 7.1.1

Włączone w kroku 2e planu (`docs/updates/update-context.md`) w `eslint.config.mjs`, przez rozwinięcie presetu
`recommended-latest`. To reguły React Compilera: pilnują, żeby komponenty i hooki były czyste i przewidywalne, bo
tylko taki kod kompilator potrafi bezpiecznie zoptymalizować. Pełna dokumentacja każdej reguły:
`https://react.dev/reference/eslint-plugin-react-hooks/lints/<nazwa-reguły>`.

## Reguły, które były już wcześniej

| Reguła            | Poziom  | Uwagi                                                      |
| :---------------- | :------ | :--------------------------------------------------------- |
| `rules-of-hooks`  | `error` | Bez zmian.                                                 |
| `exhaustive-deps` | `error` | Preset ustawia `warn`; zostawiony `error`, jak było dotąd. |

## Nowo włączone reguły

### `purity` — `error`

Komponent i hook muszą przy tych samych danych zwracać to samo. Zabrania wywoływania w renderze funkcji, które za
każdym razem dają inny wynik (`Math.random()`, `Date.now()`, `new Date()`, `performance.now()`).

```tsx
// ❌ nowy klucz przy każdym renderze — React za każdym razem niszczy i tworzy element od nowa
<EmptyCell key={Math.random()} />

// ✅ stabilny klucz wyliczony z danych
<EmptyCell key={`empty-${room}-${rowIndex}`} />
```

Jedyne zgłoszenie w projekcie (`Schedule.tsx`) zostało poprawione dokładnie w ten sposób.

### `static-components` — `error`

Komponent nie może być definiowany wewnątrz innego komponentu. Taki komponent jest tworzony od nowa przy każdym
renderze rodzica, więc traci swój stan i zawsze przerenderowuje całe poddrzewo.

```tsx
// ❌
const List = () => {
  const Item = ({ label }: ItemProps) => <li>{label}</li>;
  return <Item label="a" />;
};

// ✅ komponent na poziomie modułu
const Item = ({ label }: ItemProps) => <li>{label}</li>;
const List = () => <Item label="a" />;
```

### `immutability` — `error`

Zabrania mutowania propsów, stanu i innych wartości, które React traktuje jako niezmienne. Zmiana „w miejscu” nie
wywoła ponownego renderu i psuje porównania.

```tsx
// ❌
items.push(newItem);
setItems(items);

// ✅ nowa tablica
setItems([...items, newItem]);
```

### `globals` — `error`

Zabrania zmieniania zmiennych globalnych i modułowych podczas renderu (efekt uboczny w renderze).

```tsx
let renderCount = 0;

// ❌
const Counter = () => {
  renderCount++;
  return <span>{renderCount}</span>;
};
```

Efekty uboczne należą do `useEffect` albo do obsługi zdarzeń.

### `set-state-in-render` — `error`

Zabrania wywołania `setState` bezpośrednio w renderze — prowadzi do kolejnego renderu, a często do nieskończonej
pętli.

```tsx
// ❌
const Form = ({ value }: FormProps) => {
  const [draft, setDraft] = useState('');
  setDraft(value);
  return <input value={draft} />;
};

// ✅ wartość wyliczona w renderze, bez osobnego stanu
const Form = ({ value }: FormProps) => <input value={value} readOnly />;
```

### `error-boundaries` — `error`

Błędów renderowania komponentów dzieci nie da się złapać `try/catch` w JSX — do tego służy error boundary.

```tsx
// ❌ nie zadziała dla błędów rzuconych podczas renderu Child
try {
  return <Child />;
} catch {
  return <Fallback />;
}

// ✅
<ErrorBoundary fallback={<Fallback />}>
  <Child />
</ErrorBoundary>;
```

### `use-memo` — `error`

Pilnuje poprawnego użycia `useMemo`: callback nie przyjmuje argumentów i jest synchroniczny.

```tsx
// ❌ useMemo nie przekaże argumentu — `items` w callbacku będzie undefined
const total = useMemo((items) => sum(items), [items]);

// ✅
const total = useMemo(() => sum(items), [items]);
```

### `void-use-memo` — `error`

`useMemo` musi zwracać wartość i ta wartość musi być użyta. `useMemo` bez wyniku to zwykle źle użyty `useEffect`.

```tsx
// ❌
useMemo(() => {
  document.title = title;
}, [title]);

// ✅
useEffect(() => {
  document.title = title;
}, [title]);
```

### `preserve-manual-memoization` — `error`

Sprawdza, czy React Compiler może zachować istniejące `useMemo` / `useCallback`. Zgłasza memoizację, której
kompilator nie umie odtworzyć, np. gdy lista zależności nie zgadza się z tym, czego callback faktycznie używa.

```tsx
// ❌ callback używa `filter`, ale nie ma go w zależnościach
const visible = useMemo(() => items.filter((item) => item.tag === filter), [items]);

// ✅
const visible = useMemo(() => items.filter((item) => item.tag === filter), [items, filter]);
```

### `unsupported-syntax` — `warn`

Ostrzega przed składnią, której React Compiler nie będzie obsługiwał, np. `eval` albo `with`. Taki komponent zostanie
pominięty przez kompilator.

```tsx
// ⚠️
const value = eval(expression);
```

### `config` i `gating` — `error`

Sprawdzają poprawność konfiguracji samego React Compilera (opcje kompilatora i tryb „gating”, czyli włączanie
skompilowanej wersji za flagą). Projekt nie używa jeszcze kompilatora, więc obecnie nic nie zgłaszają — zaczną mieć
znaczenie w kroku 4.

## Reguły z presetu świadomie wyłączone

Wymagają przeróbek w kodzie; do podjęcia w kroku 4 (React Compiler). Stan na dzień włączenia presetu:

| Reguła                 | Zgłoszeń              | Czego pilnuje                                                                           |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------- |
| `refs`                 | 20 błędów w 6 plikach | Czytania i zapisywania `ref.current` w renderze (np. `xRef.current = x` w ciele hooka). |
| `set-state-in-effect`  | 9 błędów w 8 plikach  | Synchronicznego `setState` w `useEffect`, który wymusza drugi render.                   |
| `incompatible-library` | 2 ostrzeżenia         | Bibliotek, których kompilator nie zoptymalizuje (tu `watch()` z React Hook Form).       |

Przykład `set-state-in-effect`:

```tsx
// ❌ najpierw render z pustą wartością, potem drugi render po setState
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// ✅ wartość wyliczona w renderze
const fullName = `${firstName} ${lastName}`;
```
