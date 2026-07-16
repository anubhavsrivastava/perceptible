---
id: perceptor
title: Perceptor
---

`Perceptor` is the core class of this library that tracks visibility of target DOM elements. It coordinates a [Scheduler](schedulers.md), a chain of [Spectators](spectators.md), and [Subscribers](subscribers.md) to evaluate element viewability.

`Perceptor` offers configurable parameters (both global and per instance), runtime control over visibility monitoring via `watch()` and `unwatch()`, and native `click` event handling.

## Constructor

```javascript
new Perceptor(DOMElement, [options])
```

- **`DOMElement`** (`Element`): Mandatory [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) to observe.
- **`options`** (`Object`): Optional configuration overrides. See the [Configuration](configuration.md) page for details.

### Usage Example

```javascript
var perceptorInstance = new Perceptor(document.querySelector('#testdiv'));
perceptorInstance.watch();
```

## Instance Methods

### `watch()`

Triggers active observation mode. Must be called to start detecting viewability changes.

### `unwatch()`

Disables active observation for this instance.

## Instance Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `config` | `Object` | Configuration options applicable to this instance. |
| `element` | `Element` | The target DOM Element under observation. |
| `event` | `Function` | Callback executed when `element` is clicked. |
| `spectatorChain` | `SpectatorManager` | `SpectatorManager` instance controlling spectator execution. |
| `subscriberChain` | `SubscriberManager` | `SubscriberManager` instance handling notifications. |
| `scheduler` | `Scheduler` | Active `Scheduler` engine triggering evaluation cycles. |
