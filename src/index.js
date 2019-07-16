import defaultConfig from './defaultConfig';
import * as reporters from './reporters';

import { isBoxed, getCurrentViewportElementPosition, getCurrentViewport } from './view';

class Perceptor {
	constructor(DOMElement, options = {}) {
		this.element = DOMElement;
		this.config = Object.assign({}, defaultConfig, Perceptor.defaults, options);
	}

	watch() {
		this.handleId = setInterval(() => {
			let ele = getCurrentViewportElementPosition(this.element);
			let view = getCurrentViewport();
			return this.config.reporter(this, { has: isBoxed(view, ele), a: ele, viewBox: view });
		}, 1000);
	}

	unwatch() {
		clearInterval(this.handleId);
	}
}

Perceptor.defaults = Object.assign({}, defaultConfig);
Perceptor.reporters = reporters;

export default Perceptor;
