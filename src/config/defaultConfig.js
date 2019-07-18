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
		interval: 500 // ms of interval time, applicable for only "interval" type of mode
	},

	viewOffset: {
		top: 0, //px
		left: 0, //px
		right: 0, //px
		bottom: 0 //px
	},

	subscribers: [],
	spectators: [],
	clickHandler: () => {}
};

export default config;
