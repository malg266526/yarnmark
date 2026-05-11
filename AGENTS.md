# Agent Rules

## Clean Code

- Keep page files thin. Page components should compose sections, not own business logic.
- Put state transitions, validation, and persistence in hooks or pure utilities.
- Keep presentational components focused on rendering and callbacks only.
- Before creating a new component, first check whether an existing shared component can be reused or extended.
- Prefer extending existing shared UI primitives over creating page-local replacements with overlapping behavior.
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

## Vendors Form

- `src/pages/VendorsFormPage.tsx` is composition only.
- `src/pages/vendors-form/useVendorsForm.ts` owns flow orchestration.
- `src/pages/vendors-form/VendorsFormView.tsx` owns markup only.
- `src/pages/vendors-form/VendorsFormPage.styled.tsx` owns styling only.
- `src/pages/vendors-form/vendorsFormUtils.ts` owns pure validation and step utilities.

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

## Verification

- After changes, run `npm test`, `npm run lint`, and `npm run typecheck`.
- Run Prettier before verification, not as an optional cleanup step afterward.
