---
id: exampleunwatch
title: Perceptor - Watch/Unwatch
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/unwatch.html).
:::

## Primary Use Case

Dynamically starting and stopping visibility tracking at runtime (e.g. pausing tracking after an single-fire analytics impression event occurs or unmounting components in single-page applications).

---

## Annotated Code Walkthrough

### 1. HTML & Toggle Element Markup

Define the target element (`#testdiv`) and an interactive toggle button (`#output`):

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body { height: 2000px; padding: 20px; }
			#testdiv { width: 300px; height: 250px; background: #6c63ff; color: #fff; padding: 20px; }
			#output { position: fixed; bottom: 20px; right: 20px; padding: 10px; background-color: #10b981; color: #fff; cursor: pointer; }
		</style>
	</head>
	<body>
		<div id="testdiv">Element to Track</div>
		<div id="output">Click here to toggle watch mode</div>
	</body>
</html>
```

### 2. JavaScript Runtime Control

Toggle `.watch()` and `.unwatch()` state upon user interaction:

```javascript
var outputContainer = document.getElementById('output');
var isWatching = true;

// Initialize tracker
var tracker = new Perceptor(document.querySelector('#testdiv'), {
  threshold: 50,
  defaultSubscriber: 'dom',
});
tracker.watch();

// Attach toggle click listener
outputContainer.addEventListener('click', function () {
  if (isWatching) {
    outputContainer.style.background = '#ef4444'; // Red = Disabled
    outputContainer.textContent = 'Tracking Paused (Click to Resume)';
    tracker.unwatch(); // Stop observation timers
    isWatching = false;
  } else {
    outputContainer.style.background = '#10b981'; // Green = Active
    outputContainer.textContent = 'Tracking Active (Click to Pause)';
    tracker.watch(); // Resume observation timers
    isWatching = true;
  }
});
```

---

## Expected Behavior & Interactivity

1. **Active State**: In active mode, the bottom-left HUD updates surface calculations dynamically during scrolling.
2. **Paused State**: Clicking the toggle bar invokes `.unwatch()`, freezing the HUD overlay and halting evaluation timers until `.watch()` is called again.
