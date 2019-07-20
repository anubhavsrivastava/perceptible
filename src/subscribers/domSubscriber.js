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

var paintObjectOnContainer = function(o) {
	return `<pre>${JSON.stringify(o, undefined, 4)}</pre>`;
};

const currentElementContainers = {};
const createOrUpdateElementContainer = (id, context) => {
	if (!currentElementContainers[id]) {
		currentElementContainers[id] = document.createElement('div');
		mainContainer.appendChild(currentElementContainers[id]);
	}
	currentElementContainers[id].innerHTML = paintObjectOnContainer(context);
};
export default (perceptorInstance, context) => {
	return createOrUpdateElementContainer(perceptorInstance.element.id, context);
};
