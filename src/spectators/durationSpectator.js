/**
 * Overall duration for which the Perceptor was visible
 * @param {Perceptor} context
 * @param {object} currentResult
 * @param {object} prevResult
 * @returns {object} - resultant
 */
export default function durationSpectator(context, currentResult, prevResult) {
	/***
	 *
	 * This spectator depends on viewportSpectator and time spectator
	 * Cases:
	 * 1. Currently visible and previously not visible -> Just came under the view
	 * 2. Currently visible and previously visible -> Add the count
	 * 3. Currently not visible and previously not visible -> nothing to track
	 * 4. Currently not visible and previously visible -> Got hidden
	 *
	 */

	let { duration = 0 } = prevResult;

	if (currentResult.isVisible && prevResult.isVisible) {
		duration += context.config.scheduler.interval; //currentResult.time - prevResult.time;
	}

	return { duration };
}
