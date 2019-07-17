import defaultConfig from './defaultConfig';
import * as reporters from './reporters';

import getDefaultSpectators from './spectators';

class Perceptor {
	constructor(DOMElement, options = {}) {
		this.element = DOMElement;
		this.n = 'anubhav';
		this.spectators = getDefaultSpectators();
		this.config = Object.assign({}, defaultConfig, Perceptor.defaults, options);
	}

	watch() {
		this.handleId = setInterval(() => {
			return this.config.reporter(this, { ...this.spectators.run(this) });
		}, 1000);
	}

	unwatch() {
		clearInterval(this.handleId);
	}
}

Perceptor.defaults = Object.assign({}, defaultConfig);
Perceptor.reporters = reporters;

export default Perceptor;
