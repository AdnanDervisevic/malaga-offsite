# malaga-offsite

Starter repo for the Malaga Claude Code workshop. Build **Pet Concierge** — a small pet hotel web app — in 2 hours using the subagent workflow ported from the `fintech-onboarding` project.

## What's in here

- [SPEC.md](SPEC.md) — the PRD for Pet Concierge. User stories, MVP, open questions, non-goals.
- [GETTING-STARTED.md](GETTING-STARTED.md) — loose entry points and the rules of engagement.
- [SETUP.md](SETUP.md) — do this **before** you arrive.
- [CLAUDE.md](CLAUDE.md) — autonomous behaviors and agent team. This is the instructions Claude reads automatically.
- [AGENTS.md](AGENTS.md) — architecture rules and intended stack.
- `.claude/agents/` — eight subagents: `architect`, `code-reviewer`, `scenario-writer`, `test-writer`, `tech-writer`, `security-reviewer`, `product-reviewer`, `design-reviewer`.

## What's NOT in here

- No backend. Participants add `server/` as needed.
- No data layer. Participants set up SQLite when needed.
- No route structure, no components, no styling system. Vite's defaults only.
- This is intentional. 2 hours with an agent should be spent building, not reading scaffolding.

## Commands

```bash
npm install                      # first time
npx playwright install chromium  # first time
npm run dev                      # Vite on :5173
npm run lint                     # eslint
npm run typecheck                # tsc --noEmit
npm run test:bdd                 # cucumber + playwright scenarios
```

## Workshop agenda (2 hours)

- **0–15 min** — setup verify, intro.
- **15–30 min** — live demo + walk through `CLAUDE.md` and the agent team.
- **30–100 min** — build time (70 min).
- **100–115 min** — pair demos.
- **115–120 min** — wrap and friction list.
