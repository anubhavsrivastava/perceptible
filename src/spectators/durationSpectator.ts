import Perceptor, { SpectatorResult } from '../index';

/**
 * Overall duration for which the Perceptor was visible
 * @param {Perceptor} context
 * @param {Partial<SpectatorResult>} currentResult
 * @param {Partial<SpectatorResult>} prevResult
 * @returns {object} - resultant
 */
export default function durationSpectator(context: Perceptor, currentResult: Partial<SpectatorResult>, prevResult: Partial<SpectatorResult>): { duration: number } {
	let { duration = 0 } = prevResult;

	if (currentResult.isVisible && prevResult.isVisible) {
		duration += context.config.scheduler.interval;
	}

	return { duration };
}
