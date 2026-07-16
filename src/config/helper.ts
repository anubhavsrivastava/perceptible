import { Config } from './defaultConfig';

const arrayMergeList = ['subscribers', 'spectators'];
const objectMergeList = ['scheduler', 'viewOffset'];

const isArray = (candidate: unknown): candidate is unknown[] => {
	return Array.isArray(candidate);
};

/**
 * Merges Perceptible config
 * @param {Config} baseConfig - source configuration
 * @param {Partial<Config>} extensionConfig - extension configuration
 * @returns {Config} merged configuration
 */
export function mergeConfig(baseConfig: Config, extensionConfig?: Partial<Config>): Config {
	const result = Object.assign({}, baseConfig);
	
	if (extensionConfig) {
		const extConfigObj = extensionConfig as Record<string, unknown>;
		const baseConfigObj = result as unknown as Record<string, unknown>;

		for (const key in extConfigObj) {
			if (Object.prototype.hasOwnProperty.call(extConfigObj, key)) {
				// If key is candidate which should be joined over instead of over-written
				if (arrayMergeList.includes(key)) {
					const extVal = isArray(extConfigObj[key]) ? extConfigObj[key] : [extConfigObj[key]];
					const baseVal = baseConfigObj[key] || [];
					const baseArr = isArray(baseVal) ? baseVal : [baseVal];
					baseConfigObj[key] = [...baseArr, ...extVal];
					continue;
				}

				// If key is candidate which should be joined over instead of over-written
				if (objectMergeList.includes(key)) {
					baseConfigObj[key] = baseConfigObj[key] || {};
					baseConfigObj[key] = Object.assign({}, baseConfigObj[key], extConfigObj[key]);
					continue;
				}

				baseConfigObj[key] = extConfigObj[key];
			}
		}
	}

	return result;
}
