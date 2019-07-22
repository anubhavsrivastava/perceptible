/**
 * adds 'time' property in current SpectatorResult.
 * @returns {object} - resultant
 */
export default function timeSpectator() {
	return { time: new Date().getTime() };
}
