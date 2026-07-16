---
id: examplespectator
title: Custom Spectator
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/customSpectator.html).
:::

## Primary Use Case

Writing domain-specific spectator functions that extend or override viewport metrics (e.g. forced visibility for Picture-in-Picture float players, canvas widgets, or iframe overlays).

---

## Annotated Code Walkthrough

### 1. Nesting Floating Widgets in Markup

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body { height: 2000px; padding: 20px; }
			#testdiv { width: 300px; height: 250px; background: #6c63ff; color: #fff; padding: 20px; }
			#testcontainer { padding: 10px; background: #8b5cf6; cursor: pointer; margin-top: 10px; }
			.float { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
		</style>
	</head>
	<body>
		<div id="testdiv">
			Element to Track
			<div id="testcontainer">Click to toggle float mode</div>
		</div>
	</body>
</html>
```

### 2. Custom Spectator Function Logic

Inject spectator logic into the `spectators` evaluation pipeline:

```javascript
var subContainer = document.getElementById('testcontainer');

// Toggle floating class on container click
subContainer.addEventListener('click', function () {
  this.classList.toggle('float');
});

// Custom Spectator function
function floatingWidgetSpectator(perceptorInstance, currentResult, previousRunResult) {
  // If inner element has floating layout, force isVisible: true
  if (subContainer && subContainer.classList.contains('float')) {
    currentResult.isVisible = true;
    currentResult.isFloated = true;
  }
}

// Pass custom spectator to Perceptor options
var tracker = new Perceptor(document.querySelector('#testdiv'), {
  spectators: [floatingWidgetSpectator],
});

tracker.watch();
```

---

## Expected Behavior & Interactivity

1. **Standard Viewport Calculation**: Initially, scrolling `#testdiv` out of view causes `isVisible` to evaluate to `false`.
2. **Override Mechanism**: Clicking `#testcontainer` toggles `.float`, fixing it to the viewport corner. The custom spectator detects `.float` and forces `isVisible: true` regardless of scroll position.
