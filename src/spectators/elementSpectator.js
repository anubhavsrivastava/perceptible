export default function elementSpectator(pContext) {
	const { element = {} } = pContext;
	return { element: { id: element.id, tagName: element.tagName } };
}
