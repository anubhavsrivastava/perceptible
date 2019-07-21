---
id: examplemultiple
title: Multiple Instance
---

Following example initialises Multiple Perceptor on `#testdiv` and `#testdiv2` elements to watch for visibility

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body {
				height: 2000px;
				width: 2500px;
			}
			#testDiv,
			#testDiv2 {
				width: 300px;
				height: 250px;
				color: #fff;
				padding: 20px;
				background: #6c63ff;
				position: relative;
				left: 100px;
				top: 100px;
			}
			#testDiv2 {
				left: 500px;
			}
		</style>
	</head>
	<body>
		<div id="testDiv">
			Element To Track
		</div>
		<div id="space" style="height:600px;">
			Other elements
		</div>
		<div id="testDiv2">
			Element To Track
		</div>
	</body>
</html>
```

The following script will observe the `div#testdiv` DOM Element

```html
<script>
	var t1 = new Perceptor(document.querySelector('#testDiv'));
	t1.watch();
	var t2 = new Perceptor(document.querySelector('#testDiv2'));
	t2.watch();
</script>
```

Check the live version [here](/sample/multiple)
