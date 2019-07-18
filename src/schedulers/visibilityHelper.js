// Refer : https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
// Shouldn't need a polyfill with 'onblur', 'onfocus' since it seems to be supported by major browsers
// Refer caniuse for browser support: https://caniuse.com/#search=pagevisibility

// Set the name of the hidden property and the change event for visibility
let hidden, visibilityChange;
if (typeof document.hidden !== 'undefined') {
	// Opera 12.10 and Firefox 18 and later support
	hidden = 'hidden';
	visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
	hidden = 'msHidden';
	visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
	hidden = 'webkitHidden';
	visibilityChange = 'webkitvisibilitychange';
}

document[hidden];

export const onPageVisible = (fn = () => {}) => {
	document.addEventListener(visibilityChange, fn, false);
};

export const isPageVisible = () => {
	return !document[hidden];
};

export const isPageHidden = () => {
	return document[hidden];
};
