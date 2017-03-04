#!/usr/bin/env bash

if ! which yarn >/dev/null; then
  echo "! You need yarn. See: http://yarnpkg.com/"
  exit 1
fi

curl -sSL https://github.com/rstacruz/webpack-starter-kit/archive/master.tar.gz \
 | tar zxv --strip-components=1 \
 --exclude='README.md' \
 --exclude='_extras' \
 --exclude='HISTORY.md' \

mv _README.md README.md
yarn
