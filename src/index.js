import defaultConfig from './config/defaultConfig';
import { mergeConfig } from './config/helper';
import domSubscriber from './subscribers/domSubscriber';
import getDefaultSpectators from './spectators/defaultSpectators';
import SpectatorManager from './spectators/spectatorManager';
import SubscriberManager from './subscribers/subscriberManager';

class Perceptor {
	constructor(DOMElement, options = {}) {
		this.element = DOMElement;
		this.config = mergeConfig(Object.assign({}, defaultConfig, Perceptor.defaults, { subscribers: [domSubscriber], spectators: getDefaultSpectators() }), options);
		this.spectatorChain = new SpectatorManager(this.config.spectators);
		this.subscriberChain = new SubscriberManager(this.config.subscribers);

		this.element.addEventListener(
			'click',
			e => {
				this.config.clickHandler && this.config.clickHandler(e, this);
			},
			false
		);
	}

	watch() {
		this.handleId = setInterval(() => {
			const spectatorsResult = this.spectatorChain.run(this);
			return this.subscriberChain.dispatch(this, spectatorsResult);
		}, this.config.watchInterval);
	}

	unwatch() {
		clearInterval(this.handleId);
	}
}

Perceptor.defaults = Object.assign({}, defaultConfig);

export default Perceptor;
