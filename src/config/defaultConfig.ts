import Perceptor from '../index';
import { Spectator } from '../spectators/spectatorManager';
import { Subscriber } from '../subscribers/subscriberManager';

export interface Config {
	threshold: number;
	scheduler: {
		mode: 'interval' | 'scroll' | 'raf' | 'observer';
		interval: number;
		attentionMode: boolean;
	};
	viewOffset: {
		top?: number;
		left?: number;
		right?: number;
		bottom?: number;
	};
	subscribers: Array<Subscriber>;
	spectators: Array<Spectator>;
	clickHandler?: (instance: Perceptor, event: Event) => void;
	defaultSubscriber: 'dom' | 'console' | 'none';
}

const config: Config = {
	// This denotes the threshold (Percentage) of surface area that an Element is considered to be visible
	threshold: 100,

	// scheduler config
	scheduler: {
		mode: 'interval', // interval, scroll, raf, observer
		// currently only interval is supported
		interval: 500, // ms of interval time, applicable for only "interval" type of mode
		attentionMode: true // Mode to disable schedulers if browser is not in focus (although visible on the screen)
	},

	// By default, visibility of element is based on viewport of the browser.
	// This configuration helps in making the viewport for detection shorter from the edges.
	viewOffset: {
		top: 0, //px
		left: 0, //px
		right: 0, //px
		bottom: 0 //px
	},

	// list of additional subscribers who would be part of subscriberChain
	subscribers: [],

	// list of additional spectators who would be part of spectatorChain to calculate the visibility.
	spectators: [],

	// function that would be triggered with the context of current perceptor instance on 'click' event
	clickHandler: () => {},

	// The default subscriber that has to be used.
	defaultSubscriber: 'dom' // either `dom`, `console`, `none`
};

export default config;
