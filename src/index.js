import defaultConfig from './config/defaultConfig';
import { mergeConfig } from './config/helper';
import domSubscriber from './subscribers/domSubscriber';
import getDefaultSpectators from './spectators/defaultSpectators';
import SpectatorManager from './spectators/spectatorManager';
import SubscriberManager from './subscribers/subscriberManager';
import IntervalScheduler from './schedulers/intervalScheduler';

class Perceptor {
	constructor(DOMElement, options = {}) {
		this.element = DOMElement;
		this.config = mergeConfig(Object.assign({}, defaultConfig, Perceptor.defaults, { subscribers: [domSubscriber], spectators: getDefaultSpectators() }), options);
		this.spectatorChain = new SpectatorManager(this.config.spectators);
		this.subscriberChain = new SubscriberManager(this.config.subscribers);
		this.event = this.config.clickHandler ? this.config.clickHandler.bind(this, this) : () => {};
	}

	watch() {
		if (!this.scheduler) {
			this.scheduler = new IntervalScheduler({ context: this, subscriberChain: this.subscriberChain, spectatorChain: this.spectatorChain, config: this.config.scheduler });
			this.element.addEventListener('click', this.event, false);
		}

		return this;
	}

	unwatch() {
		if (this.scheduler) {
			this.scheduler.clearSchedule();
			delete this['scheduler'];
			this.element.removeEventListener('click', this.event);
		}

		return this;
	}
}

Perceptor.defaults = Object.assign({}, defaultConfig);

export default Perceptor;
