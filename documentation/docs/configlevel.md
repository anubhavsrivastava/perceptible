---
id: configlevel
title: Configuration Hierarchy
---

Configuration for `Perceptor` can be defined either at the per-instance level or globally for all instances.

See the complete list of available options on the [Configuration](configuration.md) reference page.

## Instance Configuration

Instance-level configuration is provided when instantiating `Perceptor` via the constructor options:

```javascript
var tObserve = new Perceptor(document.querySelector('#testdiv'), { threshold: 80 }).watch();
```

## Global Configuration

Global configurations are set using the `Perceptor.defaults` object. Global settings apply to all current and future `Perceptor` instances:

```javascript
Perceptor.defaults.threshold = 80;
```

## Configuration Hierarchy

Perceptor resolves configuration values using the following priority order (highest to lowest precedence):

1. **Instance Configuration** (passed to constructor)
2. **Global Configuration** (`Perceptor.defaults`)
3. **Library Defaults** (see [Default Configurations](configuration.md))

## Merging Logic

Configuration options are replaced directly according to the hierarchy order, **except** for `subscribers` and `spectators`.

`subscribers` and `spectators` arrays are concatenated across levels. For example, if a global spectator `A1` exists and an instance spectator `A2` is provided, the resulting chain will execute `[A1, A2]`.
