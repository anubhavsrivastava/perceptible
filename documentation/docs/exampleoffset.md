---
id: exampleoffset
title: Configuration Example - Offset
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/offset.html).
:::

## Primary Use Case

Accurately computing element viewability on web pages containing fixed floating headers, sticky navbars, or fixed sidebars. Without view offsets, elements positioned underneath a sticky header would be falsely marked as visible even though they are visually covered.

---

## Annotated Code Walkthrough

### 1. Sticky Navigation Layout Setup

Define a fixed/sticky header (`#header`, height: `150px`) alongside content sections:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body { height: 2000px; padding: 0; margin: 0; }
			#header {
				height: 150px;
				width: 100%;
				background: #111827;
				position: sticky;
				top: 0;
				z-index: 100;
				color: #fff;
				padding: 20px;
			}
			#testDiv2 {
				width: 300px;
				height: 250px;
				background: #6c63ff;
				color: #fff;
				padding: 20px;
				margin-top: 100px;
			}
		</style>
	</head>
	<body>
		<div id="header">Fixed Navigation Header (Height: 150px)</div>
		<div id="testDiv2">Target Element Under Observation</div>
	</body>
</html>
```

### 2. Viewport Offset Configuration

Specify `viewOffset.top: 150` to shrink the effective top edge of the evaluation viewport by 150 pixels:

```javascript
// Initialize Perceptor with top offset compensation
var tracker = new Perceptor(document.querySelector('#testDiv2'), {
  viewOffset: {
    top: 150, // Subtract top 150px of viewport covered by fixed header
  },
});

tracker.watch();
```

---

## Expected Behavior & Interactivity

1. **Occlusion Handling**: When scrolling `#testDiv2` upwards, as soon as it passes under the `150px` sticky header region, the spectator automatically recalculates surface viewability and marks `isVisible: false`.
2. **Accurate Tracking**: Eliminates false-positive viewability events caused by sticky page elements.
