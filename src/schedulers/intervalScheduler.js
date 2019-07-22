import { onPageVisibilityChange } from './visibilityHelper';
import SpectatorManager from '../spectators/spectatorManager';
import SubscriberManager from '../subscribers/subscriberManager';
import Scheduler from './Scheduler';

/**
 * IntervalScheduler runs the spectator chain after every 'interval'
 */
export default class IntervalScheduler extends Scheduler {
	constructor(options) {
		super();
		const { config = { interval: 500, attentionMode: true }, spectatorChain, subscriberChain, context } = options;
		if (!(spectatorChain instanceof SpectatorManager && subscriberChain instanceof SubscriberManager)) {
			throw new Error('Not a valid instance of spectatorChain/SubscriberChain');
		}

		this._enabled = true;

		this._schedule(config.interval, spectatorChain, subscriberChain, context);

		// Register for PageVisibility event changes
		onPageVisibilityChange(isPageVisible => {
			if (isPageVisible && this._enabled && !this.handleId) {
				this._schedule(config.interval, spectatorChain, subscriberChain, context);
			} else if (this._enabled) {
				clearInterval(this.handleId);
				delete this.handleId;
			}
		}, config.attentionMode);
	}

	/**
	 * @private
	 * Triggers the scheduler
	 * @param {integer} interval  - time in ms
	 * @param {SpectatorManager} spectatorChain - SpectatorManager to be invoked
	 * @param {SubscriberManager} subscriberChain - SubscriberManager to be informed
	 * @param {object} context  - Perceptor Context
	 */
	_schedule(interval, spectatorChain, subscriberChain, context) {
		this.handleId = setInterval(() => {
			const spectatorsResult = spectatorChain.run(context);
			return subscriberChain.dispatch(context, spectatorsResult);
		}, interval);
	}

	/**
	 * Stops the current Scheduler
	 */
	clearSchedule() {
		clearInterval(this.handleId);
		delete this.handleId;
		this._enabled = false;

		return this;
	}
}
