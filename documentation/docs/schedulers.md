---
id: schedulers
title: Scheduler
---

![Scheduler](/img/schedulers.png)

Schedulers trigger the `SpectatorManager` to execute visibility checks and collect metric data for each `Perceptor` instance. Schedulers can execute periodically or reactively based on user events.

In short, a scheduler is the engine driving element viewability evaluation over time.

:::info Availability Note
Currently, the **`interval`** mode is active and fully supported.
:::

## Page Visibility & Attention Mode

### Page Visibility API Integration
Page visibility is respected automatically by the scheduler. If the current browser tab is hidden or backgrounded, the scheduler pauses spectator execution cycles to save system resources.

### Attention Mode
Attention Mode is an additional feature that pauses the spectator execution cycle if the browser window loses focus (even if still visible on screen). This behavior can be controlled using the `attentionMode` configuration setting.

:::tip Media & Video Elements
If you are observing video, audio, or slideshow elements that should continue tracking even when the browser window loses active focus, set `attentionMode: false`.
:::

## Scheduler Modes

### `interval`
Triggers spectators periodically based on the configured millisecond duration (e.g. every 500ms).

### `raf`
Triggers spectators synchronized with browser render cycles via `requestAnimationFrame`.

### `scroll`
Triggers spectators reactively on user scroll, resize, or zoom events.

### `observer`
Uses standard web `IntersectionObserver` APIs to trigger evaluation cycles.
