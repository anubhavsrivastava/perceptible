module.exports = {
	env: {
		browser: true,
		es6: true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true
		}
	},
	extends: 'eslint:recommended'
};
