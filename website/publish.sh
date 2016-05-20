#!/bin/bash

set -e

cd "$(dirname "$0")"
cd ..
npm run site
git clone --branch gh-pages --depth=50 \
        "https://$GH_TOKEN@github.com/globocom/megadraft.git"
rm -rf megadraft/website
mv website megadraft
cd megadraft
rm index.html
mv website/index.html index.html
mv website/app.css app.css
git add -A .
if ! git diff-index --quiet HEAD --; then
  git commit -m "Update github pages"
  git push origin gh-pages
fi
