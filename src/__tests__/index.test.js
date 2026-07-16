import Perceptor from '../index';

describe('Perceptor Main Engine', () => {
	let element;

	beforeEach(() => {
		jest.useFakeTimers();
		element = document.createElement('div');
		element.id = 'target-element';
		document.body.appendChild(element);
	});

	afterEach(() => {
		jest.useRealTimers();
		if (element.parentNode) {
			element.parentNode.removeChild(element);
		}
	});

	test('should throw an error if instantiated without a valid DOM Element', () => {
		expect(() => new Perceptor()).toThrow('DOMElement is not a valid HTML Element');
		expect(() => new Perceptor({})).toThrow('DOMElement is not a valid HTML Element');
		expect(() => new Perceptor('div')).toThrow('DOMElement is not a valid HTML Element');
	});

	test('should initialize Perceptor instance with default configurations and element', () => {
		const instance = new Perceptor(element);

		expect(instance.element).toBe(element);
		expect(instance.config).toBeDefined();
		expect(instance.config.threshold).toBe(100);
		expect(instance.spectatorChain).toBeDefined();
		expect(instance.subscriberChain).toBeDefined();
	});

	test('watch should instantiate scheduler and bind click handler', () => {
		const clickHandler = jest.fn();
		const instance = new Perceptor(element, { clickHandler });

		expect(instance.scheduler).toBeUndefined();

		instance.watch();

		expect(instance.scheduler).toBeDefined();

		// Click event check
		element.click();
		expect(clickHandler).toHaveBeenCalledWith(instance, expect.anything());
	});

	test('watch called multiple times should be idempotent', () => {
		const instance = new Perceptor(element);
		instance.watch();
		const schedulerRef = instance.scheduler;

		instance.watch();
		expect(instance.scheduler).toBe(schedulerRef);

		instance.unwatch();
	});

	test('unwatch should clear schedule and remove click handler', () => {
		const clickHandler = jest.fn();
		const instance = new Perceptor(element, { clickHandler });

		instance.watch();
		expect(instance.scheduler).toBeDefined();

		instance.unwatch();
		expect(instance.scheduler).toBeUndefined();

		element.click();
		expect(clickHandler).not.toHaveBeenCalled();
	});

	test('should allow custom subscriber options', () => {
		const instance = new Perceptor(element, { defaultSubscriber: 'console' });
		expect(instance.config.subscribers).toBeDefined();
	});

	test('Perceptor.defaults should be extensible', () => {
		const originalThreshold = Perceptor.defaults.threshold;
		Perceptor.defaults.threshold = 75;

		const instance = new Perceptor(element);
		expect(instance.config.threshold).toBe(75);

		// Restore
		Perceptor.defaults.threshold = originalThreshold;
	});
});
