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
		this.scheduler = new IntervalScheduler({ context: this, subscriberChain: this.subscriberChain, spectatorChain: this.spectatorChain, interval: this.config.watchInterval });
		this.element.addEventListener('click', this.event, false);
	}

	unwatch() {
		this.scheduler.clearSchedule();
		this.element.removeEventListener('click', this.event);
	}
}

Perceptor.defaults = Object.assign({}, defaultConfig);

export default Perceptor;
