export default class SpectatorManager {
	constructor() {
		this.chain = [];
		this.prevResult = { isVisible: false };
	}

	use(fn) {
		//todo :check whether it is a function
		this.chain.push(fn);
		return this.chain.length - 1;
	}

	eject(id) {
		if (this.chain[id]) {
			this.chain[id] = null;
		}
	}

	run(perceptorContext) {
		const updatedResult = this.chain.reduce((currentResult, spectator) => {
			if (spectator) {
				currentResult = Object.assign(currentResult, spectator(perceptorContext, currentResult, this.prevResult));
			}
			return currentResult;
		}, this.prevResult);
		this.prevResult = updatedResult;
		return updatedResult;
	}
}
