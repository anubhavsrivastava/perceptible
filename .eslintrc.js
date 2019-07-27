module.exports = {
	env: {
		browser: true,
		es6: true,
		'jest/globals': true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true
		}
	},
	extends: ['eslint:recommended', 'plugin:jest/recommended']
};
