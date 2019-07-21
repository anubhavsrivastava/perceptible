---
id: exampleclick
title: Configuration Example - Click Handler
---

Following example initialises Perceptor on `#testdiv` elements to watch for visibility. Additionally, `clickHandler` option is used.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body {
				height: 2000px;
				width: 2500px;
			}
			#testDiv {
				width: 300px;
				height: 250px;
				color: #fff;
				padding: 20px;
				background: #6c63ff;
				position: relative;
				left: 100px;
				top: 100px;
			}
		</style>
	</head>
	<body>
		<div id="testDiv">
			Element To Track

			<br />
			<span> click count </span>
			<span id="count">0 </span>
		</div>
	</body>
</html>
```

The following script will observe the `div#testdiv` DOM Element

```html
<script>
	var clickCount = 0;
	var t1 = new Perceptor(document.querySelector('#testDiv'), {
		clickHandler: function(e, f) {
			clickCount++;
			document.getElementById('count').innerText = clickCount;
		}
	});
	t1.watch();
</script>
```

Check the live version [here](/sample/clicktrack)
