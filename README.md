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

Optional features (see [EXTRAS.md](_extras/EXTRAS.md)):

- Sass
- React hot module reloading

[Babel]: http://babeljs.io/
[PostCSS]: http://postcss.org/
[cssnext]: http://cssnext.io/
[Stylelint]: http://stylelint.io/
[WebpackDevServer]: https://webpack.js.org/configuration/dev-server/
[LiveReloadPlugin]: https://www.npmjs.com/package/webpack-livereload-plugin

## Installation

You can use the [automated installer script](_extras/install.sh) to unpack the files:

```sh
# Extracts to the current directory
curl -sSL https://raw.githubusercontent.com/rstacruz/webpack-starter-kit/master/_extras/install.sh > /tmp/webpack-starter-kit.sh; bash /tmp/webpack-starter-kit.sh
```

If you're allergic to downloaded Bash scripts, check the [simple installer](_extras/simple_install.sh).

## Updates

This kit is updated whenever I find something good to add; see [HISTORY.md](HISTORY.md) for a change log.

## Thanks

**webpack-starter-kit** © 2016-2017, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/webpack-starter-kit/contributors
