#!/usr/bin/env bash
#
# This is the webpack-starter-kit installer script.
# For a simpler version (doesn't let you pick source/dest paths), see
# simple_install.sh.
#
set -o errexit pipefail

if ! which yarn >/dev/null; then
  echo "! You need yarn. See: http://yarnpkg.com/"
  exit 1
fi

TMPFILE="$(mktemp)"
SOURCE="https://github.com/rstacruz/webpack-starter-kit/archive/master.tar.gz"

echo -n "Source path [./web]: "
read SRC_PATH
[ -z "$SRC_PATH" ] && SRC_PATH="./web"

echo -n "Destination path [./public]: "
read DEST_PATH
[ -z "$DEST_PATH" ] && DEST_PATH="./public"

echo -e "\n==> Downloading $SOURCE"
curl -sSL "$SOURCE" > "$TMPFILE"

echo -e "\n==> Extracting to ./"
 tar zxvf "$TMPFILE" --strip-components=1 \
 --include="*/*.config.js" \
 --include="*/package.json" \
 --include="*/yarn.lock" \
 --include="*/.stylelintrc" \
 --include='*/_README.md' \

mv _README.md README.md

cat webpack.config.js \
  | sed -e "s#./web#${SRC_PATH}#" \
  | sed -e "s#./public#${DEST_PATH}#" \
  > webpack.config.js_
mv webpack.config.js_ webpack.config.js

echo -e "\n==> Extracting to $SRC_PATH"
mkdir -p "$SRC_PATH"
(
  cd "$SRC_PATH"
  tar zxvf "$TMPFILE" --strip-components=2 \
   --include="*/web"
)

rm "$TMPFILE"

echo -e "\n==> Updating ./.gitignore"
echo "$DEST_PATH" >> .gitignore
echo "node_modules" >> .gitignore

echo -e "\n==> Running yarn"
yarn
