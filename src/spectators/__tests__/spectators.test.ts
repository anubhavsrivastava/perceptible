import SpectatorManager from '../spectatorManager';
import viewportSpectator from '../viewportSpectator';
import durationSpectator from '../durationSpectator';
import elementSpectator from '../elementSpectator';
import timeSpectator from '../timeSpectator';
import layerSpectator from '../layerSpectator';
import getDefaultSpectators from '../defaultSpectators';
import { SpectatorResult } from '../../index';

describe('Spectators', () => {
	describe('SpectatorManager', () => {
		test('should initialize with provided or empty chain', () => {
			const manager = new SpectatorManager();
			expect(manager.chain).toEqual([]);

			const customFn = jest.fn();
			const manager2 = new SpectatorManager([customFn]);
			expect(manager2.chain).toEqual([customFn]);
		});

		test('use should register functions and return index', () => {
			const manager = new SpectatorManager();
			const fn1 = jest.fn();
			const fn2 = jest.fn();

			expect(manager.use(fn1)).toBe(0);
			expect(manager.use(fn2)).toBe(1);
			expect(manager.use('not a function' as unknown as never)).toBeNull();
		});

		test('eject should clear spectator function at ID', () => {
			const manager = new SpectatorManager();
			const fn1 = jest.fn();
			const id = manager.use(fn1);

			expect(id).not.toBeNull();
			manager.eject(id!);
			expect(manager.chain[id!]).toBeNull();
		});

		test('run should execute chain and merge results sequentially', () => {
			const manager = new SpectatorManager();
			const s1 = () => ({ a: 1 });
			const s2 = (ctx: unknown, curr: Record<string, number>) => ({ b: curr.a + 2 });

			manager.use(s1 as unknown as never);
			manager.use(s2 as unknown as never);

			const result = manager.run({} as unknown as never);
			expect(result).toEqual({ a: 1, b: 3 });
			expect(manager.prevResult).toEqual({ a: 1, b: 3 });
		});
	});

	describe('viewportSpectator', () => {
		let element: HTMLDivElement;

		beforeEach(() => {
			element = document.createElement('div');
			element.id = 'target';
			document.body.appendChild(element);

			Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true, configurable: true });
			Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true, configurable: true });
			Object.defineProperty(document.documentElement, 'clientHeight', { value: 1000, writable: true, configurable: true });
			Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, writable: true, configurable: true });
		});

		afterEach(() => {
			if (element.parentNode) {
				element.parentNode.removeChild(element);
			}
		});

		test('should calculate 100% surface visibility when element is fully within viewport', () => {
			element.getBoundingClientRect = () => ({
				left: 100,
				top: 100,
				width: 200,
				height: 200,
				right: 300,
				bottom: 300
			} as unknown as never);

			const context = { element, config: { threshold: 100 } } as unknown as never;
			const result = viewportSpectator(context);

			expect(result.isVisible).toBe(true);
			expect(result.subView!.surface).toBe(100);
		});

		test('should calculate partial surface visibility when partially out of viewport', () => {
			element.getBoundingClientRect = () => ({
				left: -100,
				top: 0,
				width: 200,
				height: 200,
				right: 100,
				bottom: 200
			} as unknown as never);

			const context = { element, config: { threshold: 50 } } as unknown as never;
			const result = viewportSpectator(context);

			expect(result.subView!.surface).toBe(50);
			expect(result.isVisible).toBe(true);
		});

		test('should respect viewOffset configurations', () => {
			element.getBoundingClientRect = () => ({
				left: 0,
				top: 0,
				width: 100,
				height: 100,
				right: 100,
				bottom: 100
			} as unknown as never);

			const context = {
				element,
				config: {
					threshold: 100,
					viewOffset: { top: 50, left: 50, right: 0, bottom: 0 }
				}
			} as unknown as never;
			const result = viewportSpectator(context);

			expect(result.subView!.surface).toBe(25);
			expect(result.isVisible).toBe(false);
		});

		test('should return isVisible false when element is completely out of viewport', () => {
			element.getBoundingClientRect = () => ({
				left: 2000,
				top: 2000,
				width: 100,
				height: 100,
				right: 2100,
				bottom: 2100
			} as unknown as never);

			const context = { element, config: { threshold: 100 } } as unknown as never;
			const result = viewportSpectator(context);

			expect(result.isVisible).toBeFalsy();
		});
	});

	describe('durationSpectator', () => {
		test('should accumulate duration when visible across consecutive checks', () => {
			const context = { config: { scheduler: { interval: 500 } } } as unknown as never;
			const prevResult = { isVisible: true, duration: 1000 };
			const currentResult = { isVisible: true };

			const result = durationSpectator(context, currentResult, prevResult);
			expect(result.duration).toBe(1500);
		});

		test('should keep duration unchanged when newly hidden or previously hidden', () => {
			const context = { config: { scheduler: { interval: 500 } } } as unknown as never;
			const prevResult = { isVisible: true, duration: 1000 };
			const currentResult = { isVisible: false };

			const result = durationSpectator(context, currentResult, prevResult);
			expect(result.duration).toBe(1000);
		});
	});

	describe('elementSpectator', () => {
		test('should extract element id and tagName', () => {
			const elem = document.createElement('section');
			elem.id = 'hero-banner';
			const result = elementSpectator({ element: elem } as unknown as never);

			expect(result).toEqual({
				element: { id: 'hero-banner', tagName: 'SECTION' }
			});
		});

		test('should handle empty or missing element gracefully', () => {
			expect(elementSpectator({} as unknown as never)).toEqual({
				element: { id: undefined, tagName: undefined }
			});
		});
	});

	describe('timeSpectator', () => {
		test('should attach current timestamp', () => {
			const now = 1700000000000;
			const spy = jest.spyOn(Date.prototype, 'getTime').mockReturnValue(now);

			const result = timeSpectator();
			expect(result).toEqual({ time: now });

			spy.mockRestore();
		});
	});

	describe('layerSpectator', () => {
		test('should return edge overlapping info using document.elementFromPoint', () => {
			const element = document.createElement('div');
			const context = { element } as unknown as never;

			document.elementFromPoint = jest.fn(() => document.body);

			Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true, configurable: true });
			Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true, configurable: true });
			Object.defineProperty(document.documentElement, 'clientHeight', { value: 1000, writable: true, configurable: true });
			Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, writable: true, configurable: true });

			element.getBoundingClientRect = () => ({
				left: 10,
				top: 10,
				width: 100,
				height: 100,
				right: 110,
				bottom: 110
			} as unknown as never);

			const currentResult = { subView: { surface: 100 } } as Partial<SpectatorResult>;
			const result = layerSpectator(context, currentResult);

			expect(result.overlapSurfaceEdge).toEqual({
				'top-left': true,
				'top-right': true,
				'bottom-left': true,
				'bottom-right': true
			});
		});
	});

	describe('defaultSpectators', () => {
		test('should return default list of spectators', () => {
			const defaultList = getDefaultSpectators();
			expect(Array.isArray(defaultList)).toBe(true);
			expect(defaultList).toHaveLength(4);
			expect(defaultList).toContain(timeSpectator);
			expect(defaultList).toContain(elementSpectator);
			expect(defaultList).toContain(viewportSpectator);
			expect(defaultList).toContain(durationSpectator);
		});
	});
});
