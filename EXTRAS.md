## Sass support

Install sass-loader:

```
yarn add --exact sass-loader
```

Add `sass-loader` in `module.loaders`:

```js
module: {
  loaders: [
    {
      test: /\.scss$/,
      loader: DEBUG
        ? ExtractTextPlugin.extract('style-loader', 'css-loader?-url&sourceMap&importLoaders=1!postcss-loader?sourceMap=inline!sass-loader?sourceMap')
        : ExtractTextPlugin.extract('style-loader', 'css-loader?-url!postcss-loader!sass-loader')
    }
  ]
}
```

Configure `sassLoader`:

```js
sassLoader: {
  includePaths: join(__dirname, 'node_modules'),
  outputStyle: DEBUG ? 'nested' : 'compressed'
},
