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

const hasIntersectingArea = (lc, rc, tc, bc) => {
	return (lc && tc) || (lc && bc) || (rc && tc) || (rc && bc);
};

export const isBoxed = function(container, node) {
	const nodeRight = node.left + node.width;
	const containerRight = container.left + container.width;
	const nodeBottom = node.top + node.height;
	const containerBottom = container.top + container.height;

	const leftCoordinates = node.left >= container.left && node.left <= containerRight;
	const rightCoordinates = nodeRight <= containerRight && nodeRight >= container.left;
	const topCoordinates = node.top >= container.top && node.top <= containerBottom;
	const bottomCoordinates = nodeBottom <= containerBottom && nodeBottom > container.top;

	const subView = {};

	if (hasIntersectingArea(leftCoordinates, rightCoordinates, topCoordinates, bottomCoordinates)) {
		subView.left = leftCoordinates ? node.left : container.left;
		subView.right = rightCoordinates ? nodeRight : containerRight;
		subView.top = topCoordinates ? node.top : container.top;
		subView.bottom = bottomCoordinates ? nodeBottom : containerBottom;
		subView.surface = ((((subView.right - subView.left) / node.width) * (subView.bottom - subView.top)) / node.height) * 100;
	}

	return { leftCoordinates, rightCoordinates, topCoordinates, bottomCoordinates, subView };
};
