---
id: exampleclick
title: Configuration Example - Click Handler
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/clicktrack.html).
:::

## Primary Use Case

Capturing element interaction events (such as ad clicks, banner taps, or card CTA interactions) directly within the `Perceptor` instance context.

---

## Annotated Code Walkthrough

### 1. HTML Markup with Counter Display

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body { height: 2000px; padding: 20px; }
			#testDiv { width: 300px; height: 250px; background: #6c63ff; color: #fff; padding: 20px; cursor: pointer; }
		</style>
	</head>
	<body>
		<div id="testDiv">
			Interactive Banner (Click to test handler)
			<br /><br />
			Total Clicks: <span id="count">0</span>
		</div>
	</body>
</html>
```

### 2. Click Handler Configuration

Pass `clickHandler` in `options` to respond to user clicks on the observed element:

```javascript
var clickCount = 0;
var countDisplay = document.getElementById('count');

var tracker = new Perceptor(document.querySelector('#testDiv'), {
  clickHandler: function (event, perceptorInstance) {
    clickCount++;
    countDisplay.textContent = clickCount;
    console.log('Banner clicked!', { event: event, instance: perceptorInstance });
  },
});

tracker.watch();
```

---

## Expected Behavior & Interactivity

1. **Integrated Tracking**: `Perceptor` attaches a event listener to `#testDiv` upon `.watch()`.
2. **State Sync**: Clicking anywhere inside `#testDiv` fires the `clickHandler` callback, updating the click counter display and logging click telemetry.
