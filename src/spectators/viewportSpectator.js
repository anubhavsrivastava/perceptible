import { getCurrentViewportElementPosition, getCurrentViewport } from '../utils/view';

/**
 * Adds isVisible property based on subView.surface visibility.
 * subView hold information about current dimensions of Perceptor element that is currently viewable in current viewPort.
 * @param {Perceptor} context
 */
export default function viewPortSpectator(context) {
	let element = getCurrentViewportElementPosition(context.element);
	let view = getCurrentViewport(); //including scroll
	return isBoxed(view, element, context.config);
}

/**
 * Detect if any edge lies in the view
 * @param {boolean} lc - Left Co-ordinate lie in region?
 * @param {boolean} rc - Right Co-ordinate lie in region?
 * @param {boolean} tc - Top Co-ordinate lie in region?
 * @param {boolean} bc - Bottom Co-ordinate lie in region?
 */
const hasIntersectingArea = (lc, rc, tc, bc) => {
	return (lc && tc) || (lc && bc) || (rc && tc) || (rc && bc);
};

/**
 *
 * Calculates if `node` has some intersection area in `container`
 * @param {object} container - viewport to test the node
 * @param {object} node -  candidate to testing if it is inside container
 * @param {object} config - Additional Configuration
 */
const isBoxed = function(container, node, config) {
	const threshold = config && config['threshold'] !== undefined ? config.threshold : 100;
	const { viewOffset = { top: 0, left: 0, right: 0, bottom: 0 } } = config;

	const nodeRight = node.left + node.width;
	const nodeBottom = node.top + node.height;

	// do not pollute original object
	const containerLeft = container.left + viewOffset.left;
	const containerTop = container.top + viewOffset.top;
	const containerRight = containerLeft + container.width - viewOffset.right;
	const containerBottom = containerTop + container.height - viewOffset.bottom;

	// Find if these border l=are inside the box
	const leftCoordinates = node.left >= containerLeft && node.left <= containerRight;
	const rightCoordinates = nodeRight <= containerRight && nodeRight >= containerLeft;
	const topCoordinates = node.top >= containerTop && node.top <= containerBottom;
	const bottomCoordinates = nodeBottom <= containerBottom && nodeBottom > containerTop;

	const subView = {};

	if (hasIntersectingArea(leftCoordinates, rightCoordinates, topCoordinates, bottomCoordinates)) {
		// subview that is intersecting `container` and `node`
		subView.left = leftCoordinates ? node.left : containerLeft;
		subView.right = rightCoordinates ? nodeRight : containerRight;
		subView.top = topCoordinates ? node.top : containerTop;
		subView.bottom = bottomCoordinates ? nodeBottom : containerBottom;
		// percentage of `node` that is visibile in `container`
		subView.surface = ((((subView.right - subView.left) / node.width) * (subView.bottom - subView.top)) / node.height) * 100;
	}

	return { isVisible: subView.surface >= threshold, subView };
};
