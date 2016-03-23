#!/bin/bash

cd "$(dirname "$0")"
cd ..
npm run site
git clone --branch gh-pages --depth=50 \
        "https://vierno@github.com/globocom/megadraft.git"
rm -rf megadraft/website
mv website megadraft
cd megadraft
rm index.html
mv website/index.html index.html
git add -A .
git commit -m "Update github pages"
git push origin gh-pages
