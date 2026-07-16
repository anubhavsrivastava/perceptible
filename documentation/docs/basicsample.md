---
id: basicsample
title: Basic Sample
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/basicExample.html).
:::

Once the library script is included, `Perceptor` is available as a global constructor or ES module import. A `Perceptor` instance attaches to a target [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) to monitor its viewability rects relative to the browser viewport.

## HTML Structure Setup

Create a container element in your HTML page that will be observed:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Perceptible Quick Start</title>
		<style>
			body { height: 2000px; padding: 20px; }
			#testdiv {
				width: 200px;
				height: 200px;
				background-color: #6c63ff;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		</style>
	</head>
	<body>
		<div id="testdiv">
			Element to Track
		</div>

		<script src="path/to/dist/bundle.js"></script>
	</body>
</html>
```

## Step-by-Step Initialization

### 1. Create Perceptor Instance
Pass a DOM element reference to `new Perceptor()`:

```javascript
// Query target element
var targetElement = document.querySelector('#testdiv');

// Instantiate Perceptor
var perceptor = new Perceptor(targetElement);
```

### 2. Start Active Observation
Call `.watch()` to trigger the scheduler cycle:

```javascript
// Begin viewability evaluation loop
perceptor.watch();
```

### 3. Stop Observation & Clean Up
When the element is removed from the DOM or observation is no longer needed, call `.unwatch()` to stop scheduler timers and free resources:

```javascript
// Stop observation loop
perceptor.unwatch();
```

:::tip Quick Method Chaining
You can chain `.watch()` directly upon instantiation:
```javascript
var perceptor = new Perceptor(document.querySelector('#testdiv')).watch();
```
:::

## How Viewability Detection Works

1. **DOM Measurement**: The active spectator measures the target element's bounding rect against viewport boundaries.
2. **Threshold Check**: It calculates the visible percentage of the surface area.
3. **Subscriber Dispatch**: Subscribers (such as the default `dom` subscriber overlay) update to show real-time visibility telemetry.
