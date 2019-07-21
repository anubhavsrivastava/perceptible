---
id: examplemain
title: Basic Example
---

Following example initialises Perceptor on `#testdiv` element to watch for visibility

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
