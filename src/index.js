import defaultConfig from './defaultConfig';
import * as subscribers from './subscribers';

import getDefaultSpectators from './spectators';

class Perceptor {
	constructor(DOMElement, options = {}) {
		this.element = DOMElement;
		this.spectators = getDefaultSpectators();
		this.config = Object.assign({}, defaultConfig, Perceptor.defaults, options);
	}

	watch() {
		this.handleId = setInterval(() => {
			return this.config.reporter(this, { ...this.spectators.run(this) });
		}, 500);
	}

	unwatch() {
		clearInterval(this.handleId);
	}
}

Perceptor.defaults = Object.assign({}, defaultConfig);
Perceptor.subscribers = subscribers;

export default Perceptor;
