// Refer : https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
// Shouldn't need a polyfill since it seems to be supported by major browsers
// Refer caniuse for browser support: https://caniuse.com/#search=pagevisibility

let hidden: 'hidden' | 'msHidden' | 'webkitHidden';
let visibilityChange: 'visibilitychange' | 'msvisibilitychange' | 'webkitvisibilitychange';

if (typeof document.hidden !== 'undefined') {
	hidden = 'hidden';
	visibilityChange = 'visibilitychange';
} else if (typeof (document as unknown as Record<string, unknown>).msHidden !== 'undefined') {
	hidden = 'msHidden';
	visibilityChange = 'msvisibilitychange';
} else if (typeof (document as unknown as Record<string, unknown>).webkitHidden !== 'undefined') {
	hidden = 'webkitHidden';
	visibilityChange = 'webkitvisibilitychange';
}

const isPageVisible = (): boolean => {
	return !(document as unknown as Record<string, unknown>)[hidden];
};

/**
 * Registers a function to be called on change of Page visibility
 * @param {function} fn - Function to be called on event
 * @param {boolean} attentionMode - Enable Attention mode
 */
export const onPageVisibilityChange = (fn: (visible: boolean) => void = () => {}, attentionMode = true): void => {
	let lastVisibility: boolean | undefined = undefined;

	document.addEventListener(visibilityChange, () => {
		const currentVisibility = isPageVisible();
		if (lastVisibility !== currentVisibility) {
			fn(currentVisibility);
			lastVisibility = currentVisibility;
		}
	});

	if (attentionMode) {
		window.addEventListener('blur', () => {
			if (lastVisibility !== false) {
				fn(false);
				lastVisibility = false;
			}
		});

		window.addEventListener('focus', () => {
			if (lastVisibility !== true) {
				fn(true);
				lastVisibility = true;
			}
		});
	}
};
