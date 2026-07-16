/**
 * adds 'time' property in current SpectatorResult.
 * @returns {object} - resultant
 */
export default function timeSpectator(): { time: number } {
	return { time: new Date().getTime() };
}
