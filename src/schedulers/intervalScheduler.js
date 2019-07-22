import { onPageVisibilityChange } from './visibilityHelper';
import SpectatorManager from '../spectators/spectatorManager';
import SubscriberManager from '../subscribers/subscriberManager';

export default class IntervalScheduler {
	constructor(options) {
		const { config = { interval: 500, attentionMode: true }, spectatorChain, subscriberChain, context } = options;
		if (!(spectatorChain instanceof SpectatorManager && subscriberChain instanceof SubscriberManager)) {
			throw new Error('Not a valid instance of spectatorChain/SubscriberChain');
		}

		this._enabled = true;

		this._schedule(config.interval, spectatorChain, subscriberChain, context);

		onPageVisibilityChange(isPageVisible => {
			if (isPageVisible && this._enabled && !this.handleId) {
				this._schedule(config.interval, spectatorChain, subscriberChain, context);
			} else if (this._enabled) {
				clearInterval(this.handleId);
				delete this.handleId;
			}
		}, config.attentionMode);
	}

	_schedule(interval, spectatorChain, subscriberChain, context) {
		this.handleId = setInterval(() => {
			const spectatorsResult = spectatorChain.run(context);
			return subscriberChain.dispatch(context, spectatorsResult);
		}, interval);
	}

	clearSchedule() {
		clearInterval(this.handleId);
		delete this.handleId;
		this._enabled = false;
	}
}
