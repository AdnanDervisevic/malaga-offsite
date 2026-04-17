# Getting Started

Read [SPEC.md](SPEC.md) first. Then pick somewhere to start.

## A few entry points

These are **suggestions, not tracks.** Pick one that sounds fun. Mix and match.

- **Want a quick visual win?** Build the suite browser. Guests see a list of suites, filter by date range, pick one. Lots of surface area for a designer to polish and a PM to refine (tier names, amenities, copy).
- **Like data modeling?** Start with the reservation flow end-to-end. You'll need to set up the backend, the database schema, the booking form, and the availability check. This is the biggest slice and the most rewarding to demo.
- **Prefer operations?** Build the staff dashboard. Today's arrivals, check-in, check-out. Shorter path to something demo-able but fewer surfaces for PM/designer input.
- **Want to learn BDD?** Pick a journey (e.g. "staff checks in a reservation") and pair with the `scenario-writer` and `test-writer` agents. A scenario that exercises two reviewers is more impressive than a feature with no test.
- **PM or designer?** Pair with a coder. Start with the Open Questions in `SPEC.md` — your calls on taxonomy, copy, brand, empty states, and policy become real in the app.

## Rules of engagement

- **Always invoke `architect` before writing code** for anything touching 2+ layers. Paste the plan in the Slack thread. This is the single most important rule — it's how the workflow works.
- **Read diffs before you accept them.** Don't rubber-stamp Claude. Reviewer agents will catch a lot, but they can't catch intent.
- **Reviewer findings are not optional.** `code-reviewer`, `product-reviewer`, `design-reviewer`, and `security-reviewer` flag things as CRITICAL / WARNING / INFO. Fix CRITICAL and WARNING or explicitly decide to ignore with the user — don't silently dismiss.
- **Surface spec gaps, don't invent defaults.** The `SPEC.md` has gaps on purpose. If Claude is about to invent a default for a pricing model or cancellation policy, interrupt and ask the PM.
- **MVP first.** Shipping a thin end-to-end slice beats a half-built big thing. You can always grow from MVP.

## The loop

```
  architect  →  implement  →  code-reviewer          →  scenario-writer  →  test-writer  →  tech-writer
                              product-reviewer           (user review)
                              design-reviewer
                              security-reviewer
                              (in parallel)
```

The autonomous triggers in [CLAUDE.md](CLAUDE.md) will fire most of this for you. Let them.

## When something goes wrong

- **Claude's stuck in a loop fixing the same error.** Stop. Read the error yourself. Feed it the right context (file path + line number).
- **A reviewer produces noise.** Read its finding carefully before dismissing. If it's genuinely wrong, note it in the Slack thread — the reviewer prompts will get refined.
- **You lose track of what's in the context.** `/compact` to summarize, `/clear` to reset for an unrelated task.
- **Dev server or tests misbehave.** `npm run lint` and `npm run typecheck` often pinpoint the issue faster than staring at the screen.
