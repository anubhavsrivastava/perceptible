//eslint-disable-next-line
import { consoleReporter, DOMReporter } from './reporters';

const config = {
	//
	//This denotes the threshold (Percentage) of surface area that an Element is considered to be visible
	// e.g, a. if threshold is 100, & if 100% of the Element is visible, it will be considered as visible
	// 		b. if threshold is 20, & %age element visibility >20 , it will be considered as visible
	threshold: 100,
	watchMode: 'interval', // interval, scroll, raf
	watchInterval: 1000, // ms of interval time
	reporter: DOMReporter
};

export default config;
