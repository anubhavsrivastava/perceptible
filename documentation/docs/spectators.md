---
id: spectators
title: Spectators
---

![Spectator](/img/spectator.png)

## Functioning

Spectators are chain of function that are executed with `currentResult` object. Each Spectator in the chain adds relevant data to currentResult so that sufficient information about viewability/visibility of DOM Element can be interpreted. Each Spectator is called with `(PerceptorContext, currentResult, previosRunResult)`, based on this information, spectators can add relevant info.

> SpectatorFunction<PerceptorContext, currentResult, previosRunResult> : currentResult

## DefaultSpectators

There is set of default Spectators that always run to detect the visibility of Perceptor

### timeSpectator

`Output: { time: <current execution time in ticks>}`

`timeSpectator` adds 'time' property in current SpectatorResult.

### elementSpectator

`Output: { element: { id, tagName}}`

`elementSpectator` adds current perceptor element property in current SpectatorResult.

### viewPortSpectator

`Output: { isVisible: true/false, subView: {left, right, top, bottom, surface}`

`viewPortSpectator` adds `isVisible` property based on `subView.surface` visibility. `subView` hold information about current dimensions of Perceptor element that is currently viewable in current viewPort.

### durationSpectator

`Output: { duration: <time in ms> }`

`durationSpectator` adds overall `duration` for which the Perceptor was visible

### Combined Response

Sample combined response (spectatorResult) of default Spectator

```json
{
	"time": 1563705784762,
	"element": {
		"id": "testdiv",
		"tagName": "DIV"
	},
	"isVisible": true,
	"subView": {
		"left": 108,
		"right": 448,
		"top": 108,
		"bottom": 398,
		"surface": 100
	},
	"duration": 30000
}
```

## Custom Spectator

You can add custom Spectator using `spectators` option in configuration. Each function is called with PerceptContext, currentResult, and previousResult. Your custom Spectator can add any information or update information in `currentResult`, subsequently after all spectators have been run. The combined result would be available to subscribers

### Example

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

			#testcontainer {
				padding: 10px;
				color: #fff;
				width: 100px;
				height: 50px;
				background: #900099;
			}

			.float {
				position: fixed;
				bottom: 200px;
			}
		</style>
	</head>
	<body style="height:2000px;">
		<div id="testdiv">
			Element to Track
			<div id="testcontainer">
				Click on me and scroll
			</div>
		</div>
	</body>
</html>
```

```html
<script>
	var testContainer = document.getElementById('testcontainer');
	testContainer.addEventListener('click', function() {
		this.classList.toggle('float');
		//This will make the inner element always visbile if 'float' is added
	});

	var customSpectator = function(perceptor, currentResult, previous) {
		//if float is present in child DOM, it should be reported as visibile
		if (document.getElementById('testcontainer').classList.contains('float')) {
			currentResult.isVisible = true;
		}
	};
	var tObserve = new Perceptor(document.querySelector('#testdiv'), { spectators: [customSpectator] });
	tObserve.watch();
</script>
```

Similarly for Video elements with Player in Player option (just like youtube), such custom spectators can be handy.

Check the live version [here](/sample/customSpectator)
