// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	clearMocks: true,
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	testPathIgnorePatterns: ['/node_modules/', '/documentation/', '/media/']
};
