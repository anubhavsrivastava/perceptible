# Perceptible Testing Guide for Agents & Developers

This guide provides testing standards, patterns, and conventions for AI agents and human developers working on **Perceptible**.

---

## 1. Overview & Tech Stack

Perceptible uses **Jest** with the **JSDOM** test environment (`jest-environment-jsdom`) and Babel ES module transformations (`babel-jest`).

- **Test Runner**: Jest
- **Environment**: JSDOM (Simulated Browser DOM)
- **Transform**: Babel (ES6 Modules -> CommonJS)
- **Target Coverage**: >90% statement coverage

---

## 2. Test Commands

Run the following npm scripts from the root directory:

```bash
# Execute unit test suite
npm run test

# Execute unit tests in watch mode
npm run test:watch

# Generate code coverage report
npm run test:coverage
```

---

## 3. Test File Conventions & Location

All unit tests are located within `__tests__` directories co-located with the source code:

- `src/__tests__/index.test.js` - Main `Perceptor` engine class tests.
- `src/config/__tests/config.test.js` - Configuration merger and defaultConfig tests.
- `src/utils/__tests__/view.test.js` - DOM element bounding & viewport position math tests.
- `src/spectators/__tests__/spectators.test.js` - SpectatorManager and individual spectator tests.
- `src/subscribers/__tests__/subscribers.test.js` - SubscriberManager and default subscriber tests.
- `src/schedulers/__tests__/schedulers.test.js` - IntervalScheduler, base Scheduler, and visibility helper tests.

---

## 4. Key Testing Patterns & Mocking Strategies

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

## 5. Rules & Guidelines for AI Agents

When implementing or modifying code and writing tests:

1. **Never suppress tests**: Do not comment out failing assertions or delete test suites to force a build pass.
2. **Verify DOM Element validation**: Ensure every test creating a `Perceptor` instance passes a valid `Element` constructed via `document.createElement()`.
3. **Clean up DOM side effects**: Remove test DOM elements in `afterEach` or `afterAll` blocks.
4. **Mock console methods**: When testing `consoleSubscriber`, spy on `console.log` and clean it up using `.mockRestore()`.
5. **Run Verification Commands**: Always execute `npm run test` and `npm run test:coverage` to confirm all assertions pass cleanly before completing a task.
