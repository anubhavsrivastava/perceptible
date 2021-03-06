---
id: examplespectator
title: Custom Spectator
---

Following example initialises Multiple Perceptor on `#testdiv`.
If `float` CSS class is present in child DOM, it should be reported as visibile.

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
