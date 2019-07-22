// This reporter requires DOM Element which will be Absolute display,
const mainContainer = document.createElement('div');
mainContainer.id = 'dreporter';
document.body.appendChild(mainContainer);

mainContainer.style.backgroundColor = '#e5e5e5';
mainContainer.style.width = 'auto';
mainContainer.style.position = 'fixed';
mainContainer.style.bottom = '0';
mainContainer.style.left = '0';
mainContainer.style.opacity = '0.8';

var getHTMLPaintForObject = function(o) {
	return `<pre>${JSON.stringify(o, undefined, 4)}</pre>`;
};

const currentElementContainers = {};

// Keeps track of elements already painted so that respective container are updated
// Mapping ensures multiple Perceptors
const createOrUpdateElementContainer = (id, context) => {
	if (!currentElementContainers[id]) {
		currentElementContainers[id] = document.createElement('div');
		mainContainer.appendChild(currentElementContainers[id]);
	}
	currentElementContainers[id].innerHTML = getHTMLPaintForObject(context);
};

/**
 * Logs SpectatorResult on DOM.
 * @param {Perceptor} perceptorInstance
 * @param {SpectatorResult} context
 */
export default (perceptorInstance, context) => {
	return createOrUpdateElementContainer(perceptorInstance.element.id, context);
};
