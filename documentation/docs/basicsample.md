---
id: basicsample
title: Basic Sample
---

## Simple Usage

Once the library is loaded on the browser, the library makes [`Perceptor`](perceptor.md) available globally. `Perceptor` instance is a dedicated object for an [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) under observation.

Consider the following HTML structure,

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- head section -->
	</head>
	<body>
		<div id="testdiv" style="color:#fff;background:#000;height:100px;width:100px;">
			Element to Track
		</div>
	</body>
</html>
```

The following script will observe the `div#testdiv` DOM Element

```html
<script>
	var tObserve = new Perceptor(document.querySelector('#testdiv')).watch();
</script>
```

You can ask Perceptor to stop watching by, (from above example)

```js
tObserve.unwatch();
```

Check the live version [here](/sample/basicExample)

## Other examples

You can check out complete set of examples with configuration [here](examplemain.md)
