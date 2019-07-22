import { getCurrentViewportElementPosition, getCurrentViewport } from '../utils/view';

const hasIntersectingArea = (lc, rc, tc, bc) => {
	return (lc && tc) || (lc && bc) || (rc && tc) || (rc && bc);
};

export default function viewPortSpectator(context) {
	let ele = getCurrentViewportElementPosition(context.element);
	let view = getCurrentViewport();
	return isBoxed(view, ele, context.config);
}

export const isBoxed = function(container, node, config) {
	const threshold = config && config['threshold'] !== undefined ? config.threshold : 100;
	const { viewOffset = { top: 0, left: 0, right: 0, bottom: 0 } } = config;

	const nodeRight = node.left + node.width;
	const nodeBottom = node.top + node.height;

	const containerLeft = container.left + viewOffset.left;
	const containerTop = container.top + viewOffset.top;
	const containerRight = containerLeft + container.width - viewOffset.right;
	const containerBottom = containerTop + container.height - viewOffset.bottom;

	const leftCoordinates = node.left >= containerLeft && node.left <= containerRight;
	const rightCoordinates = nodeRight <= containerRight && nodeRight >= containerLeft;
	const topCoordinates = node.top >= containerTop && node.top <= containerBottom;
	const bottomCoordinates = nodeBottom <= containerBottom && nodeBottom > containerTop;

	const subView = {};

	if (hasIntersectingArea(leftCoordinates, rightCoordinates, topCoordinates, bottomCoordinates)) {
		subView.left = leftCoordinates ? node.left : containerLeft;
		subView.right = rightCoordinates ? nodeRight : containerRight;
		subView.top = topCoordinates ? node.top : containerTop;
		subView.bottom = bottomCoordinates ? nodeBottom : containerBottom;
		subView.surface = ((((subView.right - subView.left) / node.width) * (subView.bottom - subView.top)) / node.height) * 100;
	}

	return { isVisible: subView.surface >= threshold, subView };
};
