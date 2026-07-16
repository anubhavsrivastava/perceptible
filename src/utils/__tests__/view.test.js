import { getCurrentViewport, getCurrentScrollPosition, getElementPosition, getCurrentViewportElementPosition } from '../view';

describe('View Utils', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true, configurable: true });
		Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true, configurable: true });
		Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, writable: true, configurable: true });
		Object.defineProperty(document.documentElement, 'clientWidth', { value: 1200, writable: true, configurable: true });
	});

	test('getCurrentScrollPosition should return current page offset', () => {
		window.pageXOffset = 50;
		window.pageYOffset = 150;
		expect(getCurrentScrollPosition()).toEqual({ left: 50, top: 150 });
	});

	test('getCurrentViewport should return scroll position and resolution', () => {
		window.pageXOffset = 10;
		window.pageYOffset = 20;
		expect(getCurrentViewport()).toEqual({ left: 10, top: 20, width: 1200, height: 800 });
	});

	test('getCurrentViewport should handle missing documentElement.clientHeight', () => {
		const originalDocElem = document.documentElement;
		Object.defineProperty(document, 'documentElement', { value: null, configurable: true });
		expect(getCurrentViewport()).toEqual({ left: 0, top: 0, width: 0, height: 0 });
		Object.defineProperty(document, 'documentElement', { value: originalDocElem, configurable: true });
	});

	test('getElementPosition should return client rect of HTMLElement', () => {
		const mockElem = document.createElement('div');
		mockElem.getBoundingClientRect = jest.fn(() => ({
			left: 100,
			top: 200,
			width: 300,
			height: 400,
			right: 400,
			bottom: 600
		}));

		expect(getElementPosition(mockElem)).toEqual({
			left: 100,
			top: 200,
			width: 300,
			height: 400
		});
	});

	test('getCurrentViewportElementPosition should combine element rect with window scroll', () => {
		window.pageXOffset = 25;
		window.pageYOffset = 75;

		const mockElem = document.createElement('div');
		mockElem.getBoundingClientRect = jest.fn(() => ({
			left: 100,
			top: 200,
			width: 300,
			height: 400,
			right: 400,
			bottom: 600
		}));

		expect(getCurrentViewportElementPosition(mockElem)).toEqual({
			left: 125,
			top: 275,
			width: 300,
			height: 400
		});
	});
});
