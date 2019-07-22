const arrayMergeList = ['subscribers', 'spectators'];
const objectMergeList = ['scheduler', 'viewOffset'];

const isArray = candidate => {
	return Array.isArray(candidate);
};

/**
 * Merges Perceptible config
 * @param {object} baseConfig - source configuration
 * @param {object} extensionConfig - extension configuration
 * @returns {object} merged configuration
 */
export function mergeConfig(baseConfig, extensionConfig) {
	if (extensionConfig) {
		for (var key in extensionConfig) {
			// If key is candidate which should be joined over instead of over-written
			if (arrayMergeList.includes(key)) {
				extensionConfig[key] = isArray(extensionConfig[key]) ? extensionConfig[key] : [extensionConfig[key]];
				baseConfig[key] = baseConfig[key] || [];
				baseConfig[key] = isArray(baseConfig[key]) ? baseConfig[key] : [baseConfig[key]];
				extensionConfig[key] = [...baseConfig[key], ...extensionConfig[key]];
				continue;
			}

			// If key is candidate which should be joined over instead of over-written
			if (objectMergeList.includes(key)) {
				baseConfig[key] = baseConfig[key] || {};
				extensionConfig[key] = Object.assign({}, baseConfig[key], extensionConfig[key]);
				continue;
			}
		}
	}

	return Object.assign({}, baseConfig, extensionConfig);
}
