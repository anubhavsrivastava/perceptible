import Perceptor from '../index';

/**
 * Adds current perceptor element property in current SpectatorResult.
 * @param {Perceptor} pContext
 * @returns {object} - resultant
 */
export default function elementSpectator(pContext: Perceptor): { element: { id: string | undefined; tagName: string | undefined } } {
	const element = pContext?.element;
	return { element: { id: element?.id, tagName: element?.tagName } };
}
