export default class IntervalScheduler {
	constructor(options) {
		//todo: add validations here
		const { interval = 500, spectatorChain, subscriberChain, context } = options;
		this.handleId = setInterval(() => {
			const spectatorsResult = spectatorChain.run(context);
			return subscriberChain.dispatch(context, spectatorsResult);
		}, interval);
	}

	clearSchedule() {
		clearInterval(this.handleId);
	}
}
