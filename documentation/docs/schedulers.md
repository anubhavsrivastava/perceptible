---
id: schedulers
title: Scheduler
---

![Scheduler](/img/schedulers.png)

Scheduler trigger the `SpecatorManager` to start for collection of visibility data (or additional data) of the Perceptor Instance. Scheduler may run over after regular interval or based on events.

In short, scheduler is mechanism by which viewability of element is calculated at regular interval/event/user activity.

**_NOTE_ : currently only 'interval' mode is available**

## Page Visibility / Attention Mode

Page Visibility is considered by Scheduler while triggering spectators. If current tab of the browser is switched over or given webpage is in the background and thus not visible to the user. In such cases, scheduler do not trigger spectator cycle.

Attention Mode, is additional behavior, where in the scheduler do not trigger the spectator cycle if the window (though visibile on to user) has lost its focus. This behavior is configurable via `AttentionMode` setting.

## Default Scheduler Mode

### `interval`

In this mode, the scheduler will trigger the spectators after every 'n' ms (specified in `interval` option)

### `raf`

In this mode, the scheduler will trigger the spectators by using `requestAnimationFrame` cycles of the browser.

### `scroll`

In this mode, the scheduler will trigger the spectators only if there is user event in form of 'scroll', 'resize', 'zoom'

### `observer`

In this mode, `Observer API` are used to trigger the spectators.
