# AGENTS.md

Architecture rules for Pet Concierge. Short and load-bearing — read it before every substantial change.

## Intended Stack

The starter ships with the frontend only. When a feature needs a backend or data, use this stack so Claude makes consistent choices across pairs:

| Layer | Choice |
|-------|--------|
| Frontend | React 18 + Vite + TypeScript (already scaffolded under `src/`) |
| Backend | Node 20+ with [Hono](https://hono.dev/) for HTTP — set up under `server/` when first needed |
| Database | SQLite via [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) — synchronous API, zero setup |
| Validation | [zod](https://zod.dev/) schemas, shared between frontend and backend |
| Shared types | `z.infer<typeof Schema>` — do not duplicate types |

You are free to deviate if you have a reason — but discuss it with the user before adopting a new framework. Fewer moving parts wins in a 2-hour workshop.

## Layers

```
src/     → web   (React components, pages, client-side logic)
server/  → api   (Hono handlers + domain functions + data access)
server/db → data (better-sqlite3 schema + queries)
shared/  → zod schemas and inferred types (only create if both sides import from it)
```

**Dependency direction:** web → api → data. The web never queries SQLite directly. Types/schemas flow from `shared` (or `server/schemas.ts`) outward.

## Hard Rules

- **Validate at the boundary.** Every API handler parses its input with zod before using it. No exceptions.
- **Return structured errors.** Handlers return a consistent error shape (`{ error: { code, message } }` with an appropriate HTTP status). Don't throw for expected failures.
- **One source of truth for types.** Define a zod schema once; derive TS types with `z.infer`; import from both sides.
- **No raw SQL via string concat.** Use parameterized queries with `?` placeholders. `better-sqlite3` supports them.
- **No secrets in the frontend bundle.** Anything imported under `src/` ends up in the browser. Put keys in `.env` and read them server-side only.
- **No abstractions you don't need.** No repositories, no services layer, no DI containers, no custom Result type. Plain functions, plain data.

## Style: functional-first JavaScript/TypeScript

Beginner readers are in the room. Keep the code boring and readable.

- Prefer pure functions over classes. No `this`, no inheritance.
- Prefer `map` / `filter` / `reduce` over imperative `for` loops for data transforms.
- Keep side effects at the edges (HTTP handlers, DB access, React event handlers). Inner helpers stay pure.
- Do not mutate function arguments. Return a new value instead.
- React: function components with hooks only — no class components.
- Exception: when a library idiom demands a class (rare in this stack), follow the library.

## Naming

- Routes: `server/routes/<resource>.ts`, exporting a Hono sub-app.
- Domain functions: `server/<resource>/<verb>.ts` if logic grows beyond a handler; otherwise inline.
- Schemas: `shared/schemas.ts` or colocated.
- React components: `PascalCase.tsx`, one component per file when export is the default.
- Hooks: `useCamelCase.ts`.

## Testing

- BDD scenarios in `tests/scenarios/features/*.feature`, step definitions in `tests/scenarios/steps/`. Cucumber-js + Playwright. One smoke scenario already exists.
- Unit tests colocated (`foo.ts` + `foo.test.ts`). Add Vitest when you need it — not installed by default.
- Use the `test-writer` agent to decide what layer to test at.

## Out of Scope

No auth, no real payments, no multi-tenant, no email/SMS, no deploy. See `SPEC.md` non-goals.
