const webpack = require('webpack')
const join = require('path').join
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const DEBUG = process.env.NODE_ENV !== 'production'
const SRC = `./web`

module.exports = {
  cache: true,

  context: __dirname,

  entry: {
    // JavaScript
    'assets/app': `${SRC}/js/app.js`,

    // CSS
    'assets/app-css': `${SRC}/css/app.js`
  },

  output: {
    path: join(__dirname, 'public'),
    filename: '[name].js',
    pathinfo: DEBUG ? true : false,
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: DEBUG
            ? [
              'css-loader?-url&sourceMap&importLoaders=1',
              'postcss-loader?sourceMap=inline'
            ]
            : [
              'css-loader?-url',
              'postcss-loader'
            ]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              cacheDirectory: true
            }
          }
        ]
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new CleanWebpackPlugin(['public']),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true // preserve source maps
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new CopyWebpackPlugin([
      { from: `${SRC}/assets`, to: './assets' },
      { from: `${SRC}/html`, to: '.' },
    ]),
  ].concat(DEBUG ? [
    new LiveReloadPlugin({ appendScriptTag: true }),
  ] : []),

  // Best trade-off with compatibility and speed
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map',

  // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/35
  stats: {
    children: false,
  },
}
