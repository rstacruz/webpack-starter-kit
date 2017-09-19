const dirname = require('path').dirname
const basename = require('path').basename

module.exports = function getConfig (opts) {
  const { from: FROM, to: TO, copy: COPY } = opts
  const ROOT = dirname(module.parent.id)
  const webpack = require('webpack')
  const resolve = require('path').resolve
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const LiveReloadPlugin = require('webpack-livereload-plugin')

  const DEBUG = process.env.NODE_ENV !== 'production'
  const DEST = dirname(TO)
  const ENTRIES = {
    [basename(TO).replace(/\.js$/, '')]: [FROM]
  }

  const config = {
    cache: true,
    context: ROOT,
    entry: ENTRIES,

    output: {
      path: resolve(ROOT, DEST),
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
              {
                loader: 'css-loader',
                options: DEBUG
                  ? {
                    url: false,
                    sourceMap: true,
                    importLoaders: 1
                  } :
                  {
                    url: false
                  }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: DEBUG ? 'inline' : undefined,
                  config: {
                    path: __dirname
                  }
                }
              },
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
      // Extract to .css
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true // preserve source maps
      }),

      // Compress React (and others)
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
      }),
    ].concat(COPY ? [
      // Copying files directly
      new CopyWebpackPlugin(COPY.map(({ from, to }) => {
        return {
          from: resolve(ROOT, from),
          to: resolve(ROOT, to)
        }
      }))
    ] : []),

    // Hide source maps in production (no sourceMappingURL)
    devtool: DEBUG ? 'source-map' : 'hidden-source-map',

    stats: 'errors-only',
    devServer: { stats: 'errors-only' }
  }

  if (DEBUG) {
    config.plugins = [
      ...config.plugins,

      // LiveReload in development
      new LiveReloadPlugin({
        appendScriptTag: true
      }),

      // Debug mode for old webpack plugins
      new webpack.LoaderOptionsPlugin({
        debug: true
      })
    ]
  }

  return config
}
