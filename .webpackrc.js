const path = require('path');
export default {
	entry: './src/index.js',
	extraBabelPlugins: [
		// 'transform-decorators-legacy',
		['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], //  antd style
	],
	outputPath: path.resolve(__dirname, "./dist/static"),
	// publicPath: `./dist/static/`,
	env: {
		// 开发
		development: {
			// publicPath: '/',
			publicPath:'/',
			extraBabelPlugins: ['dva-hmr'],
			// "proxy": {
			// 	"/api": {
			// 		"target": "http://localhost:8080/",
			// 		"changeOrigin": true,
			// 		"pathRewrite": { "^/api": "" }
			// 	}
			// },

		},
		// 生产
		production: {
			extraBabelPlugins: [],
			// publicPath: './assets/',
		}
	},
	alias: {
		components: path.resolve(__dirname, 'src/components/'),
		layouts: path.resolve(__dirname, 'src/layouts/'),
	},
	ignoreMomentLocale: true,
	theme: './theme.js',
	html: {
		template: './public/index.ejs',
	},
	disableDynamicImport: false,
	hash: true,
};