Extra features
==============

Sass support
------------

Install sass-loader:

```
yarn add --exact sass-loader
```

Add `sass-loader` in `module.rules[0].use`'s ExtractTextPlugin `use` block:

```diff
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        /* snip */
      },
+     /* Right below the postcss-loader block */
+     {
+       loader: 'sass-loader',
+       options: {
+         includePaths: join(__dirname, 'node_modules'),
+         outputStyle: DEBUG ? 'nested' : 'compressed'
+       }
+     }
```

In `postcss.config.js`, disable Stylelint because there's no way for it to check for lint violations /before/ Sass processes it.

React Hot module reloading
--------------------------

See: https://webpack.js.org/guides/hmr-react/
