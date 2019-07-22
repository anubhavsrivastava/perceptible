import { getElementPosition, getCurrentViewport } from '../utils/view';

export default function layerSpectator(context, currentResult) {
	const topSurface = {};
	let nodeDimension = {};
	if (currentResult.subView && currentResult.subView.surface) {
		nodeDimension = getElementPosition(context.element);
		const { left: vleft, top: vtop, width: vwidth, height: vheight } = getCurrentViewport();
		const { left, top, height, width } = nodeDimension;
		// let [cleft, cright, ctop, cbottom] = [left + 1 < vleft ? vleft : left + 1, left + width - 1 > vleft + vwidth ? vleft + vwidth : left + width - 1, top + 1 < vtop ? vtop : top + 1, top + height - 1 > vtop + vheight ? vtop + vheight : top + height - 1];
		let cleft = Math.max(left + 1, vleft + 1);
		let cright = Math.min(left + width - 1, vleft + vwidth - 1);
		let ctop = Math.max(top + 1, vtop + 1);
		let cbottom = Math.min(top + height - 1, vtop + vheight - 1);
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
