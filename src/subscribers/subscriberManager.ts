import Perceptor, { SpectatorResult } from '../index';

export type Subscriber = (
	context: Perceptor,
	data: SpectatorResult
) => void;

/**
 * Manager for Subscribers
 */
export default class SubscriberManager {
	chain: Array<Subscriber | null>;

	constructor(chain?: Array<Subscriber | null>) {
		this.chain = chain || [];
	}

	/**
	 * Adds a subscriber to list
	 * @param {Subscriber} fn - Function to be added to chain of subscribers
	 * @returns {number | null} - Subscriber ID
	 */
	use(fn: Subscriber): number | null {
		if (typeof fn === 'function') {
			this.chain.push(fn);
			return this.chain.length - 1;
		}
		return null;
	}

	/**
	 * Removes previously added subscriber
	 * @param {number} id - Subscriber ID
	 */
	eject(id: number): void {
		if (this.chain[id]) {
			this.chain[id] = null;
		}
	}

	/**
	 * Dispatcher to call all subscribers with payload
	 * @param {Perceptor} PerceptorContext
	 * @param {SpectatorResult} data - Additional payload for subscribers
	 */
	dispatch(PerceptorContext: Perceptor, data: SpectatorResult): void {
		this.chain.every(subscribe => {
			if (subscribe) {
				subscribe(PerceptorContext, data);
			}
			return true;
		});
	}
}
