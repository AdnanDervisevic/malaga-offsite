# SPEC.md — Pet Concierge

## Product pitch

A boutique pet hotel needs a small web app to run its operation. Pet owners should be able to browse suites, book a stay for their pet, add services like grooming or extra play time, and manage their upcoming reservations. Staff need a simple operational view to see who is arriving, check pets in and out, and assign suites. The vibe is friendly, a little playful, and Mews-adjacent without being a Mews clone.

Working title: **Pawsident Suites**. Rename it if you want; the product team (PM/designer) owns the name.

## User roles

- **Guest** — a pet owner who browses, books, and manages their own reservations. No login; they identify themselves on the booking form.
- **Staff** — a hotel employee who sees today's arrivals and departures, checks pets in and out, and can see upcoming reservations. Accessed via a fake "I am staff" toggle in the UI — there is no real auth.

## Core entities

### Pet
- Name (required)
- Species — `GAP: which species are allowed?` (dogs only? dogs + cats? exotics?)
- Size or weight (affects suite eligibility) — `GAP: buckets (S/M/L) or free-text kg?`
- Owner name and contact — `GAP: email? phone? both?`
- Notes / quirks (free text, optional)
- Photo (optional)

### Suite
- Name (e.g. "Pawsident Suite", "Tailor Suite") — `GAP: final taxonomy is the PM's call`
- Size tier — matches pet size eligibility
- Amenities (free text list: "window view", "heated floor", etc.)
- Nightly rate — `GAP: flat rate? tier-based? dynamic pricing?`

### Reservation
- Pet
- Suite
- Date range (check-in and check-out)
- Services added (0 or more)
- Status (see state machine below)
- Total price (derived)

### Service
- Name (e.g. "grooming", "long walk", "playtime")
- Duration
- Price
- `GAP: can services be bundled/discounted?`

## Reservation state machine

```
  draft ──submit──▶ booked ──check-in──▶ checked-in ──check-out──▶ checked-out ──archive──▶ archived
                      │
                      └──cancel──▶ cancelled
```

- `draft` → `booked`: guest submits the booking form.
- `booked` → `checked-in`: staff marks the pet arrived.
- `checked-in` → `checked-out`: staff marks the pet departed.
- `booked` → `cancelled`: guest or staff cancels.
- `checked-out` → `archived`: time-based or manual.
- No other transitions are allowed.

## User stories

Priority: **P0** = must ship for the MVP. **P1** = obvious next. **P2** = nice to have, stretch.

### Guest

- **P0** As a pet owner, I can browse available suites for a specific date range so I can see what's bookable.
- **P0** As a pet owner, I can add my pet's details as part of the booking flow.
- **P0** As a pet owner, I can book a suite for my pet for a specific date range.
- **P0** As a pet owner, I can see a confirmation with the key details after I book.
- **P1** As a pet owner, I can add services (grooming, walks, etc.) to my booking.
- **P1** As a pet owner, I can see my upcoming reservations.
- **P1** As a pet owner, I can cancel a reservation that hasn't started.
- **P2** As a pet owner, I can save pet profiles so I don't re-enter them for every booking.
- **P2** As a pet owner, I can see past stays and a summary.
- **P2** As a pet owner, I can leave a review after a stay.

### Staff

- **P0** As staff, I can see today's arrivals (pets booked to check in today).
- **P0** As staff, I can mark a pet checked in.
- **P0** As staff, I can mark a pet checked out.
- **P1** As staff, I can see today's departures and currently-in-house pets.
- **P1** As staff, I can see a 7-day look-ahead of upcoming reservations.
- **P1** As staff, I can cancel a reservation on the guest's behalf.
- **P2** As staff, I can reassign a reservation to a different suite (upgrade/downgrade).
- **P2** As staff, I can add an ad-hoc service to an in-house reservation.
- **P2** As staff, I can see suite occupancy on a calendar.

**No acceptance criteria are provided on purpose.** Define them with Claude as you build — the `architect` agent will help decompose each story, and `product-reviewer` / `design-reviewer` will flag gaps.

## MVP

Ship this end-to-end and you have a demo-able product:

1. A guest can complete a full booking flow for one suite, one pet, for a valid date range.
2. Staff can see that guest's booking on their arrivals screen and mark it checked in.
3. Staff can mark the same reservation checked out.
4. At least one passing BDD scenario covers the above flow.

Everything beyond MVP is gravy. If you ship MVP with time to spare, pick the P1 stories that your PM/designer are most excited about.

## Open questions (for PM/designer)

The spec leaves these deliberately unanswered. The PM and designer should decide these as the workshop unfolds; surface decisions in the final demo.

1. Which pet species are allowed?
2. Suite tier taxonomy — how many tiers, what are they named, what amenities define each?
3. Pricing model — flat nightly rate, tier-based, or dynamic?
4. Cancellation policy — free always, free until X hours before, fee after?
5. Staff role granularity — single "staff" role, or separate front-desk vs manager?
6. Empty-state copy tone — playful and pet-themed, or neutral?
7. Brand palette and typography — warm pet-hotel, clean Mews-adjacent, or dark mode?
8. Review / rating UX — stars, emoji, free text, or all three?
9. Notification copy — booking confirmed, reminder 24h before, cancellation.
10. Which guest profile fields are required vs optional? (e.g. vaccination status, emergency contact)
11. Service bundling — can services be discounted or packaged?
12. Loyalty concept — return-guest discount, member tier?
13. Default landing view for staff — calendar, list, or today's arrivals?
14. Mobile breakpoints and which screens must work on mobile.
15. Dark mode — in scope for the workshop or out?

## Stretch ideas

For pairs who finish MVP early:

- Print view for staff (today's arrivals as a printable sheet).
- Keyboard shortcuts for staff check-in/out.
- CSV export of reservations.
- Undo affordance on cancel.
- Fake real-time ticker: "Bella just checked in" toast.
- Suite photo gallery.
- Drag-and-drop reassignment on a calendar.
- Mood filter: "find me a suite my anxious dog would like".

## Non-goals

- Real payments (fake a "total" but don't integrate a processor).
- Multi-tenant / multi-hotel (one hotel, one dataset).
- Real authentication (use a fake role toggle in the UI).
- Email or SMS notifications (show them in-app if you want).
- Production deploy (local-only is fine).
- Mobile app — responsive web only.

## Workshop success criteria

- At least one pair ships MVP end to end.
- Every pair runs at least one reviewer agent and addresses its findings.
- At least one BDD scenario beyond the smoke test passes.
- Every pair invokes `architect` at least once before writing code.
- Everyone leaves understanding the `architect → implement → reviewers → scenario-writer → test-writer → tech-writer` chain on a real task.
