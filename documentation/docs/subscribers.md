---
id: subscribers
title: Subscribers
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/customSubscriber.html).
:::

![Subscribers](/img/subscribers.png)

`Subscribers` consume the computed `SpectatorResult` generated at the end of each evaluation cycle tick. They are used for displaying UI debug overlays, triggering state updates, or pushing viewability analytics events to third-party monitoring platforms.

---

## Built-in Subscribers

Perceptible ships with two built-in UI/debug subscribers:

### 1. `domSubscriber` (`defaultSubscriber: 'dom'`)
Renders a live HUD (heads-up display) overlay in the bottom-left corner of the browser window showing active visibility percentages, surface measurements, and execution timing.

![DOMsubscriber](/img/domsubscriber.png)

### 2. `consoleSubscriber` (`defaultSubscriber: 'console'`)
Logs `SpectatorResult` objects continuously to the browser developer console.

![ConsoleSubscriber](/img/consolesubscriber.png)

---

## Custom Subscriber Signature

Custom subscriber functions accept two parameters:

```typescript
type SubscriberFunction = (
  perceptor: PerceptorInstance,
  spectatorResult: SpectatorResult
) => void;
```

---

## Production Integration Recipes

### Recipe 1: Custom UI Status Indicator
Dynamically style an element based on surface coverage thresholds:

```javascript
var statusBadge = document.getElementById('status-badge');

function uiColorSubscriber(perceptor, result) {
  var surface = result.subView ? result.subView.surface : 0;

  if (surface < 20) {
    statusBadge.style.background = '#ef4444'; // Red (< 20%)
  } else if (surface < 50) {
    statusBadge.style.background = '#f59e0b'; // Amber (20% - 50%)
  } else {
    statusBadge.style.background = '#10b981'; // Green (> 50%)
  }
}

var tracker = new Perceptor(document.querySelector('#target'), {
  defaultSubscriber: 'none',
  subscribers: [uiColorSubscriber],
});
tracker.watch();
```

### Recipe 2: Google Analytics 4 (GA4) Impression Dispatcher
Trigger a GA4 `ad_impression` or `view_item` event when an element reaches 100% viewability duration:

```javascript
var gaFired = false;

function ga4ImpressionSubscriber(perceptor, result) {
  // Fire event once per pageview when element remains visible for over 1 second (1000ms)
  if (!gaFired && result.isVisible && result.duration >= 1000) {
    gaFired = true;

    if (typeof gtag === 'function') {
      gtag('event', 'ad_impression', {
        element_id: result.element.id,
        visible_duration: result.duration,
      });
    }
  }
}

var adTracker = new Perceptor(document.querySelector('#banner'), {
  subscribers: [ga4ImpressionSubscriber],
});
adTracker.watch();
```
