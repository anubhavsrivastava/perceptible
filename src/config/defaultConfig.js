const config = {
	//
	//This denotes the threshold (Percentage) of surface area that an Element is considered to be visible
	// e.g, a. if threshold is 100, & if 100% of the Element is visible, it will be considered as visible
	// 		b. if threshold is 20, & %age element visibility >20 , it will be considered as visible
	// defaults to 100
	threshold: 100,

	// scheduler config
	scheduler: {
		mode: 'interval', // interval, scroll, raf, observer
		// currently on interval is supported
		interval: 500, // ms of interval time, applicable for only "interval" type of mode
		attentionMode: true // Mode to disable schedulers if browser if not in focus (although visible on the screen)
	},

	// By default, visibility of element is based on viewport of the browser.
	// This configuration helps in making the viewport for detection shorter from the edges.
	// In case of site with fixed header, or sidebar, or sticky footer, these setting can be used to accurately calculate
	// visibility of the element
	viewOffset: {
		top: 0, //px
		left: 0, //px
		right: 0, //px
		bottom: 0 //px
	},

	// list of additional subscribers who would be part of subscriberChain
	subscribers: [],

	// list of additional spectators who would be part of spectatorChain to calculate the visibililty.
	spectators: [],

	// function that would be triggered with the context of current perceptor instance on 'click' event
	clickHandler: () => {},

	// The default subscriber that has to be used. If you add a subscriber in subscribers option, you can disable the default subscriber by defaultSubscriber: 'none'
	defaultSubscriber: 'dom' // either `dom`, `console`, `none`
};

export default config;
