// This reporter requires DOM Element which will be Absolute display,

const mainContainer = document.createElement('div');
mainContainer.id = 'dreporter';
document.body.appendChild(mainContainer);

mainContainer.style.backgroundColor = '#e5e5e5';
mainContainer.style.width = 'auto';
mainContainer.style.position = 'fixed';
mainContainer.style.bottom = '0';
mainContainer.style.left = '0';

var paintObjectOnContainer = function(o) {
	return `<pre>${JSON.stringify(o, undefined, 4)}</pre>`;
};

export default (perceptorInstance, context) => {
	mainContainer.innerHTML = paintObjectOnContainer(context);
};
