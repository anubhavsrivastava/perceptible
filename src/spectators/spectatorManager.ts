import Perceptor, { SpectatorResult } from '../index';

export type Spectator = (
	context: Perceptor,
	currentResult: Partial<SpectatorResult>,
	prevResult: Partial<SpectatorResult>
) => Partial<SpectatorResult> | void;

/**
 * Manager for Spectators
 */
export default class SpectatorManager {
	chain: Array<Spectator | null>;
	prevResult: Partial<SpectatorResult>;

	constructor(chain?: Array<Spectator | null>) {
		this.chain = chain || [];
		this.prevResult = {};
	}

	/**
	 * Adds a spectator to list
	 * @param {Spectator} fn - Function to be added to chain of spectators
	 * @returns {number | null} - Spectator ID
	 */
	use(fn: Spectator): number | null {
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
	eject(id: number): void {
		if (this.chain[id]) {
			this.chain[id] = null;
		}
	}

	/**
	 * Executes every spectator and combines their result
	 * @param {Perceptor} perceptorContext
	 * @returns {object} - Merged results from all spectators
	 */
	run(perceptorContext: Perceptor): SpectatorResult {
		const updatedResult = this.chain.reduce((currentResult: Partial<SpectatorResult>, spectator: Spectator | null) => {
			if (spectator) {
				// Combine result of previous Spectators with current spectator result
				currentResult = Object.assign(currentResult, spectator(perceptorContext, currentResult, this.prevResult) || {});
			}
			return currentResult;
		}, Object.assign({}, this.prevResult));
		this.prevResult = updatedResult;
		return updatedResult as SpectatorResult;
	}
}
