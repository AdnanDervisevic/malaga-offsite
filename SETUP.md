# SETUP — read this the day before the workshop

We have 2 hours. Setup cannot eat that time. Please complete everything below **before you arrive** and post a green checkmark in the Slack thread when done.

If anything on this page is unfamiliar — that is fine. We will help in person. But please get as far as you can on your own so the first hour of the workshop is not "install Node on 10 laptops". If you get stuck, **post the error in the Slack thread the day before**, not on the morning of.

This works on **macOS** and **Windows**. Pick the section that matches your machine.

---

## For everyone — what we will install

1. **Node.js** — the engine that runs the app.
2. **Git** — to download the workshop repo.
3. **Claude Code** — the AI coding tool we will use.
4. **A terminal** — where you type commands. More on this below per OS.
5. **Chromium** (for the browser tests) — downloaded once via Playwright.

You do not need to understand any of these in depth. You just need them installed.

---

## macOS setup

### 1. Open Terminal

Press **Cmd+Space**, type `terminal`, press Enter. A black/white text window opens. This is where you paste commands.

### 2. Install Homebrew (if you do not already have it)

Homebrew is a package installer. Copy-paste this into Terminal and press Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It will ask for your Mac password — that is normal. Installation takes 3–5 minutes.

When it finishes, it may print two lines starting with `echo` and `eval` — **run those two lines** to add Homebrew to your shell. (If unsure, close Terminal, reopen, and continue.)

Verify:

```bash
brew --version
```

You should see something like `Homebrew 4.x.x`.

### 3. Install Node, Git, and build tools

```bash
brew install node git
xcode-select --install
```

The last one opens a GUI installer for Apple's command line tools. Accept and wait for it to finish (5–10 minutes). If it says "already installed", skip it.

Verify:

```bash
node --version   # should print v20 or higher
git --version
```

### 4. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Then authenticate:

```bash
claude
```

Follow the prompts — it opens a browser to sign in. Once signed in, type `/exit` to leave.

---

## Windows setup

### 1. Open PowerShell (as Administrator)

Press the **Windows key**, type `powershell`, right-click "Windows PowerShell", pick **Run as administrator**. A blue text window opens. This is where you paste commands.

### 2. Install winget (skip if Windows 11)

Windows 11 already has `winget`. Windows 10: install "App Installer" from the Microsoft Store.

Verify:

```powershell
winget --version
```

### 3. Install Node, Git, and build tools

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install Microsoft.VisualStudioCode
```

**Close and reopen PowerShell** after installs so new commands are on the path.

Verify:

```powershell
node --version   # should print v20 or higher
git --version
```

> If `better-sqlite3` fails to build later with a Python or MSBuild error, also run:
> ```powershell
> winget install Python.Python.3.12
> npm install --global windows-build-tools
> ```

### 4. Install Claude Code

```powershell
npm install -g @anthropic-ai/claude-code
```

Authenticate:

```powershell
claude
```

Follow the prompts. Type `/exit` to leave.

---

## Everyone — download the repo

"The repo" is a folder of code that lives on GitHub. We will copy it onto your laptop using a command called `git clone`. You do not need a GitHub account for this — the repo is public.

**What `git clone` does:** downloads a copy of the project into a new folder on your machine. From then on, that folder is yours to edit.

### Pick where it lives

Use your Desktop to keep it simple. In your terminal:

- **macOS:**
  ```bash
  cd ~/Desktop
  ```
- **Windows PowerShell:**
  ```powershell
  cd $HOME\Desktop
  ```

`cd` means "change directory". You are now "inside" your Desktop folder for the purposes of the terminal.

### Clone it

```bash
git clone https://github.com/AdnanDervisevic/malaga-offsite.git
```

You should see a few lines ending with something like `Resolving deltas: 100%`. A new folder called `malaga-offsite` now exists on your Desktop.

> **If `git` asks for a username or password:** the repo is public, so just press Enter twice to skip, or hit Ctrl+C and re-run the command. You do not need credentials.
>
> **If you see `Permission denied (publickey)`:** you accidentally used the SSH URL. Use the `https://` one above.

### Move into the folder and install

```bash
cd malaga-offsite
npm install
```

`cd malaga-offsite` steps into the folder. `npm install` downloads all the libraries the project uses. Takes 1–2 minutes, should end with no red "ERR" lines.

> Windows: if you see "running scripts is disabled" run this once, then retry `npm install`:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

### Coming back to it later

Every time you open a new terminal, you are "outside" the project folder. To get back in:

- **macOS:** `cd ~/Desktop/malaga-offsite`
- **Windows:** `cd $HOME\Desktop\malaga-offsite`

All the other commands below (`npm run dev`, `claude`, etc.) must be run **from inside** that folder.

## Install the Playwright browser

```bash
npx playwright install chromium
```

This downloads ~200 MB. Do it on home wifi, not on hotel wifi the morning of.

## Verify the starter runs

```bash
npm run dev
```

Open <http://localhost:5173> in your browser. You should see the **Pet Concierge** heading and a "Pet the dog" button. Stop the server with **Ctrl+C** (Windows) or **Cmd+C / Ctrl+C** (macOS).

Then run the test:

```bash
npm run test:bdd
```

Two scenarios should pass. If you see `2 scenarios (2 passed)`, you are done.

## Verify Claude Code works

```bash
claude
```

Ask: `summarize SPEC.md in three sentences`. Confirm it answers. Type `/exit` to leave.

---

## Post your checkmark

When all of the above works, post ✅ in the workshop Slack thread with one line:

- `✅ all green on macOS 14`
- `✅ all green on Windows 11`
- `❌ stuck on <step>, error: <paste>`

We will help in the thread. Please do not wait until the workshop morning.

## What to bring

- Your laptop with the above working.
- Power cable.
- Headphones if you like them while coding.
- An open mind about pet names.

See you in Malaga. 🐾
