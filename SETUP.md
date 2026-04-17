# SETUP — read this the day before the workshop

We have 2 hours. Setup cannot eat that time. Please complete everything below **before you arrive** and post a green checkmark in the Slack thread when done.

## 1. Prerequisites

- **Node 20+** — check with `node --version`. If you're on an older version, install via [nvm](https://github.com/nvm-sh/nvm) or the Node installer.
- **npm 10+** — bundled with Node 20+.
- **Git** — any recent version.
- **Claude Code** — installed and authed. Run `claude --version` to check. Authentication: `claude`, follow prompts.

## 2. Clone and install

```bash
git clone <repo-url> malaga-offsite
cd malaga-offsite
npm install
```

Installation should complete with no errors. If `better-sqlite3` or any native package fails to build, make sure you have Xcode Command Line Tools (`xcode-select --install` on macOS).

## 3. Install the Playwright browser

Playwright needs Chromium downloaded once:

```bash
npx playwright install chromium
```

This downloads around 200 MB. Do it on wifi at home, not on hotel wifi at 9am.

## 4. Verify the starter runs

```bash
npm run dev
```

Open <http://localhost:5173> — you should see the "Pet Concierge" landing page. Stop the server with Ctrl-C.

Then:

```bash
npm run test:bdd
```

One scenario should pass (`App boots › Landing page renders`). If it fails, check that port 5173 is free and that Playwright's browser install completed.

## 5. Verify Claude Code works

In the repo directory:

```bash
claude
```

Ask it something simple, e.g. "summarize SPEC.md in three sentences". Confirm it reads the file and answers. Exit with `/exit`.

## 6. Post your checkmark

When all of the above work, post ✅ in the workshop Slack thread with a one-line note like "all green on macOS 14". If anything breaks, post the error instead — we'll fix it in the thread, not on the day.

## What to bring

- Your laptop with the above working.
- Power cable.
- Headphones if you like them while coding.
- An open mind about pet names.

See you in Malaga. 🐾
