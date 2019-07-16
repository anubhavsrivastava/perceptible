export const getCurrentViewport = function() {
	if (document.documentElement && document.documentElement.clientHeight) {
		return { ...getCurrentScrollPosition(), height: document.documentElement.clientHeight, width: document.documentElement.clientWidth };
	}
	return { left: 0, right: 0, width: 0, height: 0 };
};

export const getCurrentScrollPosition = function() {
	return { left: window.pageXOffset, top: window.pageYOffset };
};

export const getElementPosition = function(node) {
	let position = node.getBoundingClientRect();
	return { left: position.left, top: position.top, height: position.height, width: position.width };
};

export const getCurrentViewportElementPosition = function(node) {
	let position = getElementPosition(node);
	let scrollPos = getCurrentScrollPosition();
	return { left: position.left + scrollPos.left, top: position.top + scrollPos.top, height: position.height, width: position.width };
};
