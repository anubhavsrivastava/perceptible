// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	clearMocks: true,
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.jsx?$': 'babel-jest'
	},
	testPathIgnorePatterns: ['/node_modules/', '/documentation/', '/media/', '/e2e/', '/dist/'],
	transformIgnorePatterns: ['node_modules/(?!(@puppeteer|puppeteer|puppeteer-core)/)']
};
