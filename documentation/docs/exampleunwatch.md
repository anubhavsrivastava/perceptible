---
id: exampleunwatch
title: Perceptor - Watch/Unwatch
---

Following example initialises Perceptor on `#testdiv` elements to watch for visibility and unwatch-ed on click events. This demo dynamic enable/disable mode for Perceptor. This can be used for stopping the Perceptor after use.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body {
				height: 2000px;
				width: 2500px;
			}
			#testdiv {
				padding: 20px;
				width: 300px;
				height: 250px;
				background: #6c63ff;
				position: relative;
				left: 100px;
				top: 100px;
			}

			#output {
				padding: 10px;
				background-color: green;
				color: #fff;
				width: 150px;
				height: 30px;
				text-align: center;
			}

			.float {
				position: fixed;
				bottom: 0;
				right: 0;
			}
		</style>
	</head>
	<body style="height:2000px;">
		<div id="testdiv">
			Element to Track
		</div>
		<div id="output" class="float">
			Click here to toggle watch mode
		</div>
	</body>
</html>
```

The following script will observe the `div#testdiv` DOM Element

```html
<script>
	var outputContainer = document.getElementById('output');
	var watchMode = true;
	var tObserve = new Perceptor(document.querySelector('#testdiv'), { threshold: 50, defaultSubscriber: 'dom' });
	tObserve.watch();
	outputContainer.addEventListener('click', () => {
		if (watchMode) {
			outputContainer.style.background = 'red';
			tObserve.unwatch();
			watchMode = false;
		} else {
			outputContainer.style.background = 'green';
			tObserve.watch();
			watchMode = true;
		}
	});
</script>
```

Check the live version [here](/sample/unwatch)
