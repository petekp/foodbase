var path         = require('path');
var webpack      = require('webpack');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var rucksack     = require('rucksack-css');
var cssnext      = require('cssnext');
var customMedia  = require("postcss-custom-media");
var pxtorem      = require("postcss-pxtorem");
var lost         = require("lost");

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './public/scripts/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'public/scripts')
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
        return [cssnext, lost, customMedia, autoprefixer, precss, rucksack, pxtorem];
    }
};
