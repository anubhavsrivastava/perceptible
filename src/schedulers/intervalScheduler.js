import { onPageVisibilityChange } from './visibilityHelper';

export default class IntervalScheduler {
	constructor(options) {
		//todo: add validations here
		const { config = { interval: 500, attentionMode: true }, spectatorChain, subscriberChain, context } = options;
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
