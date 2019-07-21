---
id: examplesubscribers
title: Custom Subscriber
---

Following example initialises Multiple Perceptor on `#testdiv`.
A subscriber displays the visibility in terms of colors. 'Red' for visibility less than 20%, 'Orange' for less than 50% and 'Green' for more than 50%

Consider the following HTML structure,

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
			Visibility Indicator (scroll to check)
		</div>
	</body>
</html>
```

```html
<script>
	var outputContainer = document.getElementById('output');

	var customSubscriber = function(pContext, result) {
		var surface = result.subView.surface || 0;
		if (surface < 20) {
			outputContainer.style.background = 'red';
		} else if (surface > 20 && surface < 50) {
			outputContainer.style.background = 'orange';
		} else if (surface > 50) {
			outputContainer.style.background = 'green';
		}
	};
	var tObserve = new Perceptor(document.querySelector('#testdiv'), { threshold: 50, defaultSubscriber: 'none', subscribers: [customSubscriber] });
	tObserve.watch();
</script>
```

Check the live version [here](/sample/customSubscriber)
