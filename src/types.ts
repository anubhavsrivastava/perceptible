export interface SubView {
	left: number;
	right: number;
	top: number;
	bottom: number;
	surface: number;
}

export interface SpectatorResult {
	time?: number;
	element?: {
		id: string | undefined;
		tagName: string | undefined;
	};
	isVisible?: boolean;
	subView?: SubView;
	duration?: number;
	overlapSurfaceEdge?: {
		'top-left'?: boolean;
		'top-right'?: boolean;
		'bottom-left'?: boolean;
		'bottom-right'?: boolean;
	};
	node?: {
		left: number;
		top: number;
		width: number;
		height: number;
	};
}
