---
id: architecture
title: Overall Architecture
---

![Architecture](/img/architecture.png)

## PerceptorInstance

Each DOM Element that has to be observed for visibility has a corresponding Perceptor Instance. This instance holds element related data, configuration that are applicable to the instance and related Scheduler, Subscriber and Spectators. Once the instance is available, it can be ordered to keep visibility track (`watch()`) or stop watching for visibility(`unwatch()`).

### watch

`watch()` API in each Perceptor instance triggers the scheduler to start watching for visibility changes.

### unwatch

`unwatch()` API in each Perceptor instance asks the scheduler to stop watching for visibility changes.

Check the live version [here](/sample/unwatch)

## Scheduler

Once the `watch()` method is called, scheduler trigger SpectatorChain via SpectatorManager. Scheduler also takes care of PageVisibility and focus/blur of the browser window. Scheduler could be one of `interval`, `raf`, `observer` or `scroll`. See the [scheduler](schedulers.md) section for more details.

## SpectatorManager

SpectatorManages executes Spectator function in sequence to produce SpectatorResult, which is combined info from multiple Spectators about visibility/viewability of DOM element. It also tracks SpectatorResult of previous execution.

See the [Spectator](spectators.md) section for more details.

## Subscriber

Subscriber functions are consumers of SpectatorResult. Subscribers can be used to report the result to external domain or show on site itself or used for one time lazy loading, etc. Basically, interpretation of SpectatorResult is done via Subscribers.

See the [Subscribers](subscribers.md) section for more details.
