# Perceptible Testing Guide for Agents & Developers

This guide provides testing standards, patterns, and conventions for AI agents and human developers working on **Perceptible**.

---

## 1. Overview & Tech Stack

Perceptible uses **Jest** with the **JSDOM** test environment (`jest-environment-jsdom`) for unit testing, and **Puppeteer** for automated browser end-to-end (E2E) visual and interaction testing in real Chromium contexts.

- **Unit Test Runner**: Jest (JSDOM Environment)
- **Browser E2E Runner**: Jest + Puppeteer (Headless Chromium)
- **Transform**: Babel (ES6 Modules -> CommonJS)
- **Target Coverage**: >90% statement coverage

---

## 2. Test Commands

Run the following npm scripts from the root directory:

```bash
# Execute unit test suite (JSDOM)
npm run test

# Execute unit tests in watch mode
npm run test:watch

# Generate code coverage report
npm run test:coverage

# Execute automated browser tests (Puppeteer / Chromium)
npm run test:e2e
```

---

## 3. Test File Conventions & Location

- **Unit Tests**: Co-located within `__tests__` subdirectories in `src/`:
  - `src/__tests__/index.test.js` - Main `Perceptor` engine class tests.
  - `src/config/__tests/config.test.js` - Configuration merger and defaultConfig tests.
  - `src/utils/__tests__/view.test.js` - DOM element bounding & viewport position math tests.
  - `src/spectators/__tests__/spectators.test.js` - SpectatorManager and spectator logic tests.
  - `src/subscribers/__tests__/subscribers.test.js` - SubscriberManager and subscriber tests.
  - `src/schedulers/__tests__/schedulers.test.js` - IntervalScheduler & Page Visibility tests.

- **Browser E2E Tests**: Located in `e2e/`:
  - `e2e/browser.test.js` - Puppeteer browser integration tests running in real Chromium windows.

---

## 4. Key Unit Testing Patterns & Mocking Strategies

### 4.1 Mocking DOM Geometry & Viewport Dimensions

JSDOM does not calculate layout dimensions. Always mock `getBoundingClientRect()` and `document.documentElement` properties:

```js
// Viewport resolution mock
Object.defineProperty(document.documentElement, 'clientHeight', { value: 1000, writable: true, configurable: true });
Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, writable: true, configurable: true });

// Element position mock
element.getBoundingClientRect = () => ({
    left: 100,
    top: 100,
    width: 200,
    height: 200,
    right: 300,
    bottom: 300
});
```

### 4.2 Handling Asynchronous Timers with Jest Fake Timers

Interval schedulers (`IntervalScheduler`) rely on `setInterval`. Use Jest fake timers to test ticks deterministically without real-time delay:

```js
beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

test('scheduler tick', () => {
    const scheduler = new IntervalScheduler(/* ... */);
    jest.advanceTimersByTime(500); // Advance timer by 500ms
    expect(spectatorSpy).toHaveBeenCalledTimes(1);
    scheduler.clearSchedule();
});
```

### 4.3 Mocking Page Visibility and Focus Events

To simulate browser tab switches and window blur/focus events for `attentionMode`:

```js
// Toggle page hidden state
Object.defineProperty(document, 'hidden', { value: true, writable: true, configurable: true });
document.dispatchEvent(new Event('visibilitychange'));

// Toggle window focus/blur
window.dispatchEvent(new Event('blur'));
window.dispatchEvent(new Event('focus'));
```

---

## 5. Automated Browser Testing with Puppeteer

Browser E2E tests validate real browser engine behavior, CSS box rendering, viewport scroll intersection, dynamic `#dreporter` UI injection, and event dispatching.

### 5.1 Structure of a Puppeteer Test File

Add `/** @jest-environment node */` docblock at the top of Puppeteer test files so Jest runs them in Node.js instead of JSDOM:

```js
/**
 * @jest-environment node
 */

import path from 'path';
import puppeteer from 'puppeteer';

describe('Browser E2E Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }, 30000);

    afterAll(async () => {
        if (browser) await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.setViewport({ width: 1024, height: 768 });
    });

    afterEach(async () => {
        if (page) await page.close();
    });

    test('should track viewport scrolling in real Chromium', async () => {
        const samplePath = path.resolve(__dirname, '../sample/basicExample.html');
        await page.goto(`file://${samplePath}`, { waitUntil: 'load' });

        // Evaluate browser page context
        const exists = await page.evaluate(() => typeof window.Perceptor === 'function');
        expect(exists).toBe(true);

        // Perform scroll in real browser window
        await page.evaluate(() => window.scrollTo(0, 1000));

        // Wait for scheduler interval tick
        await new Promise(r => setTimeout(r, 600));

        const text = await page.evaluate(() => document.getElementById('dreporter').innerText);
        expect(text).toContain('"isVisible": false');
    });
});
```

---

## 6. Guidelines & Rules for AI Agents

When implementing features or modifying tests:

1. **Keep Unit & E2E Tests Distinct**: Unit tests live in `src/**/__tests__` (JSDOM environment). E2E browser tests live in `e2e/` (`node` environment with Puppeteer).
2. **Always rebuild bundles before E2E tests**: Puppeteer loads compiled JavaScript from `dist/bundle.js`. Run `npm run build` prior to running `npm run test:e2e`.
3. **Handle Puppeteer lifecycle safely**: Ensure `browser.close()` and `page.close()` are called in `afterAll`/`afterEach` blocks to prevent dangling browser processes.
4. **Never suppress tests**: Do not comment out failing assertions or delete test suites to force a build pass.
5. **Execute full verification**: Run `npm run test:coverage && npm run test:e2e && npm run lint` to guarantee complete validation before finishing.
