export interface Viewport {
	left: number;
	top: number;
	width: number;
	height: number;
}

export interface ElementPosition {
	left: number;
	top: number;
	width: number;
	height: number;
}

export interface ScrollPosition {
	left: number;
	top: number;
}

/**
 * Provides current Scroll Position and current resolution of the viewport
 * @return {Viewport} - {left, top} : Scroll Position from (0,0) of the view, {height, width} : Resolution of current visible Viewport
 */
export const getCurrentViewport = function(): Viewport {
	if (document.documentElement && document.documentElement.clientHeight) {
		return Object.assign(getCurrentScrollPosition(), {
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth
		});
	}
	return { left: 0, top: 0, width: 0, height: 0 };
};

/**
 * Provides current Scroll Position
 * @return {ScrollPosition} - {left, top} : Scroll Position from (0,0)
 */
export const getCurrentScrollPosition = function(): ScrollPosition {
	return { left: window.pageXOffset, top: window.pageYOffset };
};

/**
 * Provides Position of current element and resolution
 * @param {Element} node - HTMLElement
 * @return {ElementPosition} - {left, top} : Scroll Position from current viewport, height, width} : Resolution
 */
export const getElementPosition = function(node: Element): ElementPosition {
	const position = node.getBoundingClientRect();
	return { left: position.left, top: position.top, height: position.height, width: position.width };
};

/**
 * Provides Position of current element and resolution
 * @param {Element} node - HTMLElement
 * @return {ElementPosition} - {left, top} : Scroll Position from (0,0), height, width} : Resolution
 */
export const getCurrentViewportElementPosition = function(node: Element): ElementPosition {
	const position = getElementPosition(node);
	const scrollPos = getCurrentScrollPosition();
	return { left: position.left + scrollPos.left, top: position.top + scrollPos.top, height: position.height, width: position.width };
};
