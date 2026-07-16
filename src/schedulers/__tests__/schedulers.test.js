import Scheduler from '../Scheduler';
import DOMEventScheduler from '../domEventScheduler';
import ObserverAPIScheduler from '../observerAPIScheduler';
import rAFEventScheduler from '../rAFScheduler';
import IntervalScheduler from '../intervalScheduler';
import SpectatorManager from '../../spectators/spectatorManager';
import SubscriberManager from '../../subscribers/subscriberManager';
import { onPageVisibilityChange } from '../visibilityHelper';

describe('Schedulers', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	describe('Base & Unimplemented Schedulers', () => {
		test('Scheduler interface clearScheduler throws Not implemented', () => {
			const s = new Scheduler();
			expect(() => s.clearScheduler()).toThrow('Not implemented');
		});

		test('DOMEventScheduler throws Not Implemented on instantiation', () => {
			expect(() => new DOMEventScheduler({})).toThrow('Not Implemented');
		});

		test('ObserverAPIScheduler throws Not Implemented on instantiation', () => {
			expect(() => new ObserverAPIScheduler({})).toThrow('Not Implemented');
		});

		test('rAFEventScheduler throws Not Implemented on instantiation', () => {
			expect(() => new rAFEventScheduler({})).toThrow('Not Implemented');
		});
	});

	describe('IntervalScheduler', () => {
		let spectatorChain;
		let subscriberChain;
		let context;

		beforeEach(() => {
			spectatorChain = new SpectatorManager();
			subscriberChain = new SubscriberManager();
			context = { element: document.createElement('div') };
		});

		test('should throw error if spectatorChain or subscriberChain is invalid', () => {
			expect(() => new IntervalScheduler({ spectatorChain: null, subscriberChain })).toThrow(
				'Not a valid instance of spectatorChain/SubscriberChain'
			);
			expect(() => new IntervalScheduler({ spectatorChain, subscriberChain: null })).toThrow(
				'Not a valid instance of spectatorChain/SubscriberChain'
			);
		});

		test('should run spectator and subscriber chains on given interval', () => {
			const runSpy = jest.spyOn(spectatorChain, 'run').mockReturnValue({ isVisible: true });
			const dispatchSpy = jest.spyOn(subscriberChain, 'dispatch');

			const scheduler = new IntervalScheduler({
				config: { interval: 200, attentionMode: false },
				spectatorChain,
				subscriberChain,
				context
			});

			expect(runSpy).not.toHaveBeenCalled();

			jest.advanceTimersByTime(200);
			expect(runSpy).toHaveBeenCalledTimes(1);
			expect(dispatchSpy).toHaveBeenCalledWith(context, { isVisible: true });

			jest.advanceTimersByTime(200);
			expect(runSpy).toHaveBeenCalledTimes(2);

			scheduler.clearSchedule();
		});

		test('clearSchedule should stop execution and clear handleId', () => {
			const runSpy = jest.spyOn(spectatorChain, 'run');

			const scheduler = new IntervalScheduler({
				config: { interval: 200, attentionMode: false },
				spectatorChain,
				subscriberChain,
				context
			});

			jest.advanceTimersByTime(200);
			expect(runSpy).toHaveBeenCalledTimes(1);

			scheduler.clearSchedule();

			jest.advanceTimersByTime(400);
			expect(runSpy).toHaveBeenCalledTimes(1);
			expect(scheduler._enabled).toBe(false);
			expect(scheduler.handleId).toBeUndefined();
		});

		test('should handle page visibility toggles', () => {
			const runSpy = jest.spyOn(spectatorChain, 'run');

			const scheduler = new IntervalScheduler({
				config: { interval: 200, attentionMode: true },
				spectatorChain,
				subscriberChain,
				context
			});

			// Hide page via document.hidden and dispatch event
			Object.defineProperty(document, 'hidden', { value: true, writable: true, configurable: true });
			document.dispatchEvent(new Event('visibilitychange'));

			jest.advanceTimersByTime(400);
			expect(runSpy).toHaveBeenCalledTimes(0);

			// Show page again
			Object.defineProperty(document, 'hidden', { value: false, writable: true, configurable: true });
			document.dispatchEvent(new Event('visibilitychange'));

			jest.advanceTimersByTime(200);
			expect(runSpy).toHaveBeenCalledTimes(1);

			scheduler.clearSchedule();
		});

		test('should handle window blur and focus when attentionMode is enabled', () => {
			const runSpy = jest.spyOn(spectatorChain, 'run');

			const scheduler = new IntervalScheduler({
				config: { interval: 200, attentionMode: true },
				spectatorChain,
				subscriberChain,
				context
			});

			window.dispatchEvent(new Event('blur'));
			jest.advanceTimersByTime(400);
			expect(runSpy).toHaveBeenCalledTimes(0);

			window.dispatchEvent(new Event('focus'));
			jest.advanceTimersByTime(200);
			expect(runSpy).toHaveBeenCalledTimes(1);

			scheduler.clearSchedule();
		});
	});

	describe('visibilityHelper', () => {
		test('onPageVisibilityChange should trigger callback only on actual state change', () => {
			const cb = jest.fn();
			onPageVisibilityChange(cb, true);

			Object.defineProperty(document, 'hidden', { value: true, writable: true, configurable: true });
			document.dispatchEvent(new Event('visibilitychange'));
			expect(cb).toHaveBeenCalledWith(false);

			// Repeated visibility event with same state should not trigger cb again
			document.dispatchEvent(new Event('visibilitychange'));
			expect(cb).toHaveBeenCalledTimes(1);
		});
	});
});
