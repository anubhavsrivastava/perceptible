/**
 * Adds current perceptor element property in current SpectatorResult.
 * @param {Perceptor} pContext
 * @returns {object} - resultant
 */
export default function elementSpectator(pContext) {
	const { element = {} } = pContext;
	return { element: { id: element.id, tagName: element.tagName } };
}
