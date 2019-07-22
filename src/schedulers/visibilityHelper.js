// Refer : https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
// Shouldn't need a polyfill since it seems to be supported by major browsers
// Refer caniuse for browser support: https://caniuse.com/#search=pagevisibility

// Set the name of the hidden property and the change event for visibility
// This is webkit specific
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

const isPageVisible = () => {
	return !document[hidden];
};

/**
 * Registers a function to be called on change of Page visibility
 * @param {function} fn - Function to be called on event
 * @param {boolean} attentionMode - Enable Attention mode
 */
export const onPageVisibilityChange = (fn = () => {}, attentionMode = true) => {
	let lastVisibility = undefined;

	// When window is switched over and switched back - both pageVisibilty API event and 'focus' event are triggered.
	// The callback handler in each event ensure that callback(fn) will be called only if there is
	// actual change in visibility by checking previousState(lastVisibility).
	// The sequence of execution isn't guaranteed but sequential execution is guaranteed in `task` in event loop

	document.addEventListener(visibilityChange, () => {
		let currentVisibility = isPageVisible();
		if (lastVisibility != currentVisibility) {
			fn(currentVisibility);
			lastVisibility = currentVisibility;
		}
	});

	if (attentionMode) {
		window.addEventListener('blur', () => {
			if (lastVisibility != false) {
				fn(false);
				lastVisibility = false;
			}
		});

		window.addEventListener('focus', () => {
			if (lastVisibility != true) {
				fn(true);
				lastVisibility = true;
			}
		});
	}
};
