const webpack = require('webpack')
const join = require('path').join
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  cache: true,

  context: __dirname,

  entry: {
    // JavaScript
    'assets/app': './js/app.js',
    'assets/app-css': './css/app.js'
  },

  output: {
    path: join(__dirname, 'public'),
    filename: '[name].js',
    pathinfo: DEBUG ? true : false,
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: DEBUG
          ? ExtractTextPlugin.extract('style-loader', 'css-loader?-url&sourceMap&importLoaders=1!postcss-loader?sourceMap=inline')
          : ExtractTextPlugin.extract('style-loader', 'css-loader?-url!postcss-loader')
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  postcss: [
    require('postcss-import')(),
    require('postcss-cssnext')(),
    require('postcss-reporter')(),
  ].concat(DEBUG ? [
    require('postcss-browser-reporter')(),
  ] : []),

  plugins: [
    // allChunks will preserve source maps
    new CleanWebpackPlugin(['public']),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new CopyWebpackPlugin([
      { from: 'assets', to: '.' }
    ])
  ].concat(DEBUG ? [
    new LiveReloadPlugin({ appendScriptTag: true })
  ] : []),

  // Best trade-off with compatibility and speed
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map',

  debug: DEBUG ? true : false,
}
