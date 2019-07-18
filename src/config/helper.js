const arrayMergeList = ['subscribers', 'spectators'];
const objectMergeList = ['scheduler', 'viewOffset'];

const isArray = candidate => {
	return Array.isArray(candidate);
};
export function mergeConfig(baseConfig, extensionConfig) {
	if (extensionConfig) {
		for (var key in extensionConfig) {
			if (arrayMergeList.includes(key)) {
				extensionConfig[key] = isArray(extensionConfig[key]) ? extensionConfig[key] : [extensionConfig[key]];
				baseConfig[key] = baseConfig[key] || [];
				baseConfig[key] = isArray(baseConfig[key]) ? baseConfig[key] : [baseConfig[key]];
				extensionConfig[key] = [...baseConfig[key], ...extensionConfig[key]];
				continue;
			}

			if (objectMergeList.includes(key)) {
				baseConfig[key] = baseConfig[key] || {};
				extensionConfig[key] = Object.assign({}, baseConfig[key], extensionConfig[key]);
				continue;
			}
		}
	}

	return Object.assign({}, baseConfig, extensionConfig);
}
