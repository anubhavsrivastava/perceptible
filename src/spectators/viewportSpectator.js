import { getCurrentViewportElementPosition, getCurrentViewport } from '../utils/view';

const hasIntersectingArea = (lc, rc, tc, bc) => {
	return (lc && tc) || (lc && bc) || (rc && tc) || (rc && bc);
};

export default function viewPortSpectator(context) {
	let ele = getCurrentViewportElementPosition(context.element);
	let view = getCurrentViewport();
	return isBoxed(view, ele);
}

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
