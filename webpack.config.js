var HtmlWebpackPlugin = require('html-webpack-plugin'),
	merge = require('webpack-merge'),
	path = require('path'),
	webpack = require('webpack'),
	OpenBrowserPlugin = require('open-browser-webpack-plugin');

/* PostCSS Plugins */
var postcssImport = require('postcss-import'),
	postcssPrecss = require('precss'),
	postcssAutoprefixer = require('autoprefixer'),
	postcssNested = require('postcss-nested'),
	postcssLost = require('lost'),
	postcssRucksack = require('rucksack-css');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

module.exports = {
	entry: path.resolve(ROOT_PATH, 'app/main'),
	output: {
		path: path.resolve(ROOT_PATH, 'build'),
		filename: '/bundle.js'
	},
	module: {
		loaders: [
      {
			  test: /\.css$/,
			  loader: "style-loader!css-loader?minimize!postcss-loader",
			  include: path.resolve(ROOT_PATH, 'app')
		  },
      {
  			test: /\.jsx?$/,
  			loaders: ['babel'],
  			include: path.resolve(ROOT_PATH, 'app')
  		}
    ]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json']
	},
	postcss: function() {
		return [
			postcssImport({
				onImport: function(files) {
					files.forEach(this.addDependency);
				}.bind(this)
			}),
			postcssPrecss(),
			postcssAutoprefixer(),
			postcssNested(),
			postcssRucksack(),
			postcssLost()
		];
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Foodbase'
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		})
	],
	devServer: {
		historyApiFallback: true,
		inline: true,
		progress: true
	}
};
