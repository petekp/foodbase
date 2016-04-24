var HtmlWebpackPlugin = require('html-webpack-plugin'),
		merge             = require('webpack-merge'),
		path              = require('path'),
		webpack           = require('webpack'),
		OpenBrowserPlugin = require('open-browser-webpack-plugin');

/* PostCSS Plugins */
var postcssImport       = require('postcss-import'),
		postcssPrecss       = require('precss'),
		postcssAutoprefixer = require('autoprefixer'),
		postcssNested       = require('postcss-nested'),
		postcssLost         = require('lost'),
		postcssRucksack     = require('rucksack-css');

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const PATHS = {
  app: path.join(__dirname, 'app/main'),
  build: path.join(__dirname, 'build')
};

const common = {
	entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
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
  			loaders: ['babel?cacheDirectory'],
  			include: path.resolve(ROOT_PATH, 'app')
  		},
			{
			  test: /\.(png|jpg|gif)$/,
			  loader: "url-loader?limit=5000&name=images/img-[hash:6].[ext]"
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
	]
}

if(TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

if(TARGET === 'build') {
  module.exports = merge(common, {
		plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
			new webpack.DefinePlugin({
		    'process.env': {
		      // This has effect on the react lib size
		      'NODE_ENV': JSON.stringify('production'),
		    },
		  })
    ]
	});
}
