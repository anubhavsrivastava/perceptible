module.exports = {
	env: {
		browser: true,
		es2022: true,
		node: true,
		'jest/globals': true
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	extends: ['eslint:recommended', 'plugin:jest/recommended']
};
