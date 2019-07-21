---
id: subscribers
title: Subscribers
---

![Subscribers](/img/subscribers.png)

`Subscribers` are watcher for SpectatorResult for each run. Subscriber are used make meaningful information for the Perceptor result.

## Default Subscribers

Perceptor comes with default Subscribers. By default `dom` subscriber is used. This can be changed via `defaultSubscriber` option in [configuration](configuration.md)

### domSubscriber

`defaultSubscriber: 'dom'`

This subscriber outputs entire SpectatorResult on bottom-left corner of the browser.

![DOMsubscriber](/img/domsubscriber.png)

### consoleSubscriber

`defaultSubscriber: 'dom'`

This subscriber outputs entire SpectatorResult on console of the browser.

![ConsoleSubscriber](/img/consolesubscriber.png)

## Adding Custom Subscriber

> SubscriberFunction<PerceptorContext, SpectatorResult> : null

You can add subscriber function by hooking into `subscribers` configuration

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

Similarly for Video elements with Player in Player option (just like youtube), such custom spectators can be handy.

Check the live version [here](/sample/customSubscriber)
