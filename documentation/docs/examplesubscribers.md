---
id: examplesubscribers
title: Custom Subscriber
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/customSubscriber.html).
:::

## Primary Use Case

Writing custom subscribers to consume `SpectatorResult` data and update external UI status indicators, trigger state changes, or emit analytics beacons.

---

## Annotated Code Walkthrough

### 1. Target Element & Indicator Bar Setup

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body { height: 2000px; padding: 20px; }
			#testdiv { width: 300px; height: 250px; background: #6c63ff; color: #fff; padding: 20px; }
			#output { position: fixed; bottom: 20px; right: 20px; padding: 10px; color: #fff; text-align: center; border-radius: 6px; }
		</style>
	</head>
	<body>
		<div id="testdiv">Element to Track</div>
		<div id="output">Visibility Indicator (scroll to test)</div>
	</body>
</html>
```

### 2. Custom Subscriber Implementation

Register a custom subscriber callback in the `subscribers` options array and disable default UI overlays (`defaultSubscriber: 'none'`):

```javascript
var outputContainer = document.getElementById('output');

// Custom subscriber receiving perceptor context and spectator result
function customColorSubscriber(perceptorInstance, spectatorResult) {
  var surfaceCoverage = spectatorResult.subView ? spectatorResult.subView.surface : 0;

  if (surfaceCoverage < 20) {
    outputContainer.style.background = '#ef4444'; // Red (< 20% visible)
    outputContainer.textContent = 'Visibility: Low (< 20%)';
  } else if (surfaceCoverage >= 20 && surfaceCoverage < 50) {
    outputContainer.style.background = '#f59e0b'; // Amber (20% - 50% visible)
    outputContainer.textContent = 'Visibility: Medium (20-50%)';
  } else {
    outputContainer.style.background = '#10b981'; // Green (> 50% visible)
    outputContainer.textContent = 'Visibility: High (> 50%)';
  }
}

// Instantiate Perceptor with custom subscriber
var tracker = new Perceptor(document.querySelector('#testdiv'), {
  threshold: 50,
  defaultSubscriber: 'none', // Suppress default overlay
  subscribers: [customColorSubscriber],
});

tracker.watch();
```

---

## Expected Behavior & Interactivity

1. **Dynamic Surface Calculation**: As you scroll `#testdiv` across viewport boundaries, `customColorSubscriber` evaluates surface coverage percentages.
2. **Real-time Color Switching**: The fixed status bar dynamically switches between **Red** (< 20%), **Amber** (20%-50%), and **Green** (> 50%).
