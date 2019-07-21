---
id: exampleoffset
title: Configuration Example - Offset
---

Following example initialises Perceptor on `#testdiv2` elements to watch for visibility. There is header on the page that is sticky on top. To consider that for viewability, offset of `150` (px, header height) is passed in configuration. If the element is behind the header, it will be reported as non-visible.

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
			#header {
				height: 150px;
				width: 100%;
				background: black;
				position: sticky;
				top: 0;
				z-index: 10;
			}
		</style>
	</head>
	<body>
		<div id="header"></div>

		<div id="testDiv">
			Element Not Tracked (scroll down)
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

The following script will observe the `div#testdiv2` DOM Element

```html
<script>
	var t = new Perceptor(document.querySelector('#testDiv2'), {
		viewOffset: { top: 150 } // ideally should be part of global configuration since it is applicable to all elements of the page
	});
	t.watch();
</script>
```

Check the live version [here](/sample/offset)
