import domSubscriber from './domSubscriber';
import consoleSubscriber from './consoleSubscriber';

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
