import { After, Before, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, type Browser, type Page } from '@playwright/test';
import { spawn, type ChildProcess } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';

setDefaultTimeout(60_000);

let browser: Browser;
let page: Page;
let viteProcess: ChildProcess | undefined;

const APP_URL = 'http://localhost:5173';
const HEADLESS = process.env.HEADLESS === 'true';
const SLOWMO_MS = Number(process.env.SLOWMO_MS ?? (HEADLESS ? 0 : 1000));

async function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not ready
    }
    await wait(250);
  }
  throw new Error(`Server at ${url} did not start within ${timeoutMs}ms`);
}

Before(async () => {
  const alreadyRunning = await fetch(APP_URL)
    .then((r) => r.ok)
    .catch(() => false);

  if (!alreadyRunning) {
    viteProcess = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1'], {
      stdio: 'ignore',
      detached: false,
    });
    await waitForServer(APP_URL);
  }

  browser = await chromium.launch({ headless: HEADLESS, slowMo: SLOWMO_MS });
  page = await browser.newPage();
});

After(async () => {
  await browser?.close();
  if (viteProcess && !viteProcess.killed) {
    viteProcess.kill('SIGTERM');
  }
});

When('I open the app', async () => {
  await page.goto(APP_URL);
});

Given('I have opened the app', async () => {
  await page.goto(APP_URL);
});

Then('I see the heading {string}', async (heading: string) => {
  await page.getByRole('heading', { name: heading }).waitFor();
});

When('I pet the dog {int} times', async (times: number) => {
  const button = page.getByRole('button', { name: 'Pet the dog' });
  for (let i = 0; i < times; i += 1) {
    await button.click();
  }
});

Then('the pet count shows {int}', async (expected: number) => {
  await page.getByTestId('pet-count').filter({ hasText: String(expected) }).waitFor();
});
