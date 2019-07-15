/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/
var adIsViewable = true,
	viewabilityTime = 0,
	adElement = document.getElementById('ad');

/**
 * Logs the viewability values in the console
 *
 * @override
 */
window.log = function() {
	console.log('Ads is viewable: ', adIsViewable, '\nViewability time of the ad in sec:', viewabilityTime);
};

/************************************************************************************************
 *                                                                                              *
 *                              YOUR IMPLEMENTATION                                             *
 *                                                                                              *
 ************************************************************************************************/
