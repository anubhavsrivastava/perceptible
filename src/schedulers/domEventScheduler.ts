import Scheduler from './Scheduler';

//This scheduler will watch on document events 'zoom', 'scroll', 'resize'
export default class DOMEventScheduler extends Scheduler {
	constructor(options: any) { // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
		super();
		throw new Error('Not Implemented');
	}
}
