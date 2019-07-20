---
id: perceptor
title: Perceptor
---

`Perceptor` is basic structure of this library which keeps track of DOM Element. It makes use of [Scheduler](schedulers.md), [Spectators](spectators.md) and [Subscribers](subscribers.md) to watch over an Element for its visibility. `Perceptor` class offers a set of configuration (both global and per instance) to work upon a DOM element. It provides mechanism to enable/disable visibility detection at runtime and also keeps a watch on `click` event on the element.

## Constructor

> constructor(DOMElement, options)

-   Params

    -   [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) - type: DOMElement, _mandatory_
    -   `options` - type: Object, _Optional_

    You can check `options` object in the [configuration](configuration.md) section.

-   Returns
    -   _Instance of Perceptor_

Usage:

```javascript
var advertisementDiv = new Perceptor(document.querySelector('#testdiv'));
```

## APIs

> watch()

This API will trigger the instance into watch mode. This is mandatory function to be called to start the instance for detecting viewability.

> unwatch()

This API will disable the Perceptor instance from detecting for viewability.

## Properties

> config : _Object_

The configuration that is applicable to current instance.

> element : _DOMElement_

The DOM Element under observation.

> event : _function_

Function that is triggered when `element` is clicked

> spectatorChain: _SpectatorManager_

Instance of _SpectatorManager_ for current instance

> subscriberChain: _SubscriberManager_

Instance of _SubscriberManager_ for current instance

> scheduler: _Scheduler_

Instance of _Scheduler_ for current instance
