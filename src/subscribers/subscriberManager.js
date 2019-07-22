/**
 * Manager for Spectators
 */
export default class SubscriberManager {
	constructor(chain) {
		this.chain = chain || [];
	}

	/**
	 * Adds a subscriber to list
	 * @param {function} fn - Function to be added to chain of subscribers
	 * @returns {number} - Subscriber ID
	 */
	use(fn) {
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
	eject(id) {
		if (this.chain[id]) {
			this.chain[id] = null;
		}
	}

	/**
	 * Dispatcher to call all subscribers with payload
	 * @param {Perceptor} PerceptorContext
	 * @param {any} data - Additional payload for subscribers
	 */
	dispatch(PerceptorContext, data) {
		this.chain.every(subscribe => {
			if (subscribe) {
				subscribe(PerceptorContext, data);
			}
			return true;
		});
	}
}
