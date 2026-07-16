import defaultConfig, { Config } from './config/defaultConfig';
import { mergeConfig } from './config/helper';
import getDefaultSpectators from './spectators/defaultSpectators';
import getDefaultSubscriber from './subscribers/defaultSubscriber';
import SpectatorManager from './spectators/spectatorManager';
import SubscriberManager from './subscribers/subscriberManager';
import IntervalScheduler from './schedulers/intervalScheduler';

export default class Perceptor {
	element: Element;
	config: Config;
	spectatorChain: SpectatorManager;
	subscriberChain: SubscriberManager;
	event: (event: Event) => void;
	scheduler?: IntervalScheduler;

	static defaults: Config = Object.assign({}, defaultConfig);

	/**
	 * @constructor
	 * @param {Element} DOMElement - HTMLElement to watch
	 * @param {Partial<Config>} options - additional options
	 * @returns {Perceptor}  - Instance of Perceptor
	 */
	constructor(DOMElement: Element, options: Partial<Config> = {}) {
		if (!(DOMElement instanceof Element)) {
			throw new Error('DOMElement is not a valid HTML Element');
		}

		this.element = DOMElement;
		this.config = mergeConfig(
			Object.assign({}, defaultConfig, Perceptor.defaults, {
				subscribers: [getDefaultSubscriber(options.defaultSubscriber || Perceptor.defaults.defaultSubscriber)],
				spectators: getDefaultSpectators()
			}),
			options
		);
		this.spectatorChain = new SpectatorManager(this.config.spectators);
		this.subscriberChain = new SubscriberManager(this.config.subscribers);
		this.event = this.config.clickHandler ? this.config.clickHandler.bind(this, this) : () => {};
	}

	/**
	 * Start to watch for visibility changes. Adds click event handler.
	 * @return {Perceptor} - Current Instance
	 */
	watch(): this {
		if (!this.scheduler) {
			this.scheduler = new IntervalScheduler({
				context: this,
				subscriberChain: this.subscriberChain,
				spectatorChain: this.spectatorChain,
				config: this.config.scheduler
			});
			this.element.addEventListener('click', this.event, false);
		}

		return this;
	}

	/**
	 * Stop already started scheduler for visibility changes. Removes click event handler
	 * @return {Perceptor} - Current Instance
	 */
	unwatch(): this {
		if (this.scheduler) {
			this.scheduler.clearSchedule();
			delete this.scheduler;
			this.element.removeEventListener('click', this.event);
		}

		return this;
	}
}
