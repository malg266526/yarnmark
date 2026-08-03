# Agent Rules

## Scope & Change Discipline

- Do only what the task asks. Make the smallest change that fully solves it. No drive-by refactors, renames, reformatting, or "while I'm here" cleanups.
- Never touch files unrelated to the request. If a task about the Editor makes you edit the service worker, a carousel, or a shared hook, stop — that is a signal you are out of scope.
- Before deleting or "cleaning up" anything, run `git status` and `git diff` to see what YOU changed in this session. When asked to remove "the debug you added" or "your changes," remove only your own additions — never pre-existing code (existing `console.*`, effects, comments) even if it looks like leftover debug. If unsure whether code is pre-existing, check `git blame`/`git show HEAD:<file>` or ask.
- Preserve existing behavior, routing, copy, and layout in the area you touch. If the requirement forces breaking an established pattern, say so explicitly instead of doing it silently.
- When a change would ripple across many files or into unrelated modules, pause and confirm scope with the user before proceeding.

## Working Method (diagnose, then change)

- Find the root cause before editing. Reproduce and measure first (inspect the DOM, log real values, read the relevant code) instead of applying speculative fixes one after another. One correct change beats five guesses.
- Prefer the simplest mechanism that works. Avoid hacks (negative margins, magic pixel offsets, `!important`, transform scaling, timeouts) unless nothing simpler works — and then explain why in a comment.
- Debug logging is temporary. If you add `console.*` or instrumentation to investigate, track exactly what you added and remove precisely that once the cause is found. Do not leave introduced logging in committed code.
- Verify the actual outcome, not just that it compiles. For UI/layout, confirm in the running app/browser; for logic, exercise the path. If you could not verify a specific way, state that plainly rather than claiming it works.
- Report faithfully: if something is unverified, partially done, or a workaround, say so.
- When executing a step from a plan tracked in a document (e.g. a migration plan under `docs/`), mark that step done in the document itself once it is implemented and verified — don't just report completion in chat and leave the doc stale.

## Clean Code

- Keep page files thin. Page components should compose sections, not own business logic.
- Put state transitions, validation, and persistence in hooks or pure utilities.
- Keep presentational components focused on rendering and callbacks only.
- Before creating a new component, check whether an existing shared component can be reused or extended (with props, attributes, or layout wrappers) — only introduce a page-local variant if the shared one genuinely cannot cover the case.
- Do not use `React.FC`.
- Type component props directly on the function signature.
- Do not use generic `Props` names. Use component-specific names such as `VendorCardProps`.
- Extract reusable pure logic into `*Utils.ts` files before it becomes coupled to React.
- Prefer constants for repeated literals, magic numbers, step counts, storage keys, and route paths.
- Prefer explicit types for form state, step indexes, and validation results.
- Avoid mixing translations with validation rules. Pure validators should return stable keys or codes.
- Prefer small utility modules over inline helper functions once logic is reused or tested.
- Keep styled-components in `*.styled.tsx` files when a view grows beyond a small local component.
- Avoid mixing styled-components, business logic, and large JSX trees in one file.
- Add tests for every extracted pure utility before extending behavior further.
- When implementing a new requirement, preserve existing behavior, routing, copy, and layout in the touched area. If the requirement forces a change to an established rule, surface it explicitly rather than silently shipping it.

## Architecture & SOLID

- **Single Responsibility:** each unit has one reason to change. Components render and wire callbacks; hooks own state, effects, and orchestration; `*Utils.ts` own pure logic; `*.styled.tsx` own styling. Do not mix these in one file.
- **Open/Closed:** extend shared components via props/variants before forking a page-local copy. Reuse existing constants and utilities instead of re-deriving values (e.g. grid geometry lives in `hallGeometry.ts`).
- **Dependency Inversion:** components depend on typed contracts (e.g. `*ViewContracts.ts`, context types), not on concrete implementations. Pass data in via props/context rather than reaching into globals.
- **Side effects at the edges:** persistence (`useLocalStorage`), storage, the service worker, and I/O belong in hooks/utilities, never inside presentational components.
- Match the surrounding code's idioms, naming, and structure. Do not introduce a new pattern for something the codebase already solves a consistent way.

## Vendors Form

