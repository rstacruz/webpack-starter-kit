const webpack = require('webpack')
const resolve = require('path').resolve
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const DEBUG = process.env.NODE_ENV !== 'production'
const SRC = './web'
const DEST = './public'
const POLYFILLS = DEBUG ? [] : ['babel-polyfill', 'es6-promise/auto']

module.exports = () => {
  return {
    context: __dirname,
    entry: {
      'assets/js/app': [...POLYFILLS, `${SRC}/js/app.js`],
      'assets/css/app': [...POLYFILLS, `${SRC}/css/app.js`]
    },

    output: {
      path: resolve(__dirname, DEST),
      filename: '[name].js',
      pathinfo: !!DEBUG,
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: DEBUG
                ? {
                    url: false,
                    sourceMap: true,
                    importLoaders: 1
                  }
                : {
                    url: false
                  }
            },
            {
              loader: 'postcss-loader',
              options: DEBUG ? { sourceMap: 'inline' } : {}
            }
          ]
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
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx']
    },

    plugins: [
      // Delete old files when compiling
      new CleanWebpackPlugin([DEST]),

      // Extract to .css
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),

      // Compress React (and others)
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
      }),

      // Copying files directly
      new CopyWebpackPlugin([
        { from: `${SRC}/assets`, to: './assets' },
        { from: `${SRC}/html`, to: '.' }
      ])
    ].concat(
      DEBUG
        ? [
            // LiveReload in development
            new LiveReloadPlugin({
              appendScriptTag: true
            }),

            // Debug mode for old webpack plugins
            new webpack.LoaderOptionsPlugin({
              debug: true
            })
          ]
        : []
    ),

    // Hide source maps in production (no sourceMappingURL)
    devtool: DEBUG ? 'source-map' : 'hidden-source-map',

    stats: 'minimal'
  }
}
