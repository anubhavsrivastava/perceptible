module.exports = {
	env: {
		browser: true,
		es2022: true,
		node: true,
		'jest/globals': true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended'],
	plugins: ['@typescript-eslint', 'jest'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'warn',
		'jest/no-conditional-expect': 'warn'
	}
};
