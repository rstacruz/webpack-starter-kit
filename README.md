# Webpack starter kit

> Baseline configuration for Webpack

Takes HTML, CSS, and JS files (`web/`) and compiles them (`public/`) using [Webpack]. This is the [webpack.config.js] that I usually start with in new projects.

[Webpack]: https://webpack.github.io/
[webpack.config.js]: webpack.config.js

## Features

- JavaScript via Babel
- CSS with [cssnext]
- HTML
- Images
- Webpack dev server
- LiveReload
- [Stylelint]

Optional features (see [EXTRAS.md](_extras/EXTRAS.md)):

- Sass
- React hot module reloading

Not present: tests

[cssnext]: http://cssnext.io/
[Stylelint]: http://stylelint.io/

## Installation

```sh
mkdir my-project
cd my-project
curl -sSL https://raw.githubusercontent.com/rstacruz/webpack-starter-kit/master/_extras/install.sh > /tmp/webpack-starter-kit.sh; bash /tmp/webpack-starter-kit.sh
```

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
