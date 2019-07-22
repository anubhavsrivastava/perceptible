import domSubscriber from './domSubscriber';
import consoleSubscriber from './consoleSubscriber';

/**
 * Returns default subscriber
 * @param {string} subscriberName - Inbuilt subscriber name - 'dom', 'console' or 'None'
 *
 */
const getDefaultSubscriber = subscriberName => {
	if (subscriberName === 'dom') {
		return domSubscriber;
	}

	if (subscriberName === 'console') {
		return consoleSubscriber;
	}

	return () => {}; //noop
};

export default getDefaultSubscriber;
