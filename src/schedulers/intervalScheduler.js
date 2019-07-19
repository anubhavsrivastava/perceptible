import { isPageVisible, onPageVisible } from './visibilityHelper';

export default class IntervalScheduler {
	constructor(options) {
		//todo: add validations here
		const { interval = 500, spectatorChain, subscriberChain, context } = options;
		this._enabled = true;

		this._schedule(interval, spectatorChain, subscriberChain, context);

		onPageVisible(() => {
			this._schedule(interval, spectatorChain, subscriberChain, context);
		});
	}

	_schedule(interval, spectatorChain, subscriberChain, context) {
		if (isPageVisible() && this._enabled) {
			this.handleId = setInterval(() => {
				const spectatorsResult = spectatorChain.run(context);
				return subscriberChain.dispatch(context, spectatorsResult);
			}, interval);
		} else if (this._enabled) {
			clearInterval(this.handleId);
			// should let the subscribers know that pageIs not Visible anymore
		}
	}

	clearSchedule() {
		clearInterval(this.handleId);
		this._enabled = false;
	}
}
