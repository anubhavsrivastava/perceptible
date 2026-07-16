import Scheduler from './Scheduler';

//This scheduler will work on Observer APIS
export default class ObserverAPIScheduler extends Scheduler {
	constructor(options: any) { // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
		super();
		throw new Error('Not Implemented');
	}
}
