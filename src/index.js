var adIsViewable = true,
	viewabilityTime = 0,
	adElement = document.getElementById('ad');

import reporter from './reporters/domReporter';
import { isBoxed, getElementPosition, getCurrentViewportElementPosition, getCurrentScrollPosition, getCurrentViewport } from './view';

class Perceptor {
	constructor(DOMElement, options = {}) {
		this._ele = DOMElement;
		this._options = options;
	}

	watch() {
		this.handleId = setInterval(() => {
			let ele = getCurrentViewportElementPosition(this._ele);
			let view = getCurrentViewport();
			return reporter({ has: isBoxed(view, ele), a: ele, viewBox: view });
		}, 1000);
	}

	unwatch() {
		clearInterval(this.handleId);
	}
}
Perceptor.getCurrentScrollPosition = getCurrentScrollPosition;

window.Perceptor = Perceptor;
