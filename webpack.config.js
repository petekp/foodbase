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
	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.jpg', '.png']
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
      new webpack.HotModuleReplacementPlugin(),
			new OpenBrowserPlugin({
				url: 'http://localhost:8080'
			})
    ]
  })
}

if(TARGET === 'build') {
  module.exports = merge(common, {
		plugins: [
			new webpack.optimize.DedupePlugin(),
	    new webpack.optimize.UglifyJsPlugin({
	      minimize: true,
	      compress: {
        	warnings: false
      	}
	    }),
	    new webpack.DefinePlugin({
	      'process.env': {
	        'NODE_ENV': JSON.stringify('production')
	      }
	    })
    ]
	});
}
