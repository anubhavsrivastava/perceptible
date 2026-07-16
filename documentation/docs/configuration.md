---
id: configuration
title: Configuration
---

## Quick Reference

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `threshold` | `number` | `100` | Minimum surface area percentage for element visibility. |
| `scheduler.mode` | `string` | `'interval'` | Execution mode (`'interval'`, `'scroll'`, `'raf'`, `'observer'`). |
| `scheduler.interval` | `number` | `500` | Interval timing in milliseconds for `'interval'` mode. |
| `scheduler.attentionMode` | `boolean` | `true` | Pause observation cycles when window loses focus. |
| `viewOffset` | `object` | `{top: 0, left: 0, right: 0, bottom: 0}` | Viewport offsets (in px) to adjust visibility boundary edges. |
| `subscribers` | `Array<Function>` | `[]` | Additional subscriber functions notified per cycle. |
| `spectators` | `Array<Function>` | `[]` | Additional spectator calculation functions in the chain. |
| `clickHandler` | `Function` | `() => {}` | Callback triggered when the observed element is clicked. |
| `defaultSubscriber` | `string` | `'dom'` | Default UI output subscriber (`'dom'`, `'console'`, `'none'`). |

## threshold

`type: number`

`default: 100`

This denotes the threshold (in percentage) of surface area that an Element is considered to be visible.
For instance:

- **a.** If threshold is 100, & if 100% of the Element is visible, it will be considered as visible.
- **b.** If threshold is 20, & percentage element visibility > 20, it will be considered as visible.

## scheduler

`type: object`

The configurations below apply to the scheduler. Currently, the `interval` mode is supported.

### mode

`type: string`

`default: 'interval'`

`possible values: interval, scroll, raf, observer`

Mode decides what type of scheduler is used. The scheduler is the mechanism by which element viewability is calculated at regular intervals, events, or user activity.

- `interval` - Triggers spectators after every `n` ms (specified in `interval` option).
- `raf` - Triggers spectators using the browser's `requestAnimationFrame` cycles.
- `scroll` - Triggers spectators on user events such as `scroll`, `resize`, or `zoom`.
- `observer` - Uses standard Observer APIs to trigger spectators.

### interval

`type: number (time in ms)`

`default: 500`

The frequency (in ms) with which the `interval` scheduler triggers spectators. A value of 500 means viewability is computed every 500ms.

### attentionMode

`type: boolean`

`default: true`

Pauses observation cycles when the browser window loses focus (even if partially visible on screen). Disable this mode for media/slideshow elements that should remain active without tab focus.

## viewOffset

`type: object`

By default, element visibility is relative to the browser viewport. `viewOffset` narrows the effective viewport boundary from each edge. This is useful for pages with fixed headers, sticky footers, or sidebars.

### top

`type: number (in px)`

`default: 0`

The top offset of the viewport in pixels.

### left

`type: number (in px)`

`default: 0`

The left offset of the viewport in pixels.

### right

`type: number (in px)`

`default: 0`

The right offset of the viewport in pixels.

### bottom

`type: number (in px)`

`default: 0`

The bottom offset of the viewport in pixels.

## subscribers

`type: Array<Function>`

`default: []`

Additional subscribers added to the `subscriberChain` for this instance. Each subscriber function is invoked by the scheduler with the result of the `SpectatorChain`.

## spectators

`type: Array<Function>`

`default: []`

Additional custom spectators added to the `spectatorChain`. Custom spectators can augment or override properties (e.g. `isVisible`) on the `SpectatorResult`.

## clickHandler

`type: Function`

`default: () => {}`

Callback function invoked with the `Perceptor` instance context on `click` events over the observed DOM element.

## defaultSubscriber

`type: string`

`default: 'dom'`

`possible values: dom, console, none`

The default subscriber output style. Can be disabled by setting `defaultSubscriber: 'none'` when supplying custom subscribers.

---

## Production Recipes & Presets

### 1. Ad Viewability Preset (MRC Standard)
The Media Rating Council (MRC) defines ad viewability as at least 50% of the advertisement's pixels being visible on viewport for at least 1 continuous second.

```javascript
// Configure Perceptor for MRC Ad Viewability compliance
var adTracker = new Perceptor(document.querySelector('#banner-ad'), {
  threshold: 50, // Require 50% surface visibility
  defaultSubscriber: 'none',
  scheduler: {
    mode: 'interval',
    interval: 200, // Frequent checks every 200ms
    attentionMode: true, // Pause tracking when window focus is lost
  },
  subscribers: [
    function (perceptor, result) {
      if (result.isVisible) {
        console.log('Ad meets 50% viewability criteria', result);
      }
    },
  ],
});

adTracker.watch();
```

### 2. Fixed Sticky Header Offset Compensation
When a site features a `60px` sticky top header, elements scrolling under the header are visually occluded. Adjust `viewOffset.top` so occluded elements are recognized as hidden:

```javascript
var contentCardTracker = new Perceptor(document.querySelector('#article-card'), {
  viewOffset: {
    top: 60, // Exclude top 60px covered by sticky header
  },
});

contentCardTracker.watch();
```
