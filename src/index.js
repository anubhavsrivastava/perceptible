var adIsViewable = true,
	viewabilityTime = 0,
	adElement = document.getElementById('ad');

window.log = function() {
	console.log('Ads is viewable: ', adIsViewable, '\nViewability time of the ad in sec:', viewabilityTime);
};

class Perceptor {
	constructor(selector, options = {}) {
		this._selector = selector;
		this._options = options;
	}

	watch() {
		setTimeout(window.log, 500);
	}
}

window.Perceptor = Perceptor;
