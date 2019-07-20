---
id: configlevel
title: Configuration Hierarchy
---

Configuration for Perceptor can be done either on per instance level or at global level that is applicable to all Perceptor instance.

Complete set of configuration options can be seen [here](configuration.md)

## Instance Configuration

Instance level configuration can be changed at the time of instance creation, using `options` param in the Perceptor constructor.

Example

```js
var tObserve = new Perceptor(document.querySelector('#testdiv'), { threshold: 80 }).watch();
```

## Global Configuration

Global configurations can be changed via `Perceptor.defaults` object. This settings are applied to all Perceptor instance.

Example

```js
Perceptor.defaults.threshold = 80;
```

## Hierarchy

Preference order of configuration is as follows (most preferred to least)

-   Instance level
-   Global Level
-   Default config (check [default configurations](configuration.md))

## Merge Criterion

All configuration fields are over-written by order of hierarchy except
`subscribers` and `spectators`. Both this fields are joined with previous configuration. For example, if global configuration a spectator function - A1 is present and at instance a spectator function A2 is passed, it will result into [A1, A2]
