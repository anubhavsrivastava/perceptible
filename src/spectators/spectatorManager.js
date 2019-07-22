/**
 * Manager for Spectators
 */
export default class SpectatorManager {
	constructor(chain) {
		this.chain = chain || [];
		this.prevResult = {};
	}

	/**
	 * Adds a spectator to list
	 * @param {function} fn - Function to be added to chain of spectators
	 * @returns {number} - Spectator ID
	 */
	use(fn) {
		if (typeof fn === 'function') {
			this.chain.push(fn);
			return this.chain.length - 1;
		}
		return null;
	}

	/**
	 * Removes previously added Spectator
	 * @param {number} id - spectator ID
	 */
	eject(id) {
		if (this.chain[id]) {
			this.chain[id] = null;
		}
	}

	/**
	 * Executes every spectator and combines their result
	 * @param {Perceptor} PerceptorContext
	 * @returns {object} - Merged results from all spectators
	 */
	run(perceptorContext) {
		const updatedResult = this.chain.reduce((currentResult, spectator) => {
			if (spectator) {
				// Combine result of previous Spectators with current spectator result
				currentResult = Object.assign(currentResult, spectator(perceptorContext, currentResult, this.prevResult) || {});
			}
			return currentResult;
		}, Object.assign({}, this.prevResult));
		this.prevResult = updatedResult;
		return updatedResult;
	}
}
