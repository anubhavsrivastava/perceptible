// This reporter requires DOM Element which will be Absolute display,

const mainContainer = document.createElement('div');
mainContainer.id = 'dreporter';
document.body.appendChild(mainContainer);

function isPrimitive(c) {
	return c !== Object(c);
}

var dumpObject = function(o) {
	var str = '{  <br/>';

	for (var p in o) {
		if (Array.isArray(o[p])) {
			str += p + ': [ ' + o[p].join(',') + '] <br/>';
		} else if (isPrimitive(o[p])) {
			str += p + ': ' + o[p] + ' <br/>';
		} else {
			str += p + ': { <br />' + dumpObject(o[p]) + '}';
		}
	}

	return str + '} ';
};
export default context => {
	mainContainer.innerHTML = dumpObject(context);
};
