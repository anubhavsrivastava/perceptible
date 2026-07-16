---
id: exampleconfig
title: Configuration Example
---

:::tip Live Demo
Check out the interactive live version [here](pathname:///sample/multiconfig.html).
:::

## Primary Use Case

Combining site-wide global defaults (`Perceptor.defaults`) with granular per-instance overrides (e.g. setting a site-wide visibility threshold of 50%, while running high-frequency 500ms sampling on primary hero ads and low-frequency 1000ms sampling on footer widgets).

---

## Annotated Code Walkthrough

### 1. HTML Container Structure

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body { height: 2000px; padding: 20px; }
			#testDiv, #testDiv2 { width: 300px; height: 250px; background: #6c63ff; color: #fff; padding: 20px; margin-bottom: 400px; }
		</style>
	</head>
	<body>
		<div id="testDiv">Primary Tracked Banner</div>
		<div id="testDiv2">Secondary Tracked Footer Widget</div>
	</body>
</html>
```

### 2. JavaScript Hierarchy Configurations

Set site-wide global default options first, then instantiate instances with per-element settings:

```javascript
// 1. Global configuration override (applies 50% threshold to all instances)
Perceptor.defaults.threshold = 50;

// 2. High-frequency tracker (samples every 500ms)
var tracker1 = new Perceptor(document.querySelector('#testDiv'), {
  scheduler: { interval: 500 },
});
tracker1.watch();

// 3. Low-frequency tracker (samples every 1000ms)
var tracker2 = new Perceptor(document.querySelector('#testDiv2'), {
  scheduler: { interval: 1000 },
});
tracker2.watch();
```

---

## Expected Behavior & Interactivity

1. **Merged Evaluation**: Both `tracker1` and `tracker2` evaluate `isVisible: true` when at least **50%** of their surface area is visible (inherited from `Perceptor.defaults.threshold`).
2. **Frequency Variance**: `tracker1` updates its telemetry twice as frequently as `tracker2`, saving device CPU resources on non-critical elements.
