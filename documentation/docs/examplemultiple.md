---
id: examplemultiple
title: Multiple Instance
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/multiple.html).
:::

## Primary Use Case

Tracking multiple DOM elements independently on a single page (e.g. tracking multiple ad slots, infinite scroll card feeds, or inline widgets). Each `Perceptor` instance maintains isolated configuration options and state calculations.

---

## Annotated Code Walkthrough

### 1. HTML Markup
Define multiple target containers (`#testDiv` and `#testDiv2`) placed at distinct DOM positions:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body { height: 2000px; padding: 20px; }
			#testDiv, #testDiv2 {
				width: 300px;
				height: 250px;
				color: #fff;
				padding: 20px;
				background: #6c63ff;
				margin-bottom: 400px;
			}
		</style>
	</head>
	<body>
		<div id="testDiv">First Element to Track</div>
		<div id="testDiv2">Second Element to Track</div>
	</body>
</html>
```

### 2. Multi-Instance Initialization

Instantiate a dedicated `Perceptor` instance for each target node:

```javascript
// Initialize first element tracker
var tracker1 = new Perceptor(document.querySelector('#testDiv')).watch();

// Initialize second element tracker
var tracker2 = new Perceptor(document.querySelector('#testDiv2')).watch();
```

---

## Expected Behavior & Interactivity

1. **Independent Evaluation**: Each instance measures its own DOM bounding box independently on every tick.
2. **Asynchronous Telemetry**: Scrolling down the page allows `#testDiv` to exit viewability while `#testDiv2` enters viewability; subscribers process each update separately without state collisions.
