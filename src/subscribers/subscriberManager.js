export default class SubscriberManager {
	constructor(chain) {
		this.chain = chain || [];
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

	dispatch(PerceptorContext, data) {
		this.chain.every(subscribe => {
			if (subscribe) {
				subscribe(PerceptorContext, data);
			}
			return true;
		});
	}
}
