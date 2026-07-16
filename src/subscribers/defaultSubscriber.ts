import domSubscriber from './domSubscriber';
import consoleSubscriber from './consoleSubscriber';
import { Subscriber } from './subscriberManager';

/**
 * Returns default subscriber
 * @param {string} subscriberName - Inbuilt subscriber name - 'dom', 'console' or 'none'
 * @returns {Subscriber}
 */
const getDefaultSubscriber = (subscriberName: string): Subscriber => {
	if (subscriberName === 'dom') {
		return domSubscriber;
	}

	if (subscriberName === 'console') {
		return consoleSubscriber;
	}

	return () => {}; //noop
};

export default getDefaultSubscriber;
