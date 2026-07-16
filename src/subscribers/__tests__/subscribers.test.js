import SubscriberManager from '../subscriberManager';
import getDefaultSubscriber from '../defaultSubscriber';
import domSubscriber from '../domSubscriber';
import consoleSubscriber from '../consoleSubscriber';

describe('Subscribers', () => {
	describe('SubscriberManager', () => {
		test('should initialize with empty or provided chain', () => {
			const manager = new SubscriberManager();
			expect(manager.chain).toEqual([]);

			const sub = jest.fn();
			const manager2 = new SubscriberManager([sub]);
			expect(manager2.chain).toEqual([sub]);
		});

		test('use should add function and return ID', () => {
			const manager = new SubscriberManager();
			const fn = jest.fn();

			expect(manager.use(fn)).toBe(0);
			expect(manager.use('invalid')).toBeNull();
		});

		test('eject should clear subscriber at ID', () => {
			const manager = new SubscriberManager();
			const fn = jest.fn();
			const id = manager.use(fn);

			manager.eject(id);
			expect(manager.chain[id]).toBeNull();
		});

		test('dispatch should invoke all registered subscribers with context and data', () => {
			const manager = new SubscriberManager();
			const sub1 = jest.fn();
			const sub2 = jest.fn();

			manager.use(sub1);
			manager.use(sub2);

			const mockContext = { element: {} };
			const mockData = { isVisible: true };

			manager.dispatch(mockContext, mockData);

			expect(sub1).toHaveBeenCalledWith(mockContext, mockData);
			expect(sub2).toHaveBeenCalledWith(mockContext, mockData);
		});
	});

	describe('defaultSubscriber', () => {
		test('should return domSubscriber for "dom"', () => {
			expect(getDefaultSubscriber('dom')).toBe(domSubscriber);
		});

		test('should return consoleSubscriber for "console"', () => {
			expect(getDefaultSubscriber('console')).toBe(consoleSubscriber);
		});

		test('should return a noop function for unknown or "none"', () => {
			const sub = getDefaultSubscriber('none');
			expect(typeof sub).toBe('function');
			expect(sub).not.toBe(domSubscriber);
			expect(sub).not.toBe(consoleSubscriber);
			expect(() => sub()).not.toThrow();
		});
	});

	describe('domSubscriber', () => {
		test('should inject #dreporter into document body and create/update container element', () => {
			const dreporter = document.getElementById('dreporter');
			expect(dreporter).not.toBeNull();

			const instance = { element: { id: 'test-node' } };
			const payload = { isVisible: true, surface: 100 };

			domSubscriber(instance, payload);

			const nodeContainer = dreporter.children[0];
			expect(nodeContainer).toBeDefined();
			expect(nodeContainer.innerHTML).toContain('"isVisible": true');
		});
	});

	describe('consoleSubscriber', () => {
		test('should log spectator result to console', () => {
			const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
			const instance = { element: {} };
			const data = { time: 12345 };

			consoleSubscriber(instance, data);

			expect(consoleSpy).toHaveBeenCalledWith(data);
			consoleSpy.mockRestore();
		});
	});
});
