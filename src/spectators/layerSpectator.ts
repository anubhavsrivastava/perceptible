import Perceptor, { SpectatorResult } from '../index';
import { getElementPosition, getCurrentViewport, ElementPosition } from '../utils/view';

export interface LayerResult {
	overlapSurfaceEdge: {
		'top-left'?: boolean;
		'top-right'?: boolean;
		'bottom-left'?: boolean;
		'bottom-right'?: boolean;
	};
	node: Partial<ElementPosition>;
}

// This is experimental spectator and is not used currently
export default function layerSpectator(context: Perceptor, currentResult: Partial<SpectatorResult>): LayerResult {
	const topSurface: LayerResult['overlapSurfaceEdge'] = {};
	let nodeDimension: Partial<ElementPosition> = {};
	if (currentResult.subView && currentResult.subView.surface) {
		nodeDimension = getElementPosition(context.element);
		const { left: vleft, top: vtop, width: vwidth, height: vheight } = getCurrentViewport();
		const { left = 0, top = 0, height = 0, width = 0 } = nodeDimension;
		const cleft = Math.max(left + 1, vleft + 1);
		const cright = Math.min(left + width - 1, vleft + vwidth - 1);
		const ctop = Math.max(top + 1, vtop + 1);
		const cbottom = Math.min(top + height - 1, vtop + vheight - 1);
		if (document.elementFromPoint(cleft, ctop) !== context.element) {
			topSurface['top-left'] = true;
		}
		if (document.elementFromPoint(cright, ctop) !== context.element) {
			topSurface['top-right'] = true;
		}
		if (document.elementFromPoint(cleft, cbottom) !== context.element) {
			topSurface['bottom-left'] = true;
		}
		if (document.elementFromPoint(cright, cbottom) !== context.element) {
			topSurface['bottom-right'] = true;
		}
	}

	return { overlapSurfaceEdge: topSurface, node: nodeDimension };
}
