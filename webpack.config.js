/* eslint-disable no-undef */
// Imports
const path = require('path');
// Webpack Configuration
const config = {
	// Entry
	entry: './src/index.js',

	//
	mode: 'production',
	// Output
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		library: 'Perceptor',
		libraryTarget: 'umd',
		libraryExport: 'default',
		umdNamedDefine: true
	},
	// Loaders
	module: {
		rules: [
			// JavaScript/JSX Files
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	// Plugins
	plugins: [],
	// OPTIONAL
	// Reload On File Change
	watch: true,
	// Development Tools (Map Errors To Source File)
	devtool: 'source-map'
};
// Exports
module.exports = config;
