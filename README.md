# Webpack starter kit

> Baseline configuration for Webpack

Takes HTML, CSS, and JS files (`web/`) and compiles them (`public/`) using [Webpack]. This is the [webpack.config.js] that I usually start with in new projects.

[Webpack]: https://webpack.github.io/
[webpack.config.js]: webpack.config.js

## Features

You get these out of the box:

- Modern JavaScript ([Babel])
- Modern CSS ([PostCSS] & [cssnext])
- Development server ([WebpackDevServer])
- Automatic browser reloading ([LiveReloadPlugin])
- CSS linting ([Stylelint])
- Plain HTML & images

Optional features (see `EXTRAS.md`):

- [Sass](EXTRAS.md#sass)
- [Phoenix support](EXTRAS.md#phoenix)
- [React](EXTRAS.md#react)
- [React hot module reloading](EXTRAS.md)

[Babel]: http://babeljs.io/
[PostCSS]: http://postcss.org/
[cssnext]: http://cssnext.io/
[Stylelint]: http://stylelint.io/
[WebpackDevServer]: https://webpack.js.org/configuration/dev-server/
[LiveReloadPlugin]: https://www.npmjs.com/package/webpack-livereload-plugin

## Installation

Get node.js and Yarn. Then download the files into your projects:

```sh
curl -L "https://github.com/rstacruz/webpack-starter-kit/archive/master.tar.gz" | tar xz
mv webpack-starter-kit-master/{yarn.lock,package.json,postcss.config.js,webpack.config.js,.stylelintrc,web/assets,web/css,web/js,web/html} .
rm -rf webpack-starter-kit-master
```

## Updates

This kit is updated whenever I find something good to add; see [HISTORY.md](HISTORY.md) for a change log.

## Thanks

**webpack-starter-kit** © 2016-2018, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/webpack-starter-kit/contributors
