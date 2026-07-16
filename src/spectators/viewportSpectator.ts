import Perceptor, { SubView } from '../index';
import { getCurrentViewportElementPosition, getCurrentViewport, Viewport, ElementPosition } from '../utils/view';
import { Config } from '../config/defaultConfig';

export interface ViewPortResult {
	isVisible: boolean;
	subView?: SubView;
}

/**
 * Adds isVisible property based on subView.surface visibility.
 * subView hold information about current dimensions of Perceptor element that is currently viewable in current viewPort.
 * @param {Perceptor} context
 */
export default function viewPortSpectator(context: Perceptor): ViewPortResult {
	const element = getCurrentViewportElementPosition(context.element);
	const view = getCurrentViewport(); //including scroll
	return isBoxed(view, element, context.config);
}

/**
 * Detect if any edge lies in the view
 * @param {boolean} lc - Left Co-ordinate lie in region?
 * @param {boolean} rc - Right Co-ordinate lie in region?
 * @param {boolean} tc - Top Co-ordinate lie in region?
 * @param {boolean} bc - Bottom Co-ordinate lie in region?
 */
const hasIntersectingArea = (lc: boolean, rc: boolean, tc: boolean, bc: boolean): boolean => {
	return (lc && tc) || (lc && bc) || (rc && tc) || (rc && bc);
};

/**
 *
 * Calculates if `node` has some intersection area in `container`
 * @param {Viewport} container - viewport to test the node
 * @param {ElementPosition} node -  candidate to testing if it is inside container
 * @param {Config} config - Additional Configuration
 */
const isBoxed = function(container: Viewport, node: ElementPosition, config: Config): ViewPortResult {
	const threshold = config && config.threshold !== undefined ? config.threshold : 100;
	const { viewOffset = { top: 0, left: 0, right: 0, bottom: 0 } } = config;

	const nodeRight = node.left + node.width;
	const nodeBottom = node.top + node.height;

	// do not pollute original object
	const containerLeft = container.left + (viewOffset.left || 0);
	const containerTop = container.top + (viewOffset.top || 0);
	const containerRight = containerLeft + container.width - (viewOffset.right || 0);
	const containerBottom = containerTop + container.height - (viewOffset.bottom || 0);

	// Find if these borders are inside the box
	const leftCoordinates = node.left >= containerLeft && node.left <= containerRight;
	const rightCoordinates = nodeRight <= containerRight && nodeRight >= containerLeft;
	const topCoordinates = node.top >= containerTop && node.top <= containerBottom;
	const bottomCoordinates = nodeBottom <= containerBottom && nodeBottom > containerTop;

	if (hasIntersectingArea(leftCoordinates, rightCoordinates, topCoordinates, bottomCoordinates)) {
		// subview that is intersecting `container` and `node`
		const left = leftCoordinates ? node.left : containerLeft;
		const right = rightCoordinates ? nodeRight : containerRight;
		const top = topCoordinates ? node.top : containerTop;
		const bottom = bottomCoordinates ? nodeBottom : containerBottom;
		// percentage of `node` that is visible in `container`
		const surface = ((((right - left) / node.width) * (bottom - top)) / node.height) * 100;
		
		const subView: SubView = { left, right, top, bottom, surface };

		return {
			isVisible: subView.surface >= threshold,
			subView
		};
	}

	return {
		isVisible: false,
		subView: undefined
	};
};
