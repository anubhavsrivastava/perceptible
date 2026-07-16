import Perceptor from '../index';
import { onPageVisibilityChange } from './visibilityHelper';
import SpectatorManager from '../spectators/spectatorManager';
import SubscriberManager from '../subscribers/subscriberManager';
import Scheduler from './Scheduler';

export interface IntervalSchedulerOptions {
	config?: {
		interval: number;
		attentionMode: boolean;
	};
	spectatorChain: SpectatorManager;
	subscriberChain: SubscriberManager;
	context: Perceptor;
}

/**
 * IntervalScheduler runs the spectator chain after every 'interval'
 */
export default class IntervalScheduler extends Scheduler {
	private _enabled: boolean;
	handleId?: ReturnType<typeof setInterval>;

	constructor(options: IntervalSchedulerOptions) {
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
			} else if (this._enabled && this.handleId) {
				clearInterval(this.handleId);
				delete this.handleId;
			}
		}, config.attentionMode);
	}

	/**
	 * @private
	 * Triggers the scheduler
	 */
	private _schedule(interval: number, spectatorChain: SpectatorManager, subscriberChain: SubscriberManager, context: Perceptor) {
		this.handleId = setInterval(() => {
			const spectatorsResult = spectatorChain.run(context);
			return subscriberChain.dispatch(context, spectatorsResult);
		}, interval);
	}

	/**
	 * Stops the current Scheduler
	 */
	clearSchedule(): this {
		if (this.handleId) {
			clearInterval(this.handleId);
			delete this.handleId;
		}
		this._enabled = false;

		return this;
	}
}