- `src/pages/VendorFormPage.tsx` is composition only.
- `src/pages/vendor-form/hooks/useVendorForm.ts` owns flow orchestration.
- `src/pages/vendor-form/components/VendorFormView.tsx` owns markup only.
- `src/pages/vendor-form/components/vendorFormViewContracts.ts` owns the view contract between hook and components.
- `src/pages/vendor-form/components/` stores vendor form section components; split broad views into dedicated sections before adding more branching.
- `src/pages/vendor-form/VendorFormPage.styled.tsx` owns styling only.
- `src/pages/vendor-form/vendorFormUtils.ts` owns pure validation and step utilities.
- `src/pages/vendor-form/tests/` stores vendor form tests.

## Editor (hall stand editor)

- `src/pages/EditorPage.tsx` is composition only (layout wrapper + provider).
- `src/components/editor/Editor.tsx` composes the grid and the stand form; keep styled-components at the top of the file, keep logic in hooks/utils.
- `src/components/editor/EditorContext.tsx` owns stand state (`addStand`/`updateStand`/`removeStand`/`clearStands`) and persistence via `useLocalStorage`.
- `src/components/editor/useStandForm.ts` owns stand-form state and transitions.
- `src/components/editor/utils/` owns pure geometry and helpers; **grid dimensions come from `hallGeometry.ts`** — never hardcode grid width/height/square/gap values.
- The grid renders at a fixed intrinsic size. Keep it at its natural size (`flex: 0 0 auto`) and let siblings wrap; do not shrink it into a scrollbar.

## Translations

- Never hardcode user-facing text directly in JSX. Always source it through `useTypedTranslation` and the `src/translations/en.tsx` / `src/translations/pl.tsx` files.
- Add new keys to `pl.tsx` first (it is the source of the `TranslationsShape` type), then mirror the key in `en.tsx`.
- Use interpolation (`{{value}}`) for dynamic parts instead of string concatenation.
- For a fixed set of variants (e.g. an enum-like union), use a dynamic key such as `t(\`namespace.key.${variant}\` as const)` rather than a manual lookup map.
- This applies to admin/internal tooling pages (e.g. the Editor) as well as public-facing pages — do not treat internal tools as exempt.

## Forms

- For simple forms, lightweight local state is acceptable.
- For more complex forms, use `React Hook Form + Zod` as the default standard.
- Keep schema validation in Zod, not scattered across components.
- Prefer typed form schemas and parsed submission payloads over manual field-by-field checks.

## Dependencies

- When installing or updating packages, prefer exact versions instead of version ranges unless there is a clear reason not to.
- Do not add `^` or `~` when installing or updating dependencies.
- If the package manager writes a range automatically, normalize it back to an exact pinned version in `package.json`.
- Do not change dependency versions as part of unrelated work.
- Keep package updates isolated so regressions are easy to trace.

## Formatting

- Run Prettier after every code change.
- Prefer `npm run format` after edits so formatting is applied consistently across changed files.
- Do not hand-format against the project style if Prettier can decide it consistently.

## CSS & Layout

- Never leave comments about styles. Do not annotate styled-components or CSS rules explaining what a declaration does or why — the code speaks for itself. This applies to `*.styled.tsx` and inline styles as well.
- Reach for the simplest primitive first: flex `direction`/`wrap`/`gap`, `fit-content`, `min-width: 0` only where shrinking is intended. Avoid negative margins, magic offsets, and `!important`.
- Fixed-size content keeps its intrinsic size and lets neighbours wrap; do not force it to shrink.
- Absolutely-positioned decorations (edge labels, badges) still count toward `scrollWidth`/`scrollHeight`. Reserve space with padding rather than clipping meaningful content.
- Confirm layout changes visually in the running app. If you cannot, say so instead of asserting the result.

## Local Development

- Dev server: `npm run start` (esbuild) serves on **port 8090**. Run only one instance. `EADDRINUSE` means one is already running — reuse it, or stop it first with `pkill -f esbuild.serve.mjs`.
- A service worker (`src/service-worker.ts`) can cache and serve a **stale bundle**, hiding your changes. If edits don't appear in the browser, suspect the service worker / browser cache before assuming a code bug — unregister it via DevTools → Application → Service Workers and hard-reload.
- Do not leave background dev servers you started running after a task; stop them when done.

## Verification

- After changes, run `npm test`, `npm run lint`, and `npm run typecheck`.
- Run Prettier before verification, not as an optional cleanup step afterward.
- Do not stop at a passing `test` run if `lint` or `typecheck` still report errors or warnings in touched code.
- Treat ESLint warnings in touched files as work to fix, not as acceptable leftovers.
- Before declaring done, review your own `git diff` and confirm every changed file is intentional and in scope. Remove stray debug and unrelated edits.
