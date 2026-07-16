---
id: examplemain
title: Basic Example
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/basicExample.html).
:::

## Primary Use Case

This example demonstrates the minimal setup required to observe a single target DOM element on a webpage. Use this baseline implementation to quickly verify element viewability tracking.

---

## Annotated Code Walkthrough

### 1. HTML Container
Define the target element (`#testdiv`) within your document markup:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Perceptible Basic Demonstration</title>
	</head>
	<body>
		<div id="testdiv" style="color:#fff; background:#6c63ff; height:100px; width:100px; margin: 20px;">
			Element to Track
		</div>

		<script src="path/to/dist/bundle.js"></script>
	</body>
</html>
```

### 2. JavaScript Initialization & Teardown

Attach `Perceptor` to the target element and begin tracking:

```javascript
// Query DOM element reference
var targetNode = document.querySelector('#testdiv');

// Instantiate Perceptor and begin polling cycles
var observer = new Perceptor(targetNode).watch();

// To halt observation cycle at runtime:
// observer.unwatch();
```

---

## Expected Behavior & Interactivity

1. **Overlay Display**: Upon calling `.watch()`, the default `dom` subscriber renders a HUD in the bottom-left corner showing element dimensions and visibility percentage.
2. **Scroll Response**: As you scroll `#testdiv` into or out of view, the HUD surface calculation updates dynamically in real time.
