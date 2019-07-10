var adIsViewable = true,
	viewabilityTime = 0,
	adElement = document.getElementById('ad');

import reporter from './reporters/consoleLogger';

class Perceptor {
	constructor(selector, options = {}) {
		this._selector = selector;
		this._options = options;
	}

	watch() {
		setTimeout(reporter, 500, { adIsViewable, viewabilityTime });
	}
}

window.Perceptor = Perceptor;
