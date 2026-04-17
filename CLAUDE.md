# CLAUDE.md

Pet Concierge — 2-hour workshop starter. React + Vite + TypeScript frontend. Intended backend: Node + Hono + better-sqlite3 + zod (not scaffolded yet — participants build it). See [AGENTS.md](AGENTS.md) for architecture rules and [SPEC.md](SPEC.md) for the product.

## Verification

Run before every commit. Fix all errors before committing.

```bash
npm run lint
npm run typecheck
npm run test:bdd
```

## Autonomous Behaviors

| Trigger | Action |
|---------|--------|
| Code changes | Run `npm run lint` then `npm run typecheck`. Auto-fix failures. Loop until green. |
| UI change | Run `npm run dev` and verify the change in the browser. Type/lint passing is not enough — confirm the feature actually works visually. |
| Build/test failure | Read the error, fix it, re-run. Repeat until green. Ask only if stuck after 3 attempts. |
| Ready to commit | Always ASK before committing. Never auto-commit. |
| Feature request touching 2+ layers (UI + API, or UI + data + API) | **Immediately** invoke `architect` agent before writing any code. Do not skip this step. |
| Core implementation done, before tests | Invoke `code-reviewer` + `design-reviewer` + `product-reviewer` in parallel. Address all CRITICAL and WARNING findings before writing tests. |
| New UI route or visible surface | Invoke `design-reviewer` + `product-reviewer` in parallel. |
| Copy-only changes (headings, empty states, error text) | Invoke `product-reviewer`. |
| Reviewer findings fixed | If fixes touch >3 lines, do a targeted re-review of just the changed code. |
| Scenario tests needed | Invoke `scenario-writer` to draft `.feature` files. Present to user for review. After approval, invoke `test-writer` to implement step definitions. |
| Tests written and passing | Invoke `test-writer` to evaluate coverage gaps. |
| Feature complete, all reviews addressed | Invoke `tech-writer` agent to update relevant READMEs. |
| New endpoint or external integration | Also invoke `security-reviewer`. |
| PII-adjacent code (logging, exports, forms storing personal data) | Invoke `security-reviewer`. |
| Unclear requirement | Infer from context and existing patterns first. Ask only when genuinely ambiguous. The `SPEC.md` has deliberate gaps — flag them to the user rather than guessing. |

### Reviewer enforcement

All CRITICAL and WARNING findings from reviewer agents **must** be addressed before proceeding. "Addressed" means either fixed or explicitly acknowledged by the user as intentional. Do not dismiss findings unilaterally — present them to the user and let them decide. INFO findings are advisory.

## Agent Team

| Agent | Role | When to invoke |
|-------|------|---------------|
| `architect` | Plans multi-layer changes, decides execution path | **Before writing code** for features touching 2+ layers. Mandatory — do not skip. |
| `code-reviewer` | Audits code for pattern compliance (read-only) | After core implementation, before writing tests |
| `scenario-writer` | Writes business-friendly `.feature` files for BDD scenarios (read-only) | Before `test-writer`, when scenario tests are needed. Presents scenarios for user review. |
| `test-writer` | Decides which test layers are needed, writes tests | After reviewer findings are addressed (and after scenario-writer approval for BDD) |
| `tech-writer` | Updates READMEs and documentation | After feature is complete and all reviews pass |
| `security-reviewer` | Audits auth, PII, secrets, validation, XSS, CSRF (read-only) | Auth changes, new endpoints, PII-adjacent code |
| `product-reviewer` | Audits UX flow, copy, empty/error states, edge cases (read-only) | UI changes, copy changes |
| `design-reviewer` | Audits accessibility, responsive, visual consistency (read-only) | UI changes |

## Model Routing

- **Reviewer agents** (code-reviewer, security-reviewer, product-reviewer, design-reviewer): Use Sonnet — pattern-matching tasks.
- **architect**: Use Opus for complex multi-layer features (3+ layers). Sonnet is fine for simple 1-2 layer changes.
- **scenario-writer**: Sonnet is sufficient — reads code, outputs only Gherkin.
- **test-writer, tech-writer**: Sonnet is sufficient for most tasks.

## Session Management

Agent chains accumulate significant context. Manage this proactively:

- Use `/compact` to summarize and free context when the conversation grows long (especially after reviewer rounds)
- Use `/clear` to reset context when switching to an unrelated task
- Use `/cost` to check token usage during the session

## Workshop Notes

- This repo is deliberately bare. Do not add extra tooling, folders, or abstractions unless the feature being built requires it.
- Prefer simple implementations over clever ones. Participants have 2 hours — every abstraction costs them time.
- The backend does not exist yet. When a feature needs a backend, set it up under `server/` using the stack named in `AGENTS.md`.
- **Functional-first JS/TS.** Pure functions over classes, `map`/`filter`/`reduce` over `for` loops, no argument mutation, React function components only. See `AGENTS.md` for the full rule. Non-coders will be reading diffs — keep code boring.
