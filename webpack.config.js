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
          use: [
            `css-loader?-url${DEBUG ? '&sourceMap&importLoaders=1' : ''}`,
            `postcss-loader${DEBUG ? '?sourceMap=inline' : ''}`
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
    // Delete old files when compiling
    new CleanWebpackPlugin(['public']),

    // Extract to .css
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true // preserve source maps
    }),

    // Compress React (and others)
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),

    // Copying files directly
    new CopyWebpackPlugin([
      { from: `${SRC}/assets`, to: './assets' },
      { from: `${SRC}/html`, to: '.' },
    ]),
  ].concat(DEBUG ? [
    // LiveReload in development
    new LiveReloadPlugin({
      appendScriptTag: true
    }),

    // Debug mode for old webpack plugins
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ] : []),

  // Hide source maps in production (no sourceMappingURL)
  devtool: DEBUG ? 'source-map' : 'hidden-source-map',

  // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/35
  stats: {
    children: false,
  },
}
